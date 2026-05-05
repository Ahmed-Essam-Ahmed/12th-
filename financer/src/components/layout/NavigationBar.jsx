import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useAuth }  from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import AppLogo      from '../common/AppLogo'

const NAV_LINKS = [
  { to: '/dashboard',    icon: 'bi-speedometer2',    label: 'Dashboard'    },
  { to: '/transactions', icon: 'bi-arrow-left-right', label: 'Transactions' },
  { to: '/budgets',      icon: 'bi-pie-chart',        label: 'Budgets'      },
  { to: '/goals',        icon: 'bi-trophy',           label: 'Goals'        },
  { to: '/categories',   icon: 'bi-tags',             label: 'Categories'   },
]

export default function NavigationBar() {
  const { user, logout }      = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate  = useNavigate()
  const { pathname } = useLocation()

  if (!user) return null

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center gap-2">
          <AppLogo size={28} />
          Mizanyti
        </Navbar.Brand>

        <Navbar.Toggle className="border-0" style={{ filter: 'invert(1)' }} />

        <Navbar.Collapse>
          <Nav className="me-auto mt-2 mt-lg-0">
            {NAV_LINKS.map(({ to, icon, label }) => (
              <Nav.Link key={to} as={Link} to={to} active={pathname === to}>
                <i className={`bi ${icon} me-1`} />{label}
              </Nav.Link>
            ))}
          </Nav>

          <Nav className="align-items-center gap-2 mt-2 mt-lg-0">
            <Button
              variant="link"
              onClick={toggleTheme}
              className="text-white p-1"
              style={{ textDecoration: 'none', fontSize: '1.1rem' }}
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'}`} />
            </Button>

            <Nav.Link as={Link} to="/profile" className="text-white d-flex align-items-center gap-1">
              <i className="bi bi-person-circle" />
              <span className="d-none d-md-inline">{user.name}</span>
            </Nav.Link>

            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1" />
              <span className="d-none d-sm-inline">Logout</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}