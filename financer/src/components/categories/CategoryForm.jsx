import { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useData } from '../../hooks/useData'

const COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#F0A500','#2ECC71','#3498DB','#95A5A6']
const empty = { name: '', type: 'expense', color: COLORS[0] }

export default function CategoryForm({ show, onHide, category = null }) {
  const { addCategory, updateCategory } = useData()
  const [form, setForm] = useState(empty)
  const isEditing = !!category

  useEffect(() => {
    setForm(category ? { name: category.name, type: category.type, color: category.color } : empty)
  }, [category, show])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    isEditing ? updateCategory(category.id, form) : addCategory(form)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="e.g. Groceries"
              value={form.name} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handle}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Row xs={5} className="g-2 mt-1">
              {COLORS.map((color) => (
                <Col key={color}>
                  <div onClick={() => setForm({ ...form, color })} style={{
                    width: 36, height: 36, borderRadius: '50%', backgroundColor: color,
                    cursor: 'pointer',
                    border: form.color === color ? '3px solid #333' : '3px solid transparent',
                  }} />
                </Col>
              ))}
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">{isEditing ? 'Save Changes' : 'Add'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}