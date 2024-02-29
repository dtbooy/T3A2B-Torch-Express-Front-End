import '@testing-library/jest-dom'
import { describe, expect, it, beforeEach} from 'vitest'
import {render, screen} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'

describe('Login Page', () => {
    let container

    beforeEach(() => {
        container = render(
          <BrowserRouter>
            <Login/>
          </BrowserRouter>
        ).container
      })

    it('renders the login component', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Login')
    })
})

describe('Register Page', () => {
    let container

    beforeEach(() => {
        container = render(
          <BrowserRouter>
            <Register/>
          </BrowserRouter>
        ).container
      })

    it('renders the register component', () => {

        expect(container.querySelector('h1')).toHaveTextContent('Sign Up')
    })
})