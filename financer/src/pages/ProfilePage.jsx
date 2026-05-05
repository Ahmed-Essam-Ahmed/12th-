import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { formatCurrency } from '../utils/formatters'
import { getTotalIncome, getTotalExpenses, getBalance } from '../utils/calculations'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { transactions }  = useData()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <Container>
      <h4 className="mb-4">Profile</h4>
      <Row>
        <Col md={4}>
          <Card className="text-center mb-4">
            <Card.Body className="py-5">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center
                justify-content-center mb-3" style={{ width: 80, height: 80, fontSize: 32 }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h5 className="fw-bold">{user.name}</h5>
              <p className="text-muted">{user.email}</p>
              <Button variant="outline-danger" className="w-100" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1" />Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header><strong>Account Summary</strong></Card.Header>
            <Card.Body>
              <Row className="text-center g-3">
                <Col>
                  <div className="text-success fw-bold fs-5">{formatCurrency(getTotalIncome(transactions))}</div>
                  <small className="text-muted">Total Income</small>
                </Col>
                <Col>
                  <div className="text-danger fw-bold fs-5">{formatCurrency(getTotalExpenses(transactions))}</div>
                  <small className="text-muted">Total Expenses</small>
                </Col>
                <Col>
                  <div className={`fw-bold fs-5 ${getBalance(transactions) >= 0 ? 'text-primary' : 'text-danger'}`}>
                    {formatCurrency(getBalance(transactions))}
                  </div>
                  <small className="text-muted">Balance</small>
                </Col>
                <Col>
                  <div className="fw-bold fs-5">{transactions.length}</div>
                  <small className="text-muted">Transactions</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header><strong>Account Info</strong></Card.Header>
            <Card.Body>
              <dl className="row mb-0">
                <dt className="col-sm-3 text-muted">Name</dt>
                <dd className="col-sm-9">{user.name}</dd>
                <dt className="col-sm-3 text-muted">Email</dt>
                <dd className="col-sm-9">{user.email}</dd>
                <dt className="col-sm-3 text-muted">Member since</dt>
                <dd className="col-sm-9">{new Date(user.createdAt).toLocaleDateString()}</dd>
              </dl>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}