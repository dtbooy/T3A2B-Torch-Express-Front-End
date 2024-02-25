import React, { useState } from 'react'
import { Table, Button, Container, Pagination } from 'react-bootstrap'
import AdminFilter from './AdminFilter'

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

    // Check if there are no results after applying the filter
    const noResults = paginatedData.length === 0

    return (
        <Container fluid>
            <Table striped bordered>
                <thead>
                    {/* Header for each column */}
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Action</th>
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
            {totalPages > 1 && (
                <Pagination className="justify-content-center">
                    {[...Array(totalPages)].map((_, page) => (
                        <Pagination.Item key={page} active={currentPage === page + 1} onClick={() => handlePageChange(page + 1)}>
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
        </Container>
    )
}

export default AdminTable

