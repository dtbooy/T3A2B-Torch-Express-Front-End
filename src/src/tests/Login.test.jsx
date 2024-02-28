
import '@testing-library/jest-dom'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, test } from 'vitest'
import App from './../components/App'
import NavigationBar from '../components/NavBar'
import { BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import userEvent from '@testing-library/user-event'

test('app rendering navigating', async () => {
  let { container } = render(<App />)

  expect(screen.getByText('Get On Board!')).toBeInTheDocument()
  
  const signUpButton = screen.getByRole('button', { name: /Sign Up/i })
  await userEvent.click(signUpButton)

  expect(container.querySelector('h1')).toHaveTextContent('Sign Up')
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

describe('Login Component', () => {
  let container;

  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
    ).container;
  });

  it('renders the login component successfully', () => {
    expect(container.querySelector('h1')).toHaveTextContent("Login");
  });


  it('tests logging in', async () => {
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admin1234' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(container.querySelector('h1')).toBeInTheDocument()
     
    });
  });
});

 // Assuming `testToken` is declared outside the test scope
//  testToken = Cookies.get('accessToken');