import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

export default function NotFoundPage() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold text-muted">404</h1>
      <h4>Page Not Found</h4>
      <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
      <Button as={Link} to="/dashboard" variant="primary">
        <i className="bi bi-house me-1" />Go Home
      </Button>
    </Container>
  )
}