import { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useData } from '../../hooks/useData'

const today = new Date().toISOString().split('T')[0]

const empty = {
  type: 'expense', amount: '', categoryId: '',
  description: '', date: today,
}

export default function TransactionForm({ show, onHide, transaction = null }) {
  const { categories, addTransaction, updateTransaction } = useData()
  const [form, setForm] = useState(empty)
  const isEditing = !!transaction

  useEffect(() => {
    setForm(transaction
      ? { type: transaction.type, amount: transaction.amount, categoryId: transaction.categoryId,
          description: transaction.description || '', date: transaction.date }
      : empty)
  }, [transaction, show])

  const handle = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value, ...(name === 'type' ? { categoryId: '' } : {}) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, amount: parseFloat(form.amount) }
    isEditing ? updateTransaction(transaction.id, data) : addTransaction(data)
    onHide()
  }

  const filtered = categories.filter((c) => c.type === form.type)

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handle}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Amount (EGP)</Form.Label>
                <Form.Control type="number" name="amount" min="0" step="0.01"
                  placeholder="0.00" value={form.amount} onChange={handle} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handle}
                  max={today}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="categoryId" value={form.categoryId} onChange={handle} required>
              <option value="">Select a category</option>
              {filtered.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Description <span className="small" style={{ color: 'var(--mz-muted)' }}>(optional)</span>
            </Form.Label>
            <Form.Control type="text" name="description" placeholder="e.g. Monthly groceries"
              value={form.description} onChange={handle} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}