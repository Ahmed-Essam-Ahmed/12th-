import { Card, Table, Badge } from 'react-bootstrap'
import { useData } from '../../hooks/useData'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function RecentTransactions() {
  const { transactions, categories } = useData()
  const recent = transactions.slice(0, 5)
  const getCatName = (id) => categories.find((c) => c.id === id)?.name || '—'

  return (
    <Card className="mb-4">
      <Card.Header><strong>Recent Transactions</strong></Card.Header>
      {recent.length === 0 ? (
        <Card.Body className="text-center text-muted py-4">
          No transactions yet. Add your first one!
        </Card.Body>
      ) : (
        <Table hover responsive className="mb-0">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((tx) => (
              <tr key={tx.id}>
                <td className="text-muted small">{formatDate(tx.date)}</td>
                <td>{tx.description || <span className="text-muted">—</span>}</td>
                <td><small>{getCatName(tx.categoryId)}</small></td>
                <td className="text-end">
                  <Badge bg={tx.type === 'income' ? 'success' : 'danger'}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  )
}