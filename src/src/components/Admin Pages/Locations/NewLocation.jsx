import {useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'

const NewLocation = () => {
    const [inputForm, setInputForm] = useState({
        name: "",
        address: "",
        directions: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        directions: "",
    })
    const nav = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputForm({
            ...inputForm,
            [name]: value,
        })
    }

    const inputValidation = () => {
        let valid = true
        const newErrors = { ...errors }

        if (!inputForm.name) {
            newErrors.name = "Name is required"
            valid = false
        } else {
            newErrors.name = ""
        }

        if (!inputForm.address) {
            newErrors.address = "Address is required"
            valid = false
        } else {
            newErrors.address = ""
        }

        if (!inputForm.directions) {
            newErrors.directions = "Directions are required"
            valid = false
        } else {
            newErrors.directions = ""
        }

        setErrors(newErrors)
        return valid
    }

    async function createLocation(e) {
        e.preventDefault()

        if (!inputValidation()) {
            return
        }

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
            }
        } catch (error) {
            console.error('Error creating service:', error)
        }

        nav('/admin/locations')
    }

    return (
        <Form onSubmit={createLocation}>
            <Form.Group className="mb-3">
                <Form.Label>Location Name</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Location Name"
                    name="name"
                    value={inputForm.name}
                    onChange={handleChange} />
                <Form.Text className="text-danger">{errors.name}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Location Address</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={inputForm.address}
                    onChange={handleChange} />
                <Form.Text className="text-danger">{errors.address}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Directions</Form.Label>
                <Form.Control type="text"
                    placeholder="Enter Directions"
                    name="directions"
                    value={inputForm.directions}
                    onChange={handleChange} />
                <Form.Text className="text-danger">{errors.directions}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Create New Location
            </Button>
            <Link to="/admin/locations">
                <Button variant="secondary">
                    Cancel
                </Button>
            </Link>
        </Form>
    )
}

export default NewLocation
