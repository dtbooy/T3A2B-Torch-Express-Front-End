import React, {useState } from 'react'
import {Button, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../../styling/home.css"
import Locations from './Locations'
import Buses from './Buses'
import HomeCards from './Cards'

const Home = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <h1>Torch Transit</h1>
      <Container>
        <Row className="justify-content-md-between align-items-center mx-4">
          <h1 className="col-lg-7">Get On Board! Reserve Your Free Ride to the Olympics Now!</h1>
          <Link to="/search"><Button className="col-lg-2 mt-3 mt-lg-1" variant="primary">Book Now</Button></Link>
        </Row>
      </Container>

      <Container className="home-container">
        <HomeCards handleShow={handleShow} />
        
        <h2 id="buses">Our Buses</h2>
        <Buses />

        <h2 id="locations">Locations</h2>
        <Locations />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contact Us</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Phone:</strong> +1234567890</p>
            <p><strong>Address:</strong> 123 Sesame Street, City, Country</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default Home