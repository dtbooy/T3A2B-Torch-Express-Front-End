import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PasswordInput from './PasswordInput'
import Cookies from 'js-cookie'
import '../styling/authpages.scss'
import { Card } from 'react-bootstrap'

const Login = ({ setIsLoggedIn, setUser, updateAccessToken }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const nav = useNavigate()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:4001/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      const data = await res.json()
      // console.log(data)
      // console.log(res.status)

      // Check if login was successful
      if (res.status === 200) {
        // Store user data and access token in sessionStorage
        console.log(data)
        await updateAccessToken(data.token)
        Cookies.set('userData', JSON.stringify(data.user), { sameSite: 'None', secure: true })
        setUser(data.user)
        setIsLoggedIn(true)
        nav('/')

      } else if (res.status === 401) {
        // Handle login error
        setErrorMessage(data.error)
        console.error(errorMessage)
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.')
    }
  }

  return (
    <Container className="d-flex  justify-content-center align-items-center vh-100">
      <Card className="login-card p-4">
        <h1 className="text-center login-title">Login</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <PasswordInput value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
          </Form.Group>
          <Button type="submit" className="w-100 login-button">
            Login
          </Button>
        </Form>
        <div className="mt-3 text-center">
          Don't have an account? <Link to="/register" className="login-link">Sign Up</Link>
        </div>
      </Card>
    </Container>
  )
}

export default Login
