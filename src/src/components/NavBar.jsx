import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProfileIcon from './User Profile/ProfileIcon'
import '../styling/NavBar.css'
import UserProfileCard from './User Profile/UserProfileCard'
import { useState } from 'react'
import LogoutModal from './User Profile/LogoutModal'

const NavigationBar = ({setIsLoggedIn, isLoggedIn, isAdmin, user }) => {
  const userId = user._id
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  return (
    <Navbar expand="lg" className='nav-bar'>
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Buses</Nav.Link>
            {isLoggedIn && <Nav.Link as={Link} to={`/user/mytrips/${userId}`}>My Trips</Nav.Link>}
             {isLoggedIn && isAdmin && (<NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/services">Routes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/reservations">Reservations</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/locations">Locations</NavDropdown.Item>
            </NavDropdown>
            )}

          </Nav>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <NavDropdown
                title={<ProfileIcon user={user} />}
                id="basic-nav-dropdown"
                className="profile-dropdown"
              >   
                  <NavDropdown.Item as={Link} to="/user/profile" >
                    <UserProfileCard user={user} />
                  </NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/user/profile" className="profile-dropdown-item">
                  Update Profile Details
                </NavDropdown.Item>
                  <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={`/user/mytrips/${userId}`} className="profile-dropdown-item">
                  My Trips
                </NavDropdown.Item>
                  <NavDropdown.Divider />
                <NavDropdown.Item >
                <Button variant="outline-danger" className='logout-button' onClick={() => setShowLogoutModal(true)}>
                    Logout
                </Button>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/register"><Button variant="outline-primary">Sign Up</Button></Nav.Link>
                <Nav.Link as={Link} to="/login"><Button variant="outline-info">Login</Button></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <LogoutModal show={showLogoutModal} user={user}onHide={() => setShowLogoutModal(false)} setIsLoggedIn={setIsLoggedIn} />
    </Navbar>
  )
}

export default NavigationBar