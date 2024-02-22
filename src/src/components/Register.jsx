import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {
  const nav = useNavigate()
  const [fieldErrors, setFieldErrors] = useState('')
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    DOB: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:4001/users/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    })
    const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        // Store user data and access token in sessionStorage
      setValues({
        name: '',
        email: '',
        password: '',
        DOB: ''
      })
      nav('/login')

    } else if (res.status === 400) {
      setFieldErrors(data.errors)
      
    } else {
      console.error(data.errors)
    }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Container>
        <h1>Sign up with Torch Express</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
            {fieldErrors.name && <div className="error-message">{fieldErrors.name}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email"
              value={values.email} 
              onChange={(e) => setValues({ ...values, email: e.target.value })} />
              {fieldErrors.email === "You've already made an account" ? (
                <>
                  <div className="error-message">{fieldErrors.email}</div>
                  <Button type="button" class="btn btn-secondary btn-sm" onClick={() => nav('/login')} >Login</Button>
                </>
              ) : fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
            {fieldErrors.password && <div className="error-message">{fieldErrors.password}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" value={values.DOB} onChange={(e) => setValues({ ...values, DOB: e.target.value })} />
            {fieldErrors.DOB && <div className="error-message">{fieldErrors.DOB}</div>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Container>
    </>
  )
}

export default Register
