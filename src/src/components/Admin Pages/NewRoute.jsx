import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewRoute = ({addService}) => {

  const [inputForm, setinputForm] = useState({
    eventName: "",
    collectionTime: "",
    estimatedTravelTime: "",
    capacity: "",
    pickupLocation: "",
    dropoffLocation: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputForm({
      ...inputForm,
      [name]: value,
    });
  }

  async function createBusService(e){
    e.preventDefault()

    await addService(inputForm)

    console.log(inputForm);
    // nav('/admin/services')
  };


  return (
    <Form onSubmit={createBusService}>
      <Form.Group className="mb-3">
        <Form.Label>Route Name</Form.Label>
        <Form.Control type="text"
          placeholder="Enter name"
          name="eventName"
          value={inputForm.name}
          onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pick Up</Form.Label>
        <Form.Control type="text"
        placeholder="Select Date and Time"
        name="collectionTime"
        value={inputForm.name}
        onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Travel Time</Form.Label>
        <Form.Control type="text" 
        placeholder="Select and Time"
        name="estimatedTravelTime"
        value={inputForm.name}
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pick Up Location</Form.Label>
        <Form.Control type="text" 
        placeholder="Select Location"
        name="pickupLocation"
        value={inputForm.name}
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Drop Off Location</Form.Label>
        <Form.Control type="text" 
        placeholder="Select Location"
        name="dropoffLocation"
        value={inputForm.name}
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Capacity</Form.Label>
        <Form.Control type="text" 
        placeholder="Select Capacity"
        name="capacity"
        value={inputForm.name}
        onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create New Service
      </Button>
    </Form>
  )
}
  
  

export default NewRoute