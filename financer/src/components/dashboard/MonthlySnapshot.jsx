import { Card, Row, Col } from 'react-bootstrap'
import { useData } from '../../hooks/useData'
import { getCurrentMonthData } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'

export default function MonthlySnapshot() {
  const { transactions } = useData()
  const { income, expenses, net, count, month } = getCurrentMonthData(transactions)

  const monthLabel = new Date(month + '-01').toLocaleDateString('en-EG', {
    month: 'long', year: 'numeric'
  })

  const today = new Date().getDate()
  const totalDays = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1, 0
  ).getDate()

  return (
    <Card className="mb-4" style={{ borderLeft: '4px solid var(--mz-primary)' }}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="fw-bold mb-0">{monthLabel} — So Far</h6>
            <small style={{ color: 'var(--mz-muted)' }}>
              Day {today} of {totalDays} · {count} transaction{count !== 1 ? 's' : ''}
            </small>
          </div>
          <div
            className="rounded-3 px-3 py-1 small fw-bold"
            style={{
              backgroundColor: net >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)',
              color: net >= 0 ? 'var(--mz-success)' : 'var(--mz-danger)',
            }}
          >
            {net >= 0 ? '+' : ''}{formatCurrency(net)}
          </div>
        </div>

        <Row className="g-3">
          <Col xs={6}>
            <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(16,185,129,0.08)' }}>
              <small style={{ color: 'var(--mz-muted)' }} className="d-block mb-1">
                Income this month
              </small>
              <span className="fw-bold" style={{ color: 'var(--mz-success)' }}>
                +{formatCurrency(income)}
              </span>
            </div>
          </Col>
          <Col xs={6}>
            <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(244,63,94,0.08)' }}>
              <small style={{ color: 'var(--mz-muted)' }} className="d-block mb-1">
                Expenses this month
              </small>
              <span className="fw-bold" style={{ color: 'var(--mz-danger)' }}>
                -{formatCurrency(expenses)}
              </span>
            </div>
          </Col>
        </Row>

        {count === 0 && (
          <p className="text-center mb-0 mt-3 small" style={{ color: 'var(--mz-muted)' }}>
            No transactions yet this month — add one to start tracking.
          </p>
        )}
      </Card.Body>
    </Card>
  )
}