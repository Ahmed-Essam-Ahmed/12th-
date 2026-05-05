import { Card } from 'react-bootstrap'
import { useData } from '../../hooks/useData'
import { getBalance } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'

export default function BalanceCard() {
  const { transactions } = useData()
  const balance = getBalance(transactions)

  return (
    <Card className="balance-gradient text-white mb-4">
      <Card.Body className="py-4 px-4" style={{ position: 'relative', zIndex: 1 }}>
        <p className="mb-1 small" style={{ opacity: 0.8 }}>
          <i className="bi bi-wallet2 me-1" /> Current Balance
        </p>
        <h2 className="fw-bold mb-0" style={{ fontSize: '2rem', letterSpacing: '-1px' }}>
          {formatCurrency(balance)}
        </h2>
        <p className="mt-2 mb-0 small" style={{ opacity: 0.7 }}>
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} total
        </p>
      </Card.Body>
    </Card>
  )
}