import React from 'react'
import { Table, Button } from 'react-bootstrap'


const AdminTable = ({ tableHeaders, data, renderRow, deleteField, handleEdit }) => {
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
                            <Button variant="warning" onClick={() => handleEdit(item)}>Edit</Button>
                            <Button variant="danger" onClick={() => deleteField(item._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AdminTable
