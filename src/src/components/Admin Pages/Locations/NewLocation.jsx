import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NewLocation = () => {
    // set state for form input values
    const [inputForm, setInputForm] = useState({
        name: "",
        address: "",
        directions: "",
    })

    // state for form validation errors 
    const [errors, setErrors] = useState({})
    const nav = useNavigate()

    // handle input change on form fields 
    const handleChange = (e) => {
        const { name, value } = e.target
        setInputForm({
            ...inputForm,
            [name]: value.trim(),
        })
        // clear error message when field changes
        setErrors({ ...errors, [name]: '' })
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const requiredFields = ['name', 'address', 'directions']
        const newErrors = {}

        // validation that there is no blank field 
        requiredFields.forEach(fieldName => {
            if (!inputForm[fieldName]) {
                newErrors[fieldName] = 'This Field is Required'
            }
        })

        // set validation error 
        setErrors(newErrors)

        // if no validation errors then submit the form and create new location 
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:4001/locations/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inputForm)
                })

                if (!response.ok) {
                    throw new Error('Failed to create location')
                } else {
                    nav('/admin/locations')
                }
            } catch (error) {
                console.error('Error creating location:', error)
            }
        }
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Card className="newLocation m-5" >
                <Card.Header>New Location</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Location Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={inputForm.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                name="address"
                                value={inputForm.address}
                                onChange={handleChange}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Directions</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Directions"
                                name="directions"
                                value={inputForm.directions}
                                onChange={handleChange}
                                isInvalid={!!errors.directions}
                            />
                            <Form.Control.Feedback type="invalid">{errors.directions}</Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Link to="/admin/locations" className="me-2">
                                <Button variant="outline-secondary">Cancel</Button>
                            </Link>
                            <Button variant="outline-success" type="submit">Create</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default NewLocation
