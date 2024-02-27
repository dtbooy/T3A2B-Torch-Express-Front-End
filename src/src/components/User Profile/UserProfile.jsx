import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import UserModal from './UserModal'
import { useNavigate } from 'react-router-dom'
import '../../styling/userprofile.scss'

const UserProfile = ({user, setUser, updateUserCookie, setIsLoggedIn, isLoggedIn}) => {
    let userId = user._id
// Privacy for Password
    const hidePassword = () => '*'.repeat(10)

    // Delete User Functionality 
    const nav = useNavigate()

    async function deleteUser(userId) {
            try {
                await fetch(`http://localhost:4001/users/${userId}`, { method: 'DELETE' })
                setIsLoggedIn(false)
                // Navigate to home page on deletion
                nav('/')
            } catch (error) {
                console.error('Error Deleting:', error)
            }
    }

    // Update User Functionality
    async function updateUser(updatedUser) {
        try {
            const response = await fetch(`http://localhost:4001/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            })
            if (!response.ok) {
                throw new Error('Failed to update user')
            }
            setUser(updatedUser)
            updateUserCookie(updatedUser)
        } catch (error) {
            console.error('Error Updating:', error)
        }
    }

    // Modal Functionality 
    const [showEditModal, setShowEditModal] = useState(false)

    const handleEdit = () => {
        setShowEditModal(true)
    }
     
    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    return (
        <Container className="d-flex justify-content-center align-items-center">
        <Card className="profile-card">
          <Card.Header as='h4' className="profile-header">Account</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={6} md={4}>
                <Card.Text className="info-header">Name:</Card.Text>
                <Card.Text className="info-header">Email:</Card.Text>
                <Card.Text className="info-header">Password:</Card.Text>
                <Card.Text className="info-header">Date of Birth:</Card.Text>
              </Col>
              <Col xs={6} md={8}>
                <Card.Text className="info-field">{user.name}</Card.Text>
                <Card.Text className="info-field">{user.email}</Card.Text>
                <Card.Text className="info-field">{hidePassword(user.password)}</Card.Text>
                <Card.Text className="info-field">{new Date(user.DOB).toLocaleDateString()}</Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center mt-1">
              <Col xs={12} md={6} className="d-flex justify-content-center">
                <Button className="edit-button" onClick={handleEdit}>Edit Profile</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

            {/* Modal Component */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserModal user={user} setUser={setUser} updateUser={updateUser} handleCloseEditModal={handleCloseEditModal} deleteUser={deleteUser} />
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default UserProfile
