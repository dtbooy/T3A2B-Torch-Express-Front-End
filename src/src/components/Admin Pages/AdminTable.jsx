import React, { useState } from 'react'
import { Table, Container, Pagination } from 'react-bootstrap'
import { TiDelete } from "react-icons/ti"
import { FiEdit } from "react-icons/fi"
import AdminFilter from './AdminFilter'
import DeleteModal from './DeleteModal'


// Renders a table on the admin pages 
const AdminTable = ({ tableHeaders, data, renderRow, deleteField, handleEdit, hideEditButton, filter, setFilter, filterProps }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const maxResults = 10
    const totalPages = Math.ceil(data.length / maxResults)
    const startIndex = (currentPage - 1) * maxResults
    const endIndex = startIndex + maxResults
    const paginatedData = data.slice(startIndex, endIndex)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)

    const handleDeleteConfirmation = (id) => {
        setSelectedItemId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = () => {
        deleteField(selectedItemId)
        setShowDeleteModal(false)
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    // Check if there are no results after applying the filter
    const noResults = paginatedData.length === 0

    return (
        <Container fluid>
            <Table responsive="sm" className="admin-table ">
                <thead>
                    {/* Header for each column */}
                    <tr >
                        {tableHeaders.map((header, index) => (
                            <th key={index} className="table-headers">{header}</th>
                        ))}
                        <th></th>
                    </tr>
                    {/* Search bars for each column */}
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <td key={index}>
                                <AdminFilter
                                    tableHeaders={[header]}
                                    filter={filter}
                                    setFilter={setFilter}
                                    filterProps={[filterProps[index]]}
                                />
                            </td>
                        ))}
                        {/* Empty cell for the action buttons */}
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {/* Check for no results */}
                    {noResults && (
                        <tr>
                            <td colSpan={tableHeaders.length + 1} className="text-center">No results</td>
                        </tr>
                    )}
                    {/* Render filtered rows if results are found */}
                    {!noResults && paginatedData.map((item, index) => (
                        <tr key={index}>
                            {renderRow(item)}
                            <td className="action-icons align-content-center">
                                <div className="d-flex justify-content-center space-evenly m-4">
                                    {!hideEditButton && (
                                        <>
                                        <FiEdit className="edit-icon" onClick={() => handleEdit(item)}/>
                                        </>
                                    )}
                                    <TiDelete className="delete-icon" onClick={() => handleDeleteConfirmation(item._id)}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {totalPages > 1 && (
                <Pagination className="pagination justify-content-end">
                    {[...Array(totalPages)].map((_, page) => (
                        <Pagination.Item key={page} active={currentPage === page + 1} onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
             <DeleteModal message="Delete?" show={showDeleteModal} onHide={handleDeleteCancel} onDeleteConfirm={handleDeleteConfirm} />
        </Container>
    )
}

export default AdminTable

