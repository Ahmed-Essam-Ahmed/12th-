import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import AppLogo from '../components/common/AppLogo'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()
  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (form.password.length < 6)       return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      await register({ name: form.name, email: form.email, password: form.password })
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
          <h3 className="mt-3 mb-1" style={{ fontWeight: 800 }}>Create account</h3>
          <p style={{ color: 'var(--mz-muted)', fontSize: '0.9rem' }}>
            Start tracking your finances today
          </p>
        </div>
        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Ahmed Essam"
              value={form.name} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Minimum 6 characters"
              value={form.password} onChange={handle} required />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="confirm" placeholder="Repeat your password"
              value={form.confirm} onChange={handle} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </Form>
        <p className="text-center mt-4 mb-0 small" style={{ color: 'var(--mz-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--mz-primary)', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}