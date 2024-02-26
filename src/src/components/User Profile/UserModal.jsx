import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PasswordInput from '../PasswordInput'

const UserModal = ({ user, updateUser, handleCloseEditModal }) => {
    // State for form data 
    const [userData, setUserData] = useState({...user, password: ''})
    // state for form validation errors 
    const [errors, setErrors] = useState({})

    const [confirmPassword, setConfirmPassword] = useState('')

    //hide password from user

    // Functionality to handle form input
    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData({
            ...userData,
            [name]: value,
        })

        if (name === 'password') {
            setConfirmPassword(value)
        }

    // Clear error message when field changes
    setErrors({ ...errors, [name]: '' })
    }

    // Functionality to handle password input
    const handlePasswordChange = (e) => {
        const { value } = e.target
        setUserData({
            ...userData,
            password: value,
        })
    }

    // Functionality to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}
        const requiredFields = ['name', 'email', 'password', 'DOB']

        // Validate required fields
        requiredFields.forEach(fieldName => {
            if (!userData[fieldName]) {
                newErrors[fieldName] = 'This Field is Required'
            }
        })

        if (userData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        // Set validation errors
        setErrors(newErrors)

        // If no validation errors, update the user data
        if (Object.keys(newErrors).length === 0) { 
            updateUser(userData)
            handleCloseEditModal()
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label> Update Name</Form.Label>
                    <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Update Email</Form.Label>
                    <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label> Update Password</Form.Label>
                    <PasswordInput
                        value={userData.password}
                        onChange={handlePasswordChange}
                        name="password"
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Updated Password</Form.Label>
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="confirmPassword"
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="DOB" value={userData.DOB} onChange={handleChange} isInvalid={!!errors.DOV} />
                    <Form.Control.Feedback type="invalid">{errors.DOB}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                    Close
                </Button>
            </Form>
        </>
    )
}

export default UserModal
