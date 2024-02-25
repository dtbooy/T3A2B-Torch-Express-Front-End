import React, { useEffect, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

const ServiceModal = ({ editedField, handleChange, handleCloseEditModal, updateField }) => {
    // get locations for pickup and dropoff 
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch("http://localhost:4001/locations")
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(error => console.error('Error fetching locations:', error))
    }, [])

    // state for form validation errors 
    const [errors, setErrors] = useState({})

    // handle input change on form fields 
    const handleInputChange = (e, fieldName) => {
        const { value } = e.target
        // If a location field, find the corresponding location object in the locations array
        const fieldValue = fieldName === 'pickupLocation' || fieldName === 'dropoffLocation'
            ? locations.find(location => location._id === value)
            : value
        handleChange(fieldValue, fieldName)
        // clear error message when field changes
        setErrors({ ...errors, [fieldName]: '' })
    }
    
    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const requiredFields = ['busNumber', 'collectionTime', 'estimatedTravelTime', 'capacity', 'pickupLocation', 'dropoffLocation']
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
                <Form.Label>Bus Number</Form.Label>
                <Form.Control type="number" name="busNumber" value={editedField?.busNumber || ''} onChange={(e) => handleInputChange(e, 'busNumber')} isInvalid={!!errors.busNumber} />
                <Form.Control.Feedback type="invalid">{errors.busNumber}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Collection Time</Form.Label>
                <Form.Control type="datetime-local" name="collectionTime" value={editedField?.collectionTime || ''} onChange={(e) => handleInputChange(e, 'collectionTime')} isInvalid={!!errors.collectionTime} />
                <Form.Control.Feedback type="invalid">{errors.collectionTime}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Estimated Travel Time</Form.Label>
                <Form.Control type="number" name="estimatedTravelTime" value={editedField?.estimatedTravelTime || ''} onChange={(e) => handleInputChange(e, 'estimatedTravelTime')} isInvalid={!!errors.estimatedTravelTime} />
                <Form.Control.Feedback type="invalid">{errors.estimatedTravelTime}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Capacity</Form.Label>
                <Form.Control type="number" name="capacity" value={editedField?.capacity || ''} onChange={(e) => handleInputChange(e, 'capacity')} isInvalid={!!errors.capacity} />
                <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Pick Up Location</Form.Label>
                <Form.Select value={editedField?.pickupLocation?._id || ''} onChange={(e) => handleInputChange(e, 'pickupLocation')} isInvalid={!!errors.pickupLocation}>
                    <option value="">Select Pick Up Location</option>
                    {locations.map(location => (
                        <option key={location._id} value={location._id}>{location.name}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.pickupLocation}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Drop Off Location</Form.Label>
                <Form.Select value={editedField?.dropoffLocation?._id || ''} onChange={(e) => handleInputChange(e, 'dropoffLocation')} isInvalid={!!errors.dropoffLocation}>
                    <option value="">Select Drop Off Location</option>
                    {locations.map(location => (
                        <option key={location._id} value={location._id}>{location.name}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.dropoffLocation}</Form.Control.Feedback>
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

export default ServiceModal
