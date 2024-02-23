import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import UserModal from './UserModal';

const UserProfile = () => {
    const userId = "65d7e54a0fe29ba79e27e5be"
    const [user, setUser] = useState({})
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:4001/users/${userId}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching User:', error))
    }, [])

    const hidePassword = () => {
        return '*'.repeat(10)
    }

    async function deleteUser(id) {
        try {
            await fetch(`http://localhost:4001/users/${id}`,
                { method: 'DELETE' })
                console.log('User deleted successfully.')
        } catch (error) {
            console.error('Error Deleting:', error)
        }
    }

    async function updateUser(updatedUser) {
        try {
            await fetch(`http://localhost:4001/users/${userId}`,
                { method: 'PUT',
            headers : {
                'Content-Type': 'application/json'},
                body: JSON.stringify({updatedUser})
            })
            setUser(updatedUser)
        } catch (error) {
            console.error('Error Updating:', error)
        }
    }

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
                        D.O.B: {user.DOB}
                    </Card.Text>
                    <Button variant="primary" onClick={handleEdit}>Edit Profile</Button>
                    <Button variant="danger" onClick={()=>deleteUser(user._id)}>Delete Account</Button>
                </Card.Body>
            </Card>

            <Modal show={showEditModal}  onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserModal user={user} updateUser={updateUser} handleCloseEditModal={handleCloseEditModal} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserProfile