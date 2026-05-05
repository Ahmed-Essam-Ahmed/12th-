import { Card, ProgressBar, Badge, Button } from 'react-bootstrap'
import { formatCurrency, formatDate } from '../../utils/formatters'
import {
  getGoalProgress, getGoalMonthlyNeeded,
  getGoalMonthsRemaining, isGoalOnTrack,
} from '../../utils/calculations'

export default function GoalCard({ goal, onContribute, onEdit, onDelete }) {
  const progress    = getGoalProgress(goal)
  const monthsLeft  = getGoalMonthsRemaining(goal.deadline)
  const monthNeeded = getGoalMonthlyNeeded(goal)
  const onTrack     = isGoalOnTrack(goal)
  const isCompleted = goal.savedAmount >= goal.targetAmount
  const remaining   = goal.targetAmount - goal.savedAmount

  const barVariant = isCompleted ? 'success'
    : !onTrack     ? 'danger'
    : progress >= 80 ? 'warning'
    : 'primary'

  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column gap-3">

        {/* Header row */}
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: 14, height: 14, borderRadius: '50%',
              backgroundColor: goal.color, flexShrink: 0,
            }} />
            <h6 className="mb-0 fw-bold">{goal.name}</h6>
          </div>
          {isCompleted
            ? <Badge bg="success"><i className="bi bi-check-circle me-1" />Completed</Badge>
            : <Badge bg={onTrack ? 'success' : 'danger'} style={{ fontSize: '0.7rem' }}>
                {onTrack ? '✓ On Track' : '⚠ Behind'}
              </Badge>
          }
        </div>

        {/* Amount + progress */}
        <div>
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              {formatCurrency(goal.savedAmount)}
            </span>
            <span style={{ color: 'var(--mz-muted)', fontSize: '0.85rem' }}>
              of {formatCurrency(goal.targetAmount)}
            </span>
          </div>
          <ProgressBar now={progress} variant={barVariant} style={{ height: 10, borderRadius: 999 }} />
          <div className="d-flex justify-content-between mt-1">
            <small style={{ color: 'var(--mz-muted)' }}>{progress.toFixed(1)}% saved</small>
            <small style={{ color: 'var(--mz-muted)' }}>
              {formatCurrency(remaining)} left
            </small>
          </div>
        </div>

        {/* Info box */}
        {!isCompleted && (
          <div className="rounded-3 p-3" style={{ backgroundColor: 'var(--mz-bg)', fontSize: '0.82rem' }}>
            <div className="d-flex justify-content-between mb-1">
              <span style={{ color: 'var(--mz-muted)' }}>Deadline</span>
              <span className="fw-semibold">{formatDate(goal.deadline)}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span style={{ color: 'var(--mz-muted)' }}>Time remaining</span>
              <span className="fw-semibold">
                {monthsLeft === 0 ? 'This month' : `${monthsLeft} month${monthsLeft > 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ color: 'var(--mz-muted)' }}>Need per month</span>
              <span className="fw-bold" style={{ color: onTrack ? 'var(--mz-success)' : 'var(--mz-danger)' }}>
                {formatCurrency(monthNeeded)}
              </span>
            </div>
          </div>
        )}

        {/* Contribution history count */}
        {goal.contributions.length > 0 && (
          <small style={{ color: 'var(--mz-muted)' }}>
            <i className="bi bi-clock-history me-1" />
            {goal.contributions.length} contribution{goal.contributions.length > 1 ? 's' : ''}
          </small>
        )}

        {/* Actions */}
        <div className="d-flex gap-2 mt-auto">
          {!isCompleted && (
            <Button variant="primary" size="sm" className="flex-grow-1" onClick={() => onContribute(goal)}>
              <i className="bi bi-plus-lg me-1" />Add Contribution
            </Button>
          )}
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(goal)}>
            <i className="bi bi-pencil" />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(goal)}>
            <i className="bi bi-trash" />
          </Button>
        </div>

      </Card.Body>
    </Card>
  )
}