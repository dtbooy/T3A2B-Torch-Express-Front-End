import React from 'react' 
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
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Buses</Nav.Link>
            <Nav.Link as={Link} to="/user/mytrips">My Trips</Nav.Link>
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/services">Routes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/reservations">Reservations</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/locations">Locations</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/register"><Button variant="outline-primary">Sign Up</Button></Nav.Link>
          <Nav.Link as={Link} to="/login"><Button variant="outline-info">Login</Button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) 
}

export default NavigationBar
