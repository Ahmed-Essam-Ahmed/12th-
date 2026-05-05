import { useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useData } from '../hooks/useData'
import GoalCard          from '../components/goals/GoalCard'
import GoalForm          from '../components/goals/GoalForm'
import ContributionForm  from '../components/goals/ContributionForm'
import ConfirmDialog     from '../components/common/ConfirmDialog'
import { formatCurrency } from '../utils/formatters'

export default function GoalsPage() {
  const { goals, deleteGoal } = useData()
  const [showForm,     setShowForm]     = useState(false)
  const [editing,      setEditing]      = useState(null)
  const [contributing, setContributing] = useState(null)
  const [deleting,     setDeleting]     = useState(null)

  const handleEdit  = (g) => { setEditing(g); setShowForm(true) }
  const handleClose = ()  => { setEditing(null); setShowForm(false) }

  const active    = goals.filter(g => g.savedAmount <  g.targetAmount)
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount)
  const totalSaved = goals.reduce((s, g) => s + g.savedAmount, 0)

  return (
    <Container>
      <div className="page-header">
        <h4>Goals</h4>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-lg me-1" />New Goal
        </Button>
      </div>

      {/* Summary row */}
      {goals.length > 0 && (
        <Row className="g-4 mb-4">
          {[
            { label: 'Total Goals',   value: goals.length,     color: 'var(--mz-text)'    },
            { label: 'Active',        value: active.length,    color: 'var(--mz-primary)' },
            { label: 'Completed',     value: completed.length, color: 'var(--mz-success)' },
            { label: 'Total Saved',   value: formatCurrency(totalSaved), color: 'var(--mz-text)' },
          ].map(({ label, value, color }) => (
            <Col xs={6} md={3} key={label}>
              <Card><Card.Body>
                <p className="small mb-1" style={{ color: 'var(--mz-muted)' }}>{label}</p>
                <h5 className="fw-bold mb-0" style={{ color }}>{value}</h5>
              </Card.Body></Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Active goals */}
      {active.length > 0 && (
        <>
          <p className="small fw-semibold mb-3" style={{ color: 'var(--mz-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Active Goals
          </p>
          <Row className="g-4 mb-4">
            {active.map(g => (
              <Col key={g.id} md={6} lg={4}>
                <GoalCard goal={g}
                  onContribute={setContributing}
                  onEdit={handleEdit}
                  onDelete={setDeleting} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Completed goals */}
      {completed.length > 0 && (
        <>
          <p className="small fw-semibold mb-3" style={{ color: 'var(--mz-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Completed Goals
          </p>
          <Row className="g-4">
            {completed.map(g => (
              <Col key={g.id} md={6} lg={4}>
                <GoalCard goal={g}
                  onContribute={setContributing}
                  onEdit={handleEdit}
                  onDelete={setDeleting} />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Empty state */}
      {goals.length === 0 && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-trophy" style={{ fontSize: '3.5rem', color: 'var(--mz-muted)' }} />
            <h5 className="mt-3 fw-bold">No goals yet</h5>
            <p style={{ color: 'var(--mz-muted)' }}>
              Set a savings goal and track your progress month by month
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <i className="bi bi-plus-lg me-1" />Create First Goal
            </Button>
          </Card.Body>
        </Card>
      )}

      <GoalForm show={showForm} onHide={handleClose} goal={editing} />
      <ContributionForm
        show={!!contributing}
        onHide={() => setContributing(null)}
        goal={contributing} />
      <ConfirmDialog
        show={!!deleting} onHide={() => setDeleting(null)}
        onConfirm={() => { deleteGoal(deleting.id); setDeleting(null) }}
        title="Delete Goal"
        message="Delete this goal? All contribution history will be lost." />
    </Container>
  )
}