
import App from "../components/App"
// import Register from "../components/Register"
import renderWithRouter from "./SetupTests/TestUtils"
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'

let container 

describe('Register Component', () => {
    beforeEach(() => {
      container = renderWithRouter(
        <App/>,
        { route: '/register' }
      ).container
    })
  
    it('renders the register component successfully', async () => {
        expect(screen.getByText('Sign Up', { selector: 'h1' })).toBeInTheDocument()
    })
  
    it('successfully logs in or states user is already signed up', async () => {
    
    fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: "1990-01-01" } })
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Example User' } })
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'example@example.com' } })
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password1234' } })
    fireEvent.change(screen.getByLabelText('Confirm Password'),{ target: { value: 'password1234' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    
    await waitFor(() => {
        // Check if redirection to login page occurred
        if (window.location.pathname === '/login') {
          expect(window.location.pathname).toBe('/login')
        } else {
          // check error message indicating email already registered is displayed
          expect(screen.getByText('Email is already registered')).toBeInTheDocument()
        }
      })
  })
})