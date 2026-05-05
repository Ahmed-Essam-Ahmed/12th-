import { Card } from 'react-bootstrap'
import { useData } from '../../hooks/useData'
import { getBalance } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'

export default function BalanceCard() {
  const { transactions } = useData()
  const balance = getBalance(transactions)
  const isPositive = balance >= 0

  return (
    <Card className={`text-white mb-4 bg-${isPositive ? 'primary' : 'danger'}`}>
      <Card.Body className="text-center py-4">
        <p className="mb-1 opacity-75 small">Current Balance</p>
        <h2 className="fw-bold mb-0">{formatCurrency(balance)}</h2>
      </Card.Body>
    </Card>
  )
}