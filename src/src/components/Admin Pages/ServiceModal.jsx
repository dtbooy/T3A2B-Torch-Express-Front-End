import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

const ServiceModal = ({ editedField, handleChange }) => {
    const [locations, setLocations] = useState([])

        useEffect(() => {
            fetch("http://localhost:4001/locations")
                .then((res) => res.json())
                .then((data) => setLocations(data))
        }, [])

        const handleInputChange = (e) => {
            const { name, value } = e.target
            handleChange(value, name)
        }
    return (
            <Form>
                <Form.Group>
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" name="eventName" value={editedField?.eventName} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Collection Time</Form.Label>
                    <Form.Control type="datetime-local" name="collectionTime" value={editedField?.collectionTime} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Estimated Travel Time</Form.Label>
                    <Form.Control type="number" name="estimatedTravelTime" value={editedField?.estimatedTravelTime} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" value={editedField?.capacity} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pick Up Location</Form.Label>
                    <Form.Select value={editedField?.pickupLocation?._id} onChange={(e) => handleInputChange(e.target.value, 'pickupLocation')}>
                        <option value="">Select Pick Up Location</option>
                        {locations.map((location) => (
                            <option key={location._id} value={location._id}>{location.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drop Off Location</Form.Label>
                    <Form.Select value={editedField?.dropoffLocation?._id} onChange={(e) => handleInputChange(e.target.value, 'dropoffLocation')}>
                        <option value="">Select Drop Off Location</option>
                        {locations.map((location) => (
                            <option key={location._id} value={location._id}>{location.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

            </Form>
    )
}

export default ServiceModal
