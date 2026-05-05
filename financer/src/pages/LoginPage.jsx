import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try { login(form.email, form.password); navigate('/dashboard') }
    catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={5} lg={4}>
          <div className="text-center mb-4">
            <i className="bi bi-wallet2 text-primary" style={{ fontSize: 48 }} />
            <h2 className="fw-bold mt-2">Mizanyti</h2>
            <p className="text-muted">Sign in to your account</p>
          </div>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="py-2">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handle} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter password"
                    value={form.password} onChange={handle} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form>
              <hr />
              <div className="text-center small">
                Don't have an account? <Link to="/register">Register</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}