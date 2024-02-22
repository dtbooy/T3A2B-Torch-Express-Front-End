import React from 'react'
import { Table, Button } from 'react-bootstrap'

// Renders a table on the admin pages 
const AdminTable = ({ tableHeaders, data, renderRow, deleteField, handleEdit, hideEditButton }) => {
    return (
        <Table striped bordered>
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {renderRow(item)}
                        <td>
                            {!hideEditButton && (
                                <>
                                    <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
                                    {' '}
                                </>
                            )}
                            <Button variant="danger" onClick={() => deleteField(item._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AdminTable

