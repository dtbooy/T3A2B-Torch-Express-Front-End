import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NewLocation = ({ createLocation }) => {
    const [inputForm, setInputForm] = useState({
        name: "",
        address: "",
        directions: "",
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputForm({
            ...inputForm,
            [name]: value,
        })
        setErrors({ ...errors, [name]: '' })
    }

    const nav = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        if (!inputForm.name.trim()) {
            newErrors.name = 'Name is required'
        }
        if (!inputForm.address.trim()) {
            newErrors.address = 'Address is required'
        }
        if (!inputForm.directions.trim()) {
            newErrors.directions = 'Directions are required'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            try {
                const response = await fetch('http://localhost:4001/locations/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputForm)
                })

                if (!response.ok) {
                    throw new Error('Failed to create service')
                } else {
                    nav('/admin/locations')
                }
            } catch (error) {
                console.error('Error creating service:', error)
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Location Name</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Location Name"
                    name="name"
                    value={inputForm.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Location Address</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={inputForm.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Directions</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Directions"
                    name="directions"
                    value={inputForm.directions}
                    onChange={handleChange}
                    isInvalid={!!errors.directions}
                />
                <Form.Control.Feedback type="invalid">{errors.directions}</Form.Control.Feedback>
            </Form.Group>
            <Link to="/admin/locations">
                <Button variant="secondary">
                    Cancel
                </Button>
            </Link>
            <Button variant="primary" type="submit">
                Create New Location
            </Button>
        </Form>
    )
}

export default NewLocation
