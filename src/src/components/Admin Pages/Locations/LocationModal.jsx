import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

const LocationModal = ({ editedField, handleChange, handleCloseEditModal, updateField }) => {
    const [errors, setErrors] = useState({})

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target
        handleChange(value, fieldName)
        setErrors({ ...errors, [fieldName]: '' })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}
        if (!editedField.name) {
            newErrors.name = 'Name is required'
        }
        if (!editedField.address) {
            newErrors.address = 'Address is required'
        }
        if (!editedField.directions) {
            newErrors.directions = 'Directions are required'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            updateField()
            handleCloseEditModal()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={editedField.name} onChange={(e) => handleInputChange(e, 'name')} isInvalid={!!errors.name} />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={editedField.address} onChange={(e) => handleInputChange(e, 'address')} isInvalid={!!errors.address} />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Directions</Form.Label>
                <Form.Control type="text" name="directions" value={editedField.directions} onChange={(e) => handleInputChange(e, 'directions')} isInvalid={!!errors.directions} />
                <Form.Control.Feedback type="invalid">{errors.directions}</Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditModal}>
                    Close
                </Button>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Form>
    )
}

export default LocationModal



