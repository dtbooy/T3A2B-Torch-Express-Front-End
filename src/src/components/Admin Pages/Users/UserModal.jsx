import React from 'react'
import { Form } from 'react-bootstrap'

const UserModal = ({ editedField, handleChange }) => {
    const handleRoleChange = (e) => {
        const isAdmin = e.target.value === 'Admin'

        handleChange(isAdmin, 'is_admin')
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={editedField.name} onChange={(e) => handleChange(e.target.value, 'name')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={editedField.email} onChange={(e) => handleChange(e.target.value, 'email')} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select value={editedField.is_admin ? 'Admin' : 'User'} onChange={handleRoleChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </Form.Select>
            </Form.Group>
        </Form>
    )
}

export default UserModal
