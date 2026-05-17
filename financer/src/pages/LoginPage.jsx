import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import AppLogo from '../components/common/AppLogo'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form,    setForm]    = useState({ email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="text-center mb-4">
          <AppLogo size={56} />
          <h3 className="mt-3 mb-1" style={{ fontWeight: 800 }}>Mizanyti</h3>
          <p style={{ color: 'var(--mz-muted)', fontSize: '0.9rem' }}>
            Welcome back — sign in to continue
          </p>
        </div>
        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter your password"
              value={form.password} onChange={handle} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>
        <p className="text-center mt-4 mb-0 small" style={{ color: 'var(--mz-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--mz-primary)', fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}