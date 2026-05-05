import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { formatCurrency } from '../utils/formatters'
import { getTotalIncome, getTotalExpenses, getBalance } from '../utils/calculations'

export default function ProfilePage() {
  const { user, logout }  = useAuth()
  const { transactions }   = useData()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const stats = [
    { label: 'Total Income',   value: formatCurrency(getTotalIncome(transactions)),  color: 'var(--mz-success)' },
    { label: 'Total Expenses', value: formatCurrency(getTotalExpenses(transactions)), color: 'var(--mz-danger)'  },
    { label: 'Balance',        value: formatCurrency(getBalance(transactions)),       color: 'var(--mz-primary)' },
    { label: 'Transactions',   value: transactions.length,                            color: 'var(--mz-muted)'   },
  ]

  return (
    <Container>
      <div className="page-header">
        <h4>Profile</h4>
      </div>

      <Row className="g-4">
        {/* Avatar card */}
        <Col md={4}>
          <Card className="text-center h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center gap-3">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                style={{ width: 80, height: 80, fontSize: 32, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-0 small" style={{ color: 'var(--mz-muted)' }}>{user.email}</p>
              </div>
              <Button variant="outline-danger" className="w-100 mt-2" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1" /> Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Stats + info */}
        <Col md={8}>
          {/* Summary stats */}
          <Row className="g-3 mb-4">
            {stats.map(({ label, value, color }) => (
              <Col xs={6} key={label}>
                <Card>
                  <Card.Body>
                    <p className="mb-1 small" style={{ color: 'var(--mz-muted)', fontWeight: 500 }}>{label}</p>
                    <h5 className="mb-0 fw-bold" style={{ color }}>{value}</h5>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Account info */}
          <Card>
            <Card.Header>Account Info</Card.Header>
            <Card.Body>
              <dl className="row mb-0" style={{ rowGap: '0.75rem' }}>
                <dt className="col-sm-4" style={{ color: 'var(--mz-muted)', fontWeight: 500 }}>Full Name</dt>
                <dd className="col-sm-8 mb-0">{user.name}</dd>

                <dt className="col-sm-4" style={{ color: 'var(--mz-muted)', fontWeight: 500 }}>Email</dt>
                <dd className="col-sm-8 mb-0">{user.email}</dd>

                <dt className="col-sm-4" style={{ color: 'var(--mz-muted)', fontWeight: 500 }}>Member since</dt>
                <dd className="col-sm-8 mb-0">{new Date(user.createdAt).toLocaleDateString()}</dd>
              </dl>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}