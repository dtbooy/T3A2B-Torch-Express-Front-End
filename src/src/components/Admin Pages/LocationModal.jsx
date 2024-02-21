import React from 'react'
import { Form } from 'react-bootstrap'

const LocationModal = ({ editedField, handleChange }) => {


    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={editedField.name} onChange={(e) => handleChange(e.target.value, 'name')} />
            </Form.Group>
        </Form>
    )
}

export default LocationModal
