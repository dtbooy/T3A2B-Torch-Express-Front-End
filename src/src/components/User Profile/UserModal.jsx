import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import DeleteModal from '../Admin Pages/DeleteModal'

const UserModal = ({ user, setUser, updateUser, handleCloseEditModal, deleteUser }) => {
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordChanged, setPasswordChanged] = useState(false)
    // State for form data 
    const [userData, setUserData] = useState(user)

    // state for form validation errors 
    const [errors, setErrors] = useState({})

    // Functionality to handle form input
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({
            ...userData,
            [name]: value,
        })
        if (name === 'password' && value === '') {
            setPasswordChanged(true)
        }
        if (name === 'confirmPassword') {
            setConfirmPassword(value)
        }
        // Clear error message when field changes
        setErrors({ ...errors, [name]: '' })
        console.log(errors)
        console.log(confirmPassword)
        console.log(userData.password)
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

        // Add error for confirm password if passwords don't match
        if (passwordChanged && userData.password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        // Set validation errors
        setErrors(newErrors)

        // If no validation errors, update the user data
        if (Object.keys(newErrors).length === 0) {
            updateUser(userData)
            setUser(userData)
            handleCloseEditModal()
        }
    }
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)

    const handleDeleteConfirmation = (id) => {
        setSelectedItemId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = () => {
        deleteUser(selectedItemId)
        setShowDeleteModal(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className="profile-label">Name</Form.Label>
                    <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="profile-label">Email</Form.Label>
                    <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="profile-label">Password</Form.Label>
                    <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                {passwordChanged && ( // Render Confirm Password field only if password has been changed
                    <Form.Group>
                        <Form.Label className="profile-label">Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword} />
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                )}
                <Form.Group>
                    <Form.Label className="profile-label">Date of Birth</Form.Label>
                    <Form.Control type="date" name="DOB" value={userData.DOB} onChange={handleChange} isInvalid={!!errors.DOV} />
                    <Form.Control.Feedback type="invalid">{errors.DOB}</Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer className="d-flex justify-content-evenly align-items-evenly">
                <Button variant="outline-secondary" onClick={handleCloseEditModal}>Cancel </Button>
                <Button className="edit-button" type="submit">Save</Button>
                </Modal.Footer>
                <Modal.Footer className="d-flex justify-content-evenly align-items-evenly"><Button className="delete-button" onClick={() => handleDeleteConfirmation(user._id)}>Delete Account</Button></Modal.Footer>
            </Form>
            <DeleteModal message="Are you sure you want to delete your account?" show={showDeleteModal} onHide={handleDeleteCancel} onDeleteConfirm={handleDeleteConfirm} />
        </>
    )
}

export default UserModal
