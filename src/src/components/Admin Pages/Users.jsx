import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'
import UserRow from './UserRow'
import UserModal from './UserModal'



const Users = () => {
    const [users, setUsers] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [editedUser, setEditedUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:4001/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching Users:', error))
    }, [])

    // Delete functionality 
    async function deleteUser(id) {
        const reponse = await fetch(`http://localhost:4001/users/${id}`,
            { method: 'Delete' })
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
    }

    // Edit functionality
    const handleEdit = (user) => {
        setEditedUser(user)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setEditedUser({})
    }


    const updateUser = async () => {
        try {
            const response = await fetch(`http://localhost:4001/Users/${editedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedUser)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const updatedUser = await response.json();

            setUsers(prevUsers => prevUsers.map(user => {
                if (user._id === updatedUser._id) {
                    return updatedUser;
                }
                return user;
            }));

            handleCloseEditModal();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    const handleChange = (value, field) => {
        setEditedUser(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    

    return (
        <div>
            <h1>All Users</h1>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Reservations</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserRow key={user._id} user={user} handleEdit={handleEdit} deleteUser={deleteUser} />
                    ))}
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserModal editedUser={editedUser} handleChange={handleChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Users