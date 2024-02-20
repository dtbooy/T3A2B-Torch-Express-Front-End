import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Buses</Nav.Link>
            <Nav.Link as={Link} to="/">Plan Your Trip</Nav.Link>
            <Nav.Link as={Link} to="/">My Trips</Nav.Link>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/services">Routes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Users</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Reservations</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">Locations</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/register"><Button variant="outline-primary">Sign Up</Button></Nav.Link>
          <Nav.Link as={Link} to="/login"><Button variant="outline-info">Login</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar
