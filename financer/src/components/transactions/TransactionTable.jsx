import { Table, Badge, Button } from 'react-bootstrap'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function TransactionTable({ transactions, categories, onEdit, onDelete }) {
  const getCatName = (id) => categories.find((c) => c.id === id)?.name || '—'

  if (transactions.length === 0)
    return (
      <div className="text-center text-muted py-5">
        <i className="bi bi-inbox fs-1 d-block mb-2" />
        No transactions found.
      </div>
    )

  return (
    <Table hover responsive>
      <thead className="table-dark">
        <tr>
          <th>Date</th><th>Description</th><th>Category</th>
          <th>Type</th><th className="text-end">Amount</th><th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td className="small">{formatDate(tx.date)}</td>
            <td>{tx.description || <span className="text-muted">—</span>}</td>
            <td><small>{getCatName(tx.categoryId)}</small></td>
            <td><Badge bg={tx.type === 'income' ? 'success' : 'danger'}>{tx.type}</Badge></td>
            <td className={`text-end fw-bold ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
            </td>
            <td className="text-center">
              <Button variant="outline-primary" size="sm" className="me-1" onClick={() => onEdit(tx)}>
                <i className="bi bi-pencil" />
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(tx)}>
                <i className="bi bi-trash" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}