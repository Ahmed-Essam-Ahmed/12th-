import { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useData } from '../../hooks/useData'

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)
const empty = { categoryId: '', amount: '', month: getCurrentMonth() }

export default function BudgetForm({ show, onHide, budget = null }) {
  const { categories, addBudget, updateBudget } = useData()
  const [form, setForm] = useState(empty)
  const isEditing = !!budget

  useEffect(() => {
    setForm(budget
      ? { categoryId: budget.categoryId, amount: budget.amount, month: budget.month }
      : { ...empty, month: getCurrentMonth() })
  }, [budget, show])

  const expenseCategories = categories.filter(c => c.type === 'expense')
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, amount: parseFloat(form.amount) }
    isEditing ? updateBudget(budget.id, data) : addBudget(data)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Budget' : 'Set Budget'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="categoryId" value={form.categoryId}
              onChange={handle} required disabled={isEditing}>
              <option value="">Choose an expense category</option>
              {expenseCategories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Budget Amount (EGP)</Form.Label>
                <Form.Control type="number" name="amount" min="1" step="0.01"
                  placeholder="e.g. 5,000" value={form.amount} onChange={handle} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Month</Form.Label>
                <Form.Control type="month" name="month"
                  value={form.month} onChange={handle} required />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Set Budget'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}