import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteModal = ({ show, onHide, onDeleteConfirm }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete? This cannot be undone.</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="outline-danger" onClick={onDeleteConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
