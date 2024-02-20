import React from 'react';
import { Form } from 'react-bootstrap';

const ServiceModal = ({ editedService, handleChange, locations }) => {
    return (
            <Form>
                <Form.Group>
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" name="eventName" value={editedService?.eventName} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Collection Time</Form.Label>
                    <Form.Control type="datetime-local" name="collectionTime" value={editedService?.collectionTime} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Estimated Travel Time</Form.Label>
                    <Form.Control type="number" name="estimatedTravelTime" value={editedService?.estimatedTravelTime} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control type="number" name="capacity" value={editedService?.capacity} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Pick Up Location</Form.Label>
                    <Form.Select value={editedService?.pickupLocation?._id} onChange={(e) => handleChange(e.target.value, 'pickupLocation')}>
                        <option value="">Select Pick Up Location</option>
                        {locations.map((location) => (
                            <option key={location._id} value={location._id}>{location.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Drop Off Location</Form.Label>
                    <Form.Select value={editedService?.dropoffLocation?._id} onChange={(e) => handleChange(e.target.value, 'dropoffLocation')}>
                        <option value="">Select Drop Off Location</option>
                        {locations.map((location) => (
                            <option key={location._id} value={location._id}>{location.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

            </Form>
    )
}

export default ServiceModal;
