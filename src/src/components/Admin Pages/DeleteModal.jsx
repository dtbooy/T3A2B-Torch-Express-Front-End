import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const DeleteModal = ({ show, onHide, onDeleteConfirm, message }) => {
    return (
        <Modal className="delete-modal" show={show} onHide={onHide}>
            <Modal.Header  className="delete-modal-header" closeButton>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button className="delete-button" onClick={onDeleteConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
