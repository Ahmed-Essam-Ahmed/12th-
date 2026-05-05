import { Modal, Button } from 'react-bootstrap'

export default function ConfirmDialog({ show, onHide, onConfirm, title, message }) {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="fs-6">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onHide}>Cancel</Button>
        <Button variant="danger"    size="sm" onClick={onConfirm}>Delete</Button>
      </Modal.Footer>
    </Modal>
  )
}