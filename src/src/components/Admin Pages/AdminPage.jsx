import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import AdminTable from './AdminTable'
import '../../styling/adminpages.scss'
import Cookies from 'js-cookie'

// Admin Page is a reusable component for all the different admin pages 
const AdminPage = ({ endpoint, heading, newForm, tableHeaders, modalComponent, renderRow, prepareData, hideEditButton, propertyPaths }) => {
    const [field, setField] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [editedField, setEditedField] = useState({})
    // generic filter 
    const [filter, setFilter] = useState({})
    // filtered data
    const [filterdField, setFilterdField] = useState([])

    // Fetch Data from API
    useEffect(() => {
        fetch(`http://localhost:4001/${endpoint}`,
            {headers : {'Authorization': Cookies.get("accessToken")}}
        )
            .then(res => res.json())
            .then(data => setField(data))
            .catch(error => console.error(`Error fetching ${endpoint}:`, error))
    }, [])

    // Delete
    async function deleteField(id) {
        try {
            await fetch(`http://localhost:4001/${endpoint}/${id}`, { 
                method: 'Delete',
                headers : {'Authorization': Cookies.get("accessToken")}
            })
            setField(prevField => prevField.filter(item => item._id !== id))
        } catch (error) {
            console.error('Error deleting:', error)
        }
    }

    // Filter fields on change of filter State
    useEffect(() => {
        setFilterdField(field.filter((row) => Object.entries(filter).every(([key, value]) => value === undefined || JSON.stringify(row[key]).toLowerCase().includes(value.toString().toLowerCase()))
        ))
        // console.log(field)
    }, [field, filter])

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
                headers: { 'Content-Type': 'application/json', 'Authorization': Cookies.get("accessToken")},
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

    const handleChange = (value, fieldName) => {
        setEditedField(prevState => ({
            ...prevState,
            [fieldName]: value
        }))
    }


    return (
        <div>
            <h1 className="admin-heading">{heading}</h1>
            {newForm && (
                <div className="new-button-container">
                    <Link to={newForm}>
                        <Button variant="outline-success">New</Button>
                    </Link>
                </div>
            )}

            <AdminTable
                tableHeaders={tableHeaders}
                data={filterdField}
                renderRow={renderRow}
                deleteField={deleteField}
                handleEdit={handleEdit}
                hideEditButton={hideEditButton}
                filter={filter} // do I need this?
                setFilter={setFilter}
                filterProps={propertyPaths}
            />
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>Edit {heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalComponent && React.createElement(modalComponent, { editedField, handleChange, updateField, handleCloseEditModal })}
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default AdminPage