import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PasswordInput from './PasswordInput'
import '../styling/authpages.scss'
import { Card } from 'react-bootstrap'

const Register = () => {
  const nav = useNavigate()
  const [fieldErrors, setFieldErrors] = useState({})
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    DOB: '',
  })

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target
    setValues({ ...values, [fieldName]: value })
    // Clear error message when field changes
    setFieldErrors({ ...fieldErrors, [fieldName]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requiredFields = ['name', 'email', 'password', 'confirmPassword', 'DOB']
    const newErrors = {}

    // Check if any required fields are empty
    requiredFields.forEach((fieldName) => {
      if (!values[fieldName]) {
        newErrors[fieldName] = 'This field is required'
      }
    })

    if (values.password !== values.confirmPassword) {
      setFieldErrors({ ...fieldErrors, confirmPassword: 'Passwords do not match' });
      return;
    }

    // Update the state with the new errors
    setFieldErrors(newErrors)

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await fetch('http://localhost:4001/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const data = await res.json()
        console.log(data)

        if (res.status === 201) {
          setValues({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            DOB: '',
          })
          nav('/login')
        } else if (res.status === 400 || res.status === 409) {
          setFieldErrors({ ...fieldErrors, email: 'Email is already registered' })
        } else {
          console.error(data.errors)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <Container className="d-flex login-container justify-content-center align-items-center vh-100">
      <Card className="login-card p-4">
        <h1 className="text-center login-title">Sign Up</h1>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={values.name}
              onChange={(e) => handleInputChange(e, 'name')}
              isInvalid={!!fieldErrors.name}
            />
            <Form.Control.Feedback type="invalid">{fieldErrors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={values.email}
              onChange={(e) => handleInputChange(e, 'email')}
              isInvalid={!!fieldErrors.email}
            />
            <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <PasswordInput
              value={values.password}
              onChange={(e) => handleInputChange(e, 'password')}
              error={fieldErrors.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <PasswordInput
              value={values.confirmPassword}
              onChange={(e) => handleInputChange(e, 'confirmPassword')}
              error={fieldErrors.confirmPassword}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={values.DOB}
              onChange={(e) => handleInputChange(e, 'DOB')}
              isInvalid={!!fieldErrors.DOB}
            />
            <Form.Control.Feedback type="invalid">{fieldErrors.DOB}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="w-100 login-button">
            Submit
          </Button>
        </Form>
        <div className="mt-3 text-center">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </div>
      </Card>
    </Container>
  )
}

export default Register
