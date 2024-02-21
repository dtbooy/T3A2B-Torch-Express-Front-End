import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import AdminTable from './AdminTable' // Assuming you have a reusable AdminTable component

const AdminPage = ({ endpoint, heading, newForm, tableHeaders, modalComponent, renderRow, prepareData }) => {
    const [field, setField] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [editedField, setEditedField] = useState({})

    useEffect(() => {
        fetch(`http://localhost:4001/${endpoint}`)
            .then(res => res.json())
            .then(data => setField(data))
            .catch(error => console.error(`Error fetching ${endpoint}:`, error))
    }, [])

    async function deleteField(id) {
        try {
            await fetch(`http://localhost:4001/${endpoint}/${id}`, 
            { method: 'Delete' })
            setField(prevField => prevField.filter(item => item._id !== id))
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    const handleEdit = (field) => {
        setEditedField(field)
        setShowEditModal(true)
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setEditedField({})
    }

    const updateField = async () => {
        try {
            const updatedFieldData = prepareData(editedField)

            const response = await fetch(`http://localhost:4001/${endpoint}/${editedField._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFieldData)
            })

            if (!response.ok) {
                throw new Error('Failed to update')
            }

            const updatedField = await response.json()

            setField(prevField => prevField.map(item => (item._id === updatedField._id ? updatedField : item)))
            handleCloseEditModal()
        } catch (error) {
            console.error('Error updating:', error)
        }
    }

    const handleChange = (value, field) => {
        setEditedField(prevState => ({ ...prevState, [field]: value }))
        console.log('Edited Field:', editedField)
    }

    return (
        <div>
            <h1>{heading}</h1>
            <Link to={newForm}>
                <Button variant="success">New</Button>
            </Link>
                        <AdminTable
                tableHeaders={tableHeaders}
                data={field}
                renderRow={renderRow}
                deleteField={deleteField} 
                handleEdit={handleEdit}   
            />
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {modalComponent && React.createElement(modalComponent, { editedField, handleChange })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateField}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AdminPage