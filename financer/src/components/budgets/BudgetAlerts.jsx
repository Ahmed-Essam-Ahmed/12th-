import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useData } from '../../hooks/useData'
import { getBudgetSpent } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'

const getCurrentMonth = () => new Date().toISOString().slice(0, 7)

export default function BudgetAlerts() {
  const { budgets, categories, transactions } = useData()
  const month = getCurrentMonth()

  const alerts = budgets
    .filter(b => b.month === month)
    .map(b => {
      const spent    = getBudgetSpent(transactions, b.categoryId, month)
      const progress = b.amount > 0 ? (spent / b.amount) * 100 : 0
      const cat      = categories.find(c => c.id === b.categoryId)
      return { ...b, spent, progress, catName: cat?.name || 'Unknown' }
    })
    .filter(b => b.progress >= 80)
    .sort((a, b) => b.progress - a.progress)

  if (alerts.length === 0) return null

  return (
    <div className="mb-4">
      <h6 className="fw-semibold mb-3" style={{ color: 'var(--mz-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <i className="bi bi-exclamation-triangle-fill me-2" style={{ color: 'var(--mz-danger)' }} />
        Budget Alerts
      </h6>
      {alerts.map(a => (
        <Alert key={a.id}
          variant={a.progress >= 100 ? 'danger' : 'warning'}
          className="d-flex align-items-center justify-content-between py-2 px-3 mb-2"
        >
          <div className="d-flex align-items-center gap-2">
            <i className={`bi ${a.progress >= 100 ? 'bi-x-circle-fill' : 'bi-exclamation-circle-fill'}`} />
            <div>
              <strong>{a.catName}</strong>
              <span className="ms-2" style={{ fontSize: '0.85rem' }}>
                {a.progress >= 100
                  ? `Over budget by ${formatCurrency(a.spent - a.amount)}`
                  : `${a.progress.toFixed(0)}% of budget used — ${formatCurrency(a.amount - a.spent)} left`}
              </span>
            </div>
          </div>
          <Link to="/budgets"
            className={`btn btn-sm btn-${a.progress >= 100 ? 'danger' : 'warning'} ms-3`}
            style={{ whiteSpace: 'nowrap' }}>
            View Budget
          </Link>
        </Alert>
      ))}
    </div>
  )
}