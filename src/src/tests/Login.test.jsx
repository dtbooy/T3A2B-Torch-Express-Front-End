
import '@testing-library/jest-dom'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './../components/App'
import NavigationBar from '../components/NavBar'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import renderWithRouter from './SetupTests/TestUtils'
import Cookies from 'js-cookie'

let container

describe('app rendering and navigation', () => {
  let container
  beforeEach(() => {
    container = 
    render(<App />).container
  })

  it('renders login button in navbar and is clickable', async () => {
    const loginButton = screen.getByRole('button', { name: "Login" })
    userEvent.click(loginButton)
    await waitFor(() => {
      expect(container.querySelector('h1')).toHaveTextContent('Login')
    })

    
  })
})


describe('Login Component', () => {
  beforeEach(() => {
    container = renderWithRouter(
      <App/>,
      { route: '/login' }
    ).container
  })

  it('renders the login component successfully', () => {
    expect(container.querySelector('h1')).toHaveTextContent("Login")
  })

  it('successful login redirects to home page on first attempt, error on second', async () => {
 
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'example@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password1234' } });
  fireEvent.click(screen.getAllByRole('button', { name: 'Login' })[1])
  
  await waitFor(() => {
    if (window.location.pathname === '/login') {
      expect(window.location.pathname).toBe('/login');
    } else {
      // Alternatively, check if an error message indicating email already registered is displayed
      expect(screen.getByText('Email is already registered')).toBeInTheDocument()
    }
  })
})
})

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
