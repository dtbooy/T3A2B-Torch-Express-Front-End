import React from 'react'
import { Button } from 'react-bootstrap'

const UserRow = ({user, handleEdit, deleteUser }) => {
    const role = user.is_admin ? 'Admin' : 'User';
    const reservations = user.reservations.length
  return (
    <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{role}</td>
            <td>{reservations}</td>
            <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
            </td>
        </tr>
  )
}

export default UserRow