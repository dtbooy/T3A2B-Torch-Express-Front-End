import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

const LocationModal = ({ editedField, handleChange, handleCloseEditModal, updateField }) => {
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
        const requiredFields = ['name', 'address', 'directions']
        const newErrors = {}

        // validation that there is no blak field 
        requiredFields.forEach(fieldName => {
            if (!editedField[fieldName]) {
                newErrors[fieldName] = 'This Field is Required'
            }
        })
        // set valitation error
        setErrors(newErrors)
        
        // if no validation errors then update the field/s and close modal 
        if (Object.keys(newErrors).length === 0) {
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



