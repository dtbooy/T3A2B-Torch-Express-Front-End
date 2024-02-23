import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form } from 'react-bootstrap'


const Services = () => {
    const [services, setServices] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [editedService, setEditedService] = useState({})

    useEffect(() => {
        fetch('http://localhost:4001/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error))
    }, [])

    // Delete functionality 
    async function deleteService(id) {
        const reponse = await fetch(`http://localhost:4001/services/${id}`, 
        { method: 'Delete' })
        setServices(prevServices => prevServices.filter(service => service._id !== id))
    }

    // Edit functionality
    const handleEdit = (service) => {
        setEditedService(service)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setEditedService({})
    }

    const updateService = async () => {
        try {
            const response = await fetch(`http://localhost:4001/services/${editedService._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedService)
            }) 
    
            if (!response.ok) {
                throw new Error('Failed to update service') 
            }
    
            const updatedService = await response.json() 
    
            setServices(prevServices => prevServices.map(service => {
                if (service._id === updatedService._id) {
                    return updatedService 
                }
                return service 
            })) 
            
            handleCloseEditModal() 
        } catch (error) {
            console.error('Error updating service:', error) 
        }
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditedService(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <h1>Routes</h1>
            <Link to="/admin/services/new"><Button variant="success">New</Button></Link>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Collection Time</th>
                        <th>Estimated Travel Time (mins)</th>
                        <th>Pickup Location</th>
                        <th>Dropoff Location</th>
                        <th>Capacity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service._id}>
                            <td>{service.eventName.join(', ')}</td>
                            <td>{new Date(service.collectionTime).toLocaleString()}</td>
                            <td>{service.estimatedTravelTime}</td>
                            <td>{service.pickupLocation}</td>
                            <td>{service.dropoffLocation}</td>
                            <td>{service.capacity}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(service)}>Edit</Button>
                                <Button variant="danger" onClick={() => deleteService(service._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateService}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Services
