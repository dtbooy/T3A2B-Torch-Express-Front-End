import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const UserModal = ({ user, updateUser, handleCloseEditModal }) => {
    
    // State for form data 
    const [userData, setUserData] = useState(user)

    // Functionality to handle form input
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value,
        })
    }

    // Functionality to handle form submission
    const handleSubmit = () => {
        updateUser(userData)
        handleCloseEditModal()
    }

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="DOB" value={userData.DOB} onChange={handleChange} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
            </Button>
        </>
    )
}

export default UserModal