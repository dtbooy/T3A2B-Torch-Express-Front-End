import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const NewRoute = () => {
  const [locations, setLocations] = useState([])
  const [inputForm, setInputForm] = useState({
    eventName: "",
    collectionTime: "",
    estimatedTravelTime: "",
    capacity: "",
    pickupLocation: "",
    dropoffLocation: "",
  })
  const nav = useNavigate()

  useEffect(() => {
    fetch("http://localhost:4001/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch(error => console.error('Error fetching locations:', error))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'pickupLocation' || name === 'dropoffLocation') {
      setInputForm({
        ...inputForm,
        [name]: value,
      })
    } else {
      setInputForm({
        ...inputForm,
        [name]: value,
      })
    }
  }
  

  async function createBusService(e) {
    e.preventDefault()
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
      }
    } catch (error) {
      console.error('Error creating service:', error)
    }
    console.log(inputForm)
    nav('/admin/services')
  }

  return (
    <Form onSubmit={createBusService}>
      <Form.Group className="mb-3">
        <Form.Label>Route Name</Form.Label>
        <Form.Control type="text"
          placeholder="Enter name"
          name="eventName"
          value={inputForm.eventName}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pick Up</Form.Label>
        <Form.Control type="datetime-local"
          placeholder="Select Date and Time"
          name="collectionTime"
          value={inputForm.collectionTime}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Travel Time</Form.Label>
        <Form.Control type="number"
          placeholder="Select Time"
          name="estimatedTravelTime"
          value={inputForm.estimatedTravelTime}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Pick Up Location</Form.Label>
        <Form.Select name="pickupLocation" value={inputForm.pickupLocation} onChange={handleChange} >
          <option value="" >Select Pick Up Location</option>
          {locations.map((location) => (
            <option key={location._id} value={location._id}>{location.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Drop Off Location</Form.Label>
        <Form.Select name="dropoffLocation" value={inputForm.dropoffLocation} onChange={handleChange} >
          <option value="">Select Drop Off Location</option>
          {locations.map((location) => (
            <option key={location._id} value={location._id}>{location.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Capacity</Form.Label>
        <Form.Control type="number"
          placeholder="Select Capacity"
          name="capacity"
          value={inputForm.capacity}
          onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create New Service
      </Button>
    </Form>
  )
}

export default NewRoute
