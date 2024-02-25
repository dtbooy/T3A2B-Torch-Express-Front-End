import { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import UserModal from './UserModal'
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"

const UserProfile = () => {
    // Hard Coded User - needs to be changed 

    const params = useParams()
    // Get User
    const [user, setUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:4001/users/${params.userId}/`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching User:', error))
    }, [])

    // Privacy for Password
    const hidePassword = () => '*'.repeat(10)

    // Delete User Functionality 
    const nav = useNavigate()

    async function deleteUser(id) {
        // Prompt for confirmation of deletion
        const confirmDelete = window.confirm('Are you sure you want to delete this account?')
        if (confirmDelete) {
            try {
                await fetch(`http://localhost:4001/users/${id}`, { method: 'DELETE' })
                // Navigate to home page on deletion
                nav('/')
                
            } catch (error) {
                console.error('Error Deleting:', error)
            }
        }

    }

    // Update User Functionality
    async function updateUser(updatedUser) {
        try {
            const response = await fetch(`http://localhost:4001/users/${params.userId}`, {
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
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>User Profile</Card.Title>
                    <Card.Text>
                        Name: {user.name}
                    </Card.Text>
                    <Card.Text>
                        Email: {user.email}
                    </Card.Text>
                    <Card.Text>
                        Password: {hidePassword(user.password)}
                    </Card.Text>
                    <Card.Text>
                        D.O.B: {new Date(user.DOB).toLocaleDateString()}
                    </Card.Text>
                    <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
                    <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete Account</Button>
                </Card.Body>
            </Card>

            {/* Modal Component */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserModal user={user} updateUser={updateUser} handleCloseEditModal={handleCloseEditModal} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserProfile
