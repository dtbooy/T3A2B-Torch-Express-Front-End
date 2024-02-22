import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeCards = ({handleShow}) => {
  return (
    <>
    <Card className="home-card">
    <Card.Body>
      <Card.Title>Our Buses </Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary" href="#buses">Read More</Button>
    </Card.Body>
  </Card>
  <Card className="home-card">
    <Card.Body>
      <Card.Title>Locations</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary" href="#locations">Read More</Button>
    </Card.Body>
  </Card>
  <Card className="home-card">
    <Card.Body>
      <Card.Title>The Offical Website for the 2032 Olympics</Card.Title>
      <Card.Text>
        The Q2032 website can provide some more helpful information about the Brisbane 2032 Olympics.
      </Card.Text>
      <Link to="https://q2032.au/"><Button variant="primary">Visit Q2032</Button></Link>

    </Card.Body>
  </Card>
  <Card className="home-card">
    <Card.Body> 
      <Card.Title>Contact Us</Card.Title>
      <Card.Text>
        For inquiries, assistance, or further information, please don't hesitate to click here to contact us.
      </Card.Text>
      <Button variant="primary" onClick={handleShow}>Contact</Button>
    </Card.Body>
  </Card>
  </>
  )
}

export default HomeCards
