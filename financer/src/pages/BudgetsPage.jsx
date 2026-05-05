import { useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'
import { useData } from '../hooks/useData'
import BudgetCard    from '../components/budgets/BudgetCard'
import BudgetForm    from '../components/budgets/BudgetForm'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { getBudgetSpent } from '../utils/calculations'
import { formatCurrency }  from '../utils/formatters'

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)

export default function BudgetsPage() {
  const { budgets, categories, transactions, deleteBudget } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [month,    setMonth]    = useState(getCurrentMonth())

  const handleEdit  = (b) => { setEditing(b); setShowForm(true) }
  const handleClose = ()  => { setEditing(null); setShowForm(false) }

  const monthBudgets   = budgets.filter(b => b.month === month)
  const totalBudgeted  = monthBudgets.reduce((s, b) => s + b.amount, 0)
  const totalSpent     = monthBudgets.reduce((s, b) => s + getBudgetSpent(transactions, b.categoryId, month), 0)
  const totalRemaining = totalBudgeted - totalSpent
  const overCount      = monthBudgets.filter(b => getBudgetSpent(transactions, b.categoryId, month) > b.amount).length

  return (
    <Container>
      <div className="page-header">
        <h4>Budgets</h4>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-lg me-1" />Set Budget
        </Button>
      </div>

      {/* Month picker */}
      <Row className="g-4 mb-4 align-items-stretch">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Form.Label className="small fw-semibold mb-2">Viewing month</Form.Label>
              <Form.Control type="month" value={month} onChange={e => setMonth(e.target.value)} />
            </Card.Body>
          </Card>
        </Col>

        {monthBudgets.length > 0 && (
          <>
            <Col xs={6} md={3}>
              <Card className="h-100"><Card.Body>
                <p className="small mb-1" style={{ color: 'var(--mz-muted)' }}>Total Budgeted</p>
                <h5 className="fw-bold mb-0">{formatCurrency(totalBudgeted)}</h5>
              </Card.Body></Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="h-100"><Card.Body>
                <p className="small mb-1" style={{ color: 'var(--mz-muted)' }}>Total Spent</p>
                <h5 className="fw-bold mb-0" style={{ color: 'var(--mz-danger)' }}>
                  {formatCurrency(totalSpent)}
                </h5>
              </Card.Body></Card>
            </Col>
            <Col xs={6} md={3}>
              <Card className="h-100"><Card.Body>
                <p className="small mb-1" style={{ color: 'var(--mz-muted)' }}>
                  {totalRemaining >= 0 ? 'Total Remaining' : 'Over Budget By'}
                </p>
                <h5 className="fw-bold mb-0" style={{ color: totalRemaining >= 0 ? 'var(--mz-success)' : 'var(--mz-danger)' }}>
                  {formatCurrency(Math.abs(totalRemaining))}
                </h5>
                {overCount > 0 && (
                  <small style={{ color: 'var(--mz-danger)' }}>
                    {overCount} categor{overCount > 1 ? 'ies' : 'y'} exceeded
                  </small>
                )}
              </Card.Body></Card>
            </Col>
          </>
        )}
      </Row>

      {/* Budget cards */}
      {monthBudgets.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-pie-chart" style={{ fontSize: '3.5rem', color: 'var(--mz-muted)' }} />
            <h5 className="mt-3 fw-bold">No budgets for this month</h5>
            <p style={{ color: 'var(--mz-muted)' }}>
              Allocate your income across categories to stay on top of your spending
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <i className="bi bi-plus-lg me-1" />Set First Budget
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {monthBudgets.map(b => (
            <Col key={b.id} md={6} lg={4}>
              <BudgetCard
                budget={b}
                category={categories.find(c => c.id === b.categoryId)}
                spent={getBudgetSpent(transactions, b.categoryId, month)}
                onEdit={handleEdit}
                onDelete={setDeleting} />
            </Col>
          ))}
        </Row>
      )}

      <BudgetForm show={showForm} onHide={handleClose} budget={editing} />
      <ConfirmDialog
        show={!!deleting} onHide={() => setDeleting(null)}
        onConfirm={() => { deleteBudget(deleting.id); setDeleting(null) }}
        title="Remove Budget"
        message="Remove this budget? Your transactions will not be affected." />
    </Container>
  )
}