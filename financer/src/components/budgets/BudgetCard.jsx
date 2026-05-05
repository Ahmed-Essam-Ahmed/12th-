import { Card, ProgressBar, Badge, Button } from 'react-bootstrap'
import { formatCurrency } from '../../utils/formatters'

export default function BudgetCard({ budget, category, spent, onEdit, onDelete }) {
  const progress  = budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 100) : 0
  const remaining = budget.amount - spent
  const isOver    = spent > budget.amount
  const isWarning = progress >= 80 && !isOver

  const barVariant = isOver ? 'danger' : isWarning ? 'warning' : progress >= 60 ? 'info' : 'success'

  return (
    <Card className="h-100" style={{
      borderColor: isOver ? 'var(--mz-danger)' : isWarning ? '#f59e0b' : undefined,
      borderWidth: (isOver || isWarning) ? 2 : 1,
    }}>
      <Card.Body className="d-flex flex-column gap-3">

        {/* Header */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: 13, height: 13, borderRadius: '50%',
              backgroundColor: category?.color || '#94a3b8', flexShrink: 0,
            }} />
            <span className="fw-semibold">{category?.name || 'Unknown'}</span>
          </div>
          {isOver    && <Badge bg="danger"><i className="bi bi-exclamation-triangle me-1" />Over budget</Badge>}
          {isWarning && <Badge bg="warning" text="dark"><i className="bi bi-exclamation me-1" />80%+ used</Badge>}
        </div>

        {/* Amounts */}
        <div>
          <div className="d-flex justify-content-between align-items-baseline mb-2">
            <span style={{
              fontSize: '1.3rem', fontWeight: 700,
              color: isOver ? 'var(--mz-danger)' : 'var(--mz-text)',
            }}>
              {formatCurrency(spent)}
            </span>
            <span style={{ color: 'var(--mz-muted)', fontSize: '0.85rem' }}>
              of {formatCurrency(budget.amount)}
            </span>
          </div>

          <ProgressBar now={progress} variant={barVariant}
            style={{ height: 10, borderRadius: 999 }} />

          <div className="d-flex justify-content-between mt-2">
            <small style={{ fontWeight: 600, fontSize: '0.8rem' }}>
              {progress.toFixed(0)}% used
            </small>
            <small style={{
              fontWeight: 600, fontSize: '0.8rem',
              color: isOver ? 'var(--mz-danger)' : remaining < budget.amount * 0.2 ? '#f59e0b' : 'var(--mz-success)',
            }}>
              {isOver
                ? `${formatCurrency(Math.abs(remaining))} over`
                : `${formatCurrency(remaining)} remaining`}
            </small>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex gap-2 mt-auto">
          <Button variant="outline-primary" size="sm" onClick={() => onEdit(budget)}>
            <i className="bi bi-pencil me-1" />Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => onDelete(budget)}>
            <i className="bi bi-trash" />
          </Button>
        </div>

      </Card.Body>
    </Card>
  )
}