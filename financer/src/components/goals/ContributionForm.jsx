import { useState } from 'react'
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import { useData } from '../../hooks/useData'
import { formatCurrency } from '../../utils/formatters'
import { getGoalProgress } from '../../utils/calculations'

const today = new Date().toISOString().split('T')[0]

export default function ContributionForm({ show, onHide, goal }) {
  const { addContribution } = useData()
  const [form, setForm] = useState({ amount: '', date: today, note: '' })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    addContribution(goal.id, { ...form, amount: parseFloat(form.amount) })
    setForm({ amount: '', date: today, note: '' })
    onHide()
  }

  if (!goal) return null

  const remaining = goal.targetAmount - goal.savedAmount
  const progress  = getGoalProgress(goal)

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Contribution</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Goal summary */}
          <div className="rounded-3 p-3 mb-4 text-center" style={{ backgroundColor: 'var(--mz-bg)' }}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: goal.color }} />
              <span className="fw-bold">{goal.name}</span>
            </div>
            <small style={{ color: 'var(--mz-muted)' }}>
              {formatCurrency(goal.savedAmount)} saved · {formatCurrency(remaining)} remaining · {progress.toFixed(0)}%
            </small>
          </div>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Amount (EGP)</Form.Label>
                <Form.Control type="number" name="amount" min="1" step="0.01"
                  max={remaining} placeholder="0.00"
                  value={form.amount} onChange={handle} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date"
                  value={form.date} max={today} onChange={handle} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>
              Note <span className="small" style={{ color: 'var(--mz-muted)' }}>(optional)</span>
            </Form.Label>
            <Form.Control type="text" name="note"
              placeholder="e.g. Monthly savings deposit"
              value={form.note} onChange={handle} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">Add Contribution</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}