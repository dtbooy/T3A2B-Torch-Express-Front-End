import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

const UserModal = ({ editedField, handleChange, handleCloseEditModal, updateField }) => {
    // state for form validation errors 
    const [errors, setErrors] = useState({})

    // handle input change on form fields 
    const handleInputChange = (e, fieldName) => {
        const { value } = e.target
        handleChange(value, fieldName)
        // clear error message when field changes
        setErrors({ ...errors, [fieldName]: '' })
    }

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const requiredFields = ['name', 'email']
        const newErrors = {}

        // validation that there is no blank field 
        requiredFields.forEach(fieldName => {
            if (!editedField[fieldName]) {
                newErrors[fieldName] = 'This Field is Required'
            }
        })
        // set validation error
        setErrors(newErrors)
        
        // if no validation errors then update the field/s and close modal 
        if (Object.keys(newErrors).length === 0) {
            updateField()
            handleCloseEditModal()
        }
    }

    // handle role change
    const handleRoleChange = (e) => {
        const isAdmin = e.target.value === 'Admin'
        handleChange(isAdmin, 'is_admin')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={editedField.name} onChange={(e) => handleInputChange(e, 'name')} isInvalid={!!errors.name} />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={editedField.email} onChange={(e) => handleInputChange(e, 'email')} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select value={editedField.is_admin ? 'Admin' : 'User'} onChange={handleRoleChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </Form.Select>
            </Form.Group>
            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="outline-secondary" onClick={handleCloseEditModal}>
                    Close
                </Button>
                <Button variant="outline-success" type="submit">
                    Save
                </Button>
            </Modal.Footer>
        </Form>
    )
}

export default UserModal
