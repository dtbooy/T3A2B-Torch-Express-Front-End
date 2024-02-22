import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

const ServiceModal = ({ editedField, handleChange }) => {
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch("http://localhost:4001/locations")
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(error => console.error('Error fetching locations:', error))
    }, [])

    const handleInputChange = (e, fieldName) => {
        const { value } = e.target
        handleChange(value, fieldName)
    }

    const handlePickupLocationChange = (e) => {
        const { value } = e.target;
        const locationObject = locations.find(location => location._id === value);
        handleChange(locationObject, 'pickupLocation')
    }

    const handleDropoffLocationChange = (e) => {
        const { value } = e.target;
        const locationObject = locations.find(location => location._id === value);
        handleChange(locationObject, 'dropoffLocation')
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Bus Number</Form.Label>
                <Form.Control type="text" name="busNumber" value={editedField?.busNumber || ''} onChange={(e) => handleInputChange(e, 'busNumber')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Collection Time</Form.Label>
                <Form.Control type="datetime-local" name="collectionTime" value={editedField?.collectionTime || ''} onChange={(e) => handleInputChange(e, 'collectionTime')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Estimated Travel Time</Form.Label>
                <Form.Control type="number" name="estimatedTravelTime" value={editedField?.estimatedTravelTime || ''} onChange={(e) => handleInputChange(e, 'estimatedTravelTime')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Capacity</Form.Label>
                <Form.Control type="number" name="capacity" value={editedField?.capacity || ''} onChange={(e) => handleInputChange(e, 'capacity')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Pick Up Location</Form.Label>
                <Form.Select value={editedField?.pickupLocation?._id || ''} onChange={handlePickupLocationChange}>
                    <option value="">Select Pick Up Location</option>
                    {locations.map(location => (
                        <option key={location._id} value={location._id}>{location.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Drop Off Location</Form.Label>
                <Form.Select value={editedField?.dropoffLocation?._id || ''} onChange={handleDropoffLocationChange}>
                    <option value="">Select Drop Off Location</option>
                    {locations.map(location => (
                        <option key={location._id} value={location._id}>{location.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    )
}

export default ServiceModal
