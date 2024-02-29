
import '@testing-library/jest-dom'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './../components/App'
import NavigationBar from '../components/NavBar'
import { BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import userEvent from '@testing-library/user-event'
import Cookies from 'js-cookie'
import renderWithRouter from './SetupTests/TestUtils'

let token

describe('app rendering and navigation', () => {
  let container
  beforeEach(() => {
    container = 
    render(<App />).container
  })

  it('renders homepage successfully', () => {
    expect(screen.getByText('Get On Board!')).toBeInTheDocument()
  })

  it('renders login button in navbar and is clickable', async () => {
    const loginButton = screen.getByRole('button', { name: "Login" })
    userEvent.click(loginButton)
    await waitFor(() => {
      expect(container.querySelector('h1')).toHaveTextContent("Login")
    })

    
  })
  it('Login page is rendered after clicked', async () => {
    const signUpHeader = await screen.findByText('Sign Up')
    expect(signUpHeader).toBeInTheDocument()
  })
})


describe('Login Component', () => {
  let container

  beforeEach(() => {
    container = renderWithRouter(
      <App/>,
      { route: '/login' }
    ).container
  })

  it('renders the login component successfully', () => {
    expect(container.querySelector('h1')).toHaveTextContent("Login")
  })


  it('tests logging in', async () => {
   
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getAllByRole('button', { name: 'Login' })[1]

    
    userEvent.type(emailInput, 'admin@example.com')
    userEvent.type(passwordInput, 'admin1234')

    userEvent.click(submitButton)

      await waitFor(() => {
        expect(Cookies.get('accessToken')).toBeTruthy()
 

    })
  })
})

//  Assuming `testToken` is declared outside the test scope
//  testToken = Cookies.get('accessToken')



describe('NavigationBar Component', () => {
  beforeEach(() => {
    render(
    <BrowserRouter>
      <NavigationBar isLoggedIn={false} user={{}} isAdmin={false} />
    </BrowserRouter>
    )
  })

  it('renders the Sign Up button when user is not logged in', () => {
    // Assert that the Sign Up button is rendered
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('renders the Login button when user is not logged in', () => {
    // Assert that the Login button is rendered
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
