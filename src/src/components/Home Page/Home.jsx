import React, {useState } from 'react'
import {Button, Card, Col, Container, Image, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GrNext } from "react-icons/gr";
import Locations from './Locations'
import Buses from './Buses'
import '../../styling/home.scss'
import HomeModal from './HomeModal';

const Home = () => {

  const [show, setShow] = useState(false)

  const [showBusesModal, setShowBusesModal] = useState(false);
  const [showLocationsModal, setShowLocationsModal] = useState(false);

  const handleCloseBusesModal = () => setShowBusesModal(false);
  const handleCloseLocationsModal = () => setShowLocationsModal(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <h1>Torch Transit</h1>
      <Container className="home-banner ">
      <Row className="align-items-center mx-4">
        <div className="col-lg-7">
          <h1>Get On Board!</h1>
          <h2>Reserve Your Free Ride to the Olympics Now!</h2>
          <Link to="/search" className="me-3">
            <Button className="book-button">Book Now</Button>
          </Link>
        </div>
        
        <div className="col-lg-5 d-flex justify-content-end align-items-center">
          <Image src="/Logo1.png" />
        </div>
      </Row>
    </Container>

      <Container className="mt-4">
        <Row xs={1} md={2} lg={4} className="g-4">
          <Col>
            <Card className="home-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center">Our Buses</Card.Title>
                <Card.Img src="/buslogo.png" className="homeicon" />
                <Button onClick={() => setShowBusesModal(true)} className="mt-auto custom-button">
                  <GrNext />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="home-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center">Locations</Card.Title>
                <Card.Img src="/locationicon.png" className="homeicon" />
                <Button  onClick={() => setShowLocationsModal(true)} className="mt-auto custom-button">
                  <GrNext />
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="home-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center">Q2023</Card.Title>
                <Card.Img src="/olympicicon.png" className="homeicon" />
                <Link to="https://q2032.au/">
                  <Button className="mt-auto custom-button">
                    <GrNext />
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="home-card">
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="text-center">Contact Us</Card.Title>
                <Card.Img src="/contacticon.png" className="homeicon" />
                <Button onClick={handleShow} className="mt-auto custom-button">
                  <GrNext />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <HomeModal
        title="Our Buses"
        content={<Buses />}
        show={showBusesModal}
        handleClose={handleCloseBusesModal}
      />

      {/* Modal for Locations */}
      <HomeModal
        title="Locations"
        content={<Locations />}
        show={showLocationsModal}
        handleClose={handleCloseLocationsModal}
      />



        

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
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
  )
}

export default Home