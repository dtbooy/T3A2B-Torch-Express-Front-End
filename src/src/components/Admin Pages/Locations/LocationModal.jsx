import React from 'react'
import { Form } from 'react-bootstrap'

const LocationModal = ({ editedField, handleChange }) => {

        const handleInputChange = (e, fieldName) => {
            const { value } = e.target
            handleChange(value, fieldName)
        }
    
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={editedField.name} onChange={(e) => handleInputChange(e, 'name')} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={editedField.address} onChange={(e) => handleInputChange(e, 'address')} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Directions</Form.Label>
                    <Form.Control type="text" name="directions" value={editedField.directions} onChange={(e) => handleInputChange(e, 'directions')} />
                </Form.Group>
            </Form>
        )
    }
    
    export default LocationModal;
    


