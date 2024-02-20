import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const NewRoute = () => {

  const [inputForm, setInputForm] = useState({
    eventName: "",
    collectionTime: "",
    estimatedTravelTime: "",
    capacity: "",
    pickupLocation: "",
    dropoffLocation: "",
  })

  const nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  }

  async function createBusService(e){
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4001/services/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputForm)
      });

      if (!response.ok) {
          throw new Error('Failed to create service');
      }
  } catch (error) {
      console.error('Error creating service:', error);
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
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pick Up Location</Form.Label>
        <Form.Control type="text" 
        placeholder="Select Location"
        name="pickupLocation"
        value={inputForm.pickupLocation}
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Drop Off Location</Form.Label>
        <Form.Control type="text" 
        placeholder="Select Location"
        name="dropoffLocation"
        value={inputForm.dropoffLocation}
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Capacity</Form.Label>
        <Form.Control type="number" 
        placeholder="Select Capacity"
        name="capacity"
        value={inputForm.capacity}
        onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create New Service
      </Button>
    </Form>
  )
}
  
export default NewRoute