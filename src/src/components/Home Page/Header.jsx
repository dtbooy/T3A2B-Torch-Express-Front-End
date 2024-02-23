import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Container>
      <Row className="justify-content-md-between align-items-center mx-4">
        <h1 className="col-lg-7">Get On Board! Reserve Your Free Ride to the Olympics Now!</h1>
        <Button className="col-lg-2 mt-3 mt-lg-1" variant="primary">Book Now</Button>
      </Row>
    </Container>
  )
}

export default Header
