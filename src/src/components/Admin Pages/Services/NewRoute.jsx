import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'

const NewRoute = () => {
  // get locations for pickup and dropoff 
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetch('http://localhost:4001/locations')
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error))
  }, [])

  // state for form input values
  const [inputForm, setInputForm] = useState({
    busNumber: '',
    collectionTime: '',
    estimatedTravelTime: '',
    capacity: '',
    pickupLocation: '',
    dropoffLocation: '',
  })

  // state for form validation errors 
  const [errors, setErrors] = useState({})
  const nav = useNavigate()

  // handle input change on form fields 
  const handleChange = (e) => {
    const { name, value } = e.target
    setInputForm({
      ...inputForm,
      [name]: value,
    })
    // clear error message when field changes
    setErrors({ ...errors, [name]: '' })
  }

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const requiredFields = ['busNumber', 'collectionTime', 'estimatedTravelTime', 'capacity', 'pickupLocation', 'dropoffLocation']
    const newErrors = {}

    // validation that there is no blank field
    requiredFields.forEach(fieldName => {
      if (!inputForm[fieldName]) {
        newErrors[fieldName] = 'This Field is Required'
      }
    })

    // set validation error
    setErrors(newErrors)

    // if no validation errors then submit the form and create new service 
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:4001/services/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputForm)
        })

        if (!response.ok) {
          throw new Error('Failed to create service')
        } else {
          nav('/admin/services')
        }
      } catch (error) {
        console.error('Error creating service:', error)
      }
    }
  }

  return (
<Card className="newRoute" style={{ maxWidth: "500px", margin: "auto" }}>
  <Card.Header>New Service</Card.Header>
  <Card.Body>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label>Bus Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Bus Number"
            name="busNumber"
            value={inputForm.busNumber}
            onChange={handleChange}
            isInvalid={!!errors.busNumber}
          />
          <Form.Control.Feedback type="invalid">{errors.busNumber}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label>Pick Up</Form.Label>
          <Form.Control
            type="datetime-local"
            placeholder="Select Date and Time"
            name="collectionTime"
            value={inputForm.collectionTime}
            onChange={handleChange}
            isInvalid={!!errors.collectionTime}
          />
          <Form.Control.Feedback type="invalid">{errors.collectionTime}</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md={6}>
          <Form.Label>Travel Time</Form.Label>
          <Form.Control
            type="number"
            placeholder="Select Time"
            name="estimatedTravelTime"
            value={inputForm.estimatedTravelTime}
            onChange={handleChange}
            isInvalid={!!errors.estimatedTravelTime}
          />
          <Form.Control.Feedback type="invalid">{errors.estimatedTravelTime}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Select Capacity"
            name="capacity"
            value={inputForm.capacity}
            onChange={handleChange}
            isInvalid={!!errors.capacity}
          />
          <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md={6}>
          <Form.Label>Select Pick Up Location</Form.Label>
          <Form.Select name="pickupLocation" value={inputForm.pickupLocation} onChange={handleChange} isInvalid={!!errors.pickupLocation}>
            <option value="">Select Pick Up Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.pickupLocation}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={6}>
          <Form.Label>Select Drop Off Location</Form.Label>
          <Form.Select name="dropoffLocation" value={inputForm.dropoffLocation} onChange={handleChange} isInvalid={!!errors.dropoffLocation}>
            <option value="">Select Drop Off Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.dropoffLocation}</Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      <div className="d-flex justify-content-center">
        <Link to="/admin/services" className="me-2">
          <Button variant="outline-secondary">Cancel</Button>
        </Link>
        <Button variant="outline-success" type="submit">Create</Button>
      </div>
    </Form>
  </Card.Body>
</Card>

  )
}

export default NewRoute
