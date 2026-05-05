import { Card } from 'react-bootstrap'

const config = {
  success: { bg: 'rgba(16,185,129,0.12)', color: '#10b981' },
  danger:  { bg: 'rgba(244,63,94,0.12)',  color: '#f43f5e' },
  primary: { bg: 'rgba(99,102,241,0.12)', color: '#6366f1' },
  warning: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b' },
}

export default function StatCard({ title, value, icon, variant = 'primary' }) {
  const { bg, color } = config[variant] || config.primary
  return (
    <Card className="mb-4 h-100">
      <Card.Body className="d-flex align-items-center gap-3">
        <div className="stat-icon" style={{ backgroundColor: bg, color }}>
          <i className={`bi ${icon}`} />
        </div>
        <div>
          <p className="mb-1 small" style={{ color: 'var(--mz-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
            {title}
          </p>
          <h5 className="mb-0 fw-bold">{value}</h5>
        </div>
      </Card.Body>
    </Card>
  )
}