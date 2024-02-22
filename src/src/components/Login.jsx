
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      console.log(res.status)

      // Check if login was successful
      if (res.status === 200) {
        // Store user data and access token in sessionStorage
        updateAccessToken(data.accessToken)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        setIsLoggedIn(true)
        nav('/')
        
      } else {
        // Handle login error
        setErrorMessage(data.error)
        console.error(errorMessage)
        alert(errorMessage)
      }
    } catch (err) {
      console.error(err)
      setErrorMessage('An unexpected error occurred.')
    }
  }

  return (
    <Container>
      <h1>Login to Torch Express</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <div>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </Container>
  )
}

export default Login
