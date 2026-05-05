import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault(); setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    try { register({ name: form.name, email: form.email, password: form.password }); navigate('/dashboard') }
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
            <p className="text-muted">Create your free account</p>
          </div>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              {error && <Alert variant="danger" className="py-2">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Ahmed Essam"
                    value={form.name} onChange={handle} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handle} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Min. 6 characters"
                    value={form.password} onChange={handle} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirm" placeholder="Repeat password"
                    value={form.confirm} onChange={handle} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
              </Form>
              <hr />
              <div className="text-center small">
                Already have an account? <Link to="/login">Sign in</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}