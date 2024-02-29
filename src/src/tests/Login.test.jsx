
import '@testing-library/jest-dom'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './../components/App'
import NavigationBar from '../components/NavBar'
import { BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import userEvent from '@testing-library/user-event'


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
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i })
    userEvent.click(signUpButton)
    await waitFor(() => {
      expect(screen.getByText('Get On Board!')).toBeInTheDocument()
    })

    
  })
  it('signup Page is rendered after clicked', async () => {
    const signUpHeader = await screen.findByText('Sign Up')
    expect(signUpHeader).toBeInTheDocument()
  })
})


describe('Login Component', () => {
  let container

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
    ).container
  })

  it('renders the login component successfully', () => {
    expect(container.querySelector('h1')).toHaveTextContent("Login")
  })


  it('tests logging in', async () => {
    let { container } = render(<App/>).container
   
    const emailInput = screen.getByPlaceholderText('Enter email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getAllByRole('button', { name: 'Login' })[0]

    
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'admin1234' } })

    fireEvent.click(submitButton)

      await waitFor(() => {
        // Check for elements indicating successful login or next page
        const homepageContent = screen.queryByText('Get On Board!')
  
        // Return true if any of the elements are found
        expect(homepageContent).toBeInTheDocument()

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
