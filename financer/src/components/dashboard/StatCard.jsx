import { Card } from 'react-bootstrap'

export default function StatCard({ title, value, icon, variant = 'primary' }) {
  return (
    <Card className="mb-4 h-100">
      <Card.Body className="d-flex align-items-center gap-3">
        <div className={`rounded-circle p-3 bg-${variant} bg-opacity-10`}>
          <i className={`bi ${icon} fs-4 text-${variant}`} />
        </div>
        <div>
          <small className="text-muted d-block">{title}</small>
          <h5 className="fw-bold mb-0">{value}</h5>
        </div>
      </Card.Body>
    </Card>
  )
}