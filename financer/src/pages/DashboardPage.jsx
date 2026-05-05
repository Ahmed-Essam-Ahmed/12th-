import { Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { useData } from '../hooks/useData'
import { getTotalIncome, getTotalExpenses } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'
import BalanceCard from '../components/dashboard/BalanceCard'
import StatCard from '../components/dashboard/StatCard'
import IncomeVsExpenseChart from '../components/dashboard/IncomeVsExpenseChart'
import CategorySpendingChart from '../components/dashboard/CategorySpendingChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'

export default function DashboardPage() {
  const { user } = useAuth()
  const { transactions } = useData()

  return (
    <Container>
      <h4 className="mb-4">Welcome back, {user.name} 👋</h4>
      <Row>
        <Col md={4}><BalanceCard /></Col>
        <Col md={4}>
          <StatCard title="Total Income" value={formatCurrency(getTotalIncome(transactions))}
            icon="bi-arrow-down-circle-fill" variant="success" />
        </Col>
        <Col md={4}>
          <StatCard title="Total Expenses" value={formatCurrency(getTotalExpenses(transactions))}
            icon="bi-arrow-up-circle-fill" variant="danger" />
        </Col>
      </Row>
      <Row>
        <Col lg={7}><IncomeVsExpenseChart /></Col>
        <Col lg={5}><CategorySpendingChart /></Col>
      </Row>
      <RecentTransactions />
    </Container>
  )
}