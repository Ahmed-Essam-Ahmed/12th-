import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }     from './context/AuthContext'
import { DataProvider }     from './context/DataContext'
import { ThemeProvider }    from './context/ThemeContext'
import ProtectedRoute       from './components/layout/ProtectedRoute'
import NavigationBar        from './components/layout/NavigationBar'
import Footer               from './components/layout/Footer'
import LoginPage            from './pages/LoginPage'
import RegisterPage         from './pages/RegisterPage'
import DashboardPage        from './pages/DashboardPage'
import TransactionsPage     from './pages/TransactionsPage'
import CategoriesPage       from './pages/CategoriesPage'
import BudgetsPage          from './pages/BudgetsPage'
import GoalsPage            from './pages/GoalsPage'
import ProfilePage          from './pages/ProfilePage'
import NotFoundPage         from './pages/NotFoundPage'

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <main className="flex-grow-1 page-wrapper">{children}</main>
      <Footer />
    </div>
  )
}

function Protected({ children }) {
  return <ProtectedRoute><Layout>{children}</Layout></ProtectedRoute>
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/"             element={<Navigate to="/dashboard" replace />} />
              <Route path="/login"        element={<LoginPage />} />
              <Route path="/register"     element={<RegisterPage />} />
              <Route path="/dashboard"    element={<Protected><DashboardPage /></Protected>} />
              <Route path="/transactions" element={<Protected><TransactionsPage /></Protected>} />
              <Route path="/categories"   element={<Protected><CategoriesPage /></Protected>} />
              <Route path="/budgets"      element={<Protected><BudgetsPage /></Protected>} />
              <Route path="/goals"        element={<Protected><GoalsPage /></Protected>} />
              <Route path="/profile"      element={<Protected><ProfilePage /></Protected>} />
              <Route path="*"             element={<NotFoundPage />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}