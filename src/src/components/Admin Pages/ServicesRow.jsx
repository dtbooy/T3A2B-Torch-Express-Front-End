import React from 'react'
import { Button } from 'react-bootstrap';

const ServicesRow = ({ service, handleEdit, deleteService }) => {
    return (
        <tr>
            <td>{service.eventName}</td>
            <td>{new Date(service.collectionTime).toLocaleString()}</td>
                            <td>{service.estimatedTravelTime}</td>
                            <td>{service.pickupLocation.name}</td>
                            <td>{service.dropoffLocation.name}</td>
                            <td>{service.capacity}</td>

            <td>
                <Button variant="warning" onClick={() => handleEdit(service)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteService(service._id)}>Delete</Button>
            </td>
        </tr>
    )
}

export default ServicesRow