import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#home">Buses</Nav.Link>
            <Nav.Link href="#link">Plan Your Trip</Nav.Link>
            <Nav.Link href="#link">My Trips</Nav.Link>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Routes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Users</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Reservations</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Locations</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#link"><Button variant="outline-primary">Sign Up</Button></Nav.Link>
            <Nav.Link href="#link"><Button variant="outline-info">Login</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar
