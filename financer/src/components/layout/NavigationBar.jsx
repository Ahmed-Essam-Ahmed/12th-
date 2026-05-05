import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth'

export default function NavigationBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (!user) return null

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <i className="bi bi-wallet2 me-2" />Mizanyti
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard"    active={pathname === '/dashboard'}>
              <i className="bi bi-speedometer2 me-1" />Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/transactions" active={pathname === '/transactions'}>
              <i className="bi bi-arrow-left-right me-1" />Transactions
            </Nav.Link>
            <Nav.Link as={Link} to="/categories"   active={pathname === '/categories'}>
              <i className="bi bi-tags me-1" />Categories
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center gap-2">
            <Nav.Link as={Link} to="/profile" className="text-light">
              <i className="bi bi-person-circle me-1" />{user.name}
            </Nav.Link>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1" />Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}