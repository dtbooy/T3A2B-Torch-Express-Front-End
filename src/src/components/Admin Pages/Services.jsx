import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import ServiceModal from './ServiceModal'
import ServicesRow from './ServicesRow'


const Services = () => {
    const [services, setServices] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [editedService, setEditedService] = useState({})
    const [locations, setLocations] = useState([])

    useEffect(() => {
        fetch("http://localhost:4001/locations")
            .then((res) => res.json())
            .then((data) => setLocations(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:4001/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error))
    }, [services])

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
            });

            if (!response.ok) {
                throw new Error('Failed to update service');
            }

            const updatedService = await response.json();

            setServices(prevServices => prevServices.map(service => {
                if (service._id === updatedService._id) {
                    return updatedService;
                }
                return service;
            }));

            handleCloseEditModal();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    }

    const handleChange = (value, field) => {
        setEditedService(prevState => ({
            ...prevState,
            [field]: value
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
                        <ServicesRow key={service._id} service={service} handleEdit={handleEdit} deleteService={deleteService} />
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ServiceModal editedService={editedService} handleChange={handleChange} locations={locations}/>
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
