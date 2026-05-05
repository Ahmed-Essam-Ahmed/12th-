import { useState, useEffect } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useData } from '../../hooks/useData'

const COLORS = ['#6366f1','#8b5cf6','#10b981','#f43f5e','#f59e0b','#3b82f6','#ec4899','#14b8a6']
const today  = new Date().toISOString().split('T')[0]
const empty  = { name: '', targetAmount: '', deadline: '', color: COLORS[0] }

export default function GoalForm({ show, onHide, goal = null }) {
  const { addGoal, updateGoal } = useData()
  const [form, setForm] = useState(empty)
  const isEditing = !!goal

  useEffect(() => {
    setForm(goal
      ? { name: goal.name, targetAmount: goal.targetAmount, deadline: goal.deadline, color: goal.color }
      : empty)
  }, [goal, show])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, targetAmount: parseFloat(form.targetAmount) }
    isEditing ? updateGoal(goal.id, data) : addGoal(data)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Goal' : 'New Savings Goal'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Goal Name</Form.Label>
            <Form.Control type="text" name="name"
              placeholder="e.g. Emergency Fund, New Car, Vacation..."
              value={form.name} onChange={handle} required />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Target Amount (EGP)</Form.Label>
                <Form.Control type="number" name="targetAmount" min="1" step="0.01"
                  placeholder="50,000" value={form.targetAmount} onChange={handle} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Target Date</Form.Label>
                <Form.Control type="date" name="deadline"
                  min={today} value={form.deadline} onChange={handle} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Color</Form.Label>
            <div className="d-flex gap-2 flex-wrap mt-2">
              {COLORS.map(c => (
                <div key={c} onClick={() => setForm({ ...form, color: c })}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    backgroundColor: c, cursor: 'pointer',
                    border: form.color === c ? '3px solid var(--mz-text)' : '3px solid transparent',
                    transition: 'border 0.15s',
                  }} />
              ))}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Create Goal'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}