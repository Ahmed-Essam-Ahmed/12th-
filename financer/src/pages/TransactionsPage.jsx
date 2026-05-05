import { useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { useData } from '../hooks/useData'
import TransactionTable from '../components/transactions/TransactionTable'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionFilters from '../components/transactions/TransactionFilters'
import ConfirmDialog from '../components/common/ConfirmDialog'

const defaultFilters = { search: '', type: '', categoryId: '', dateFrom: '', dateTo: '' }

export default function TransactionsPage() {
  const { transactions, categories, deleteTransaction } = useData()
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [deleting, setDeleting]   = useState(null)
  const [filters, setFilters]     = useState(defaultFilters)

  const handleEdit = (tx) => { setEditing(tx); setShowForm(true) }
  const handleClose = ()  => { setEditing(null); setShowForm(false) }

  const filtered = transactions.filter((tx) => {
    if (filters.type       && tx.type       !== filters.type)                                 return false
    if (filters.categoryId && tx.categoryId !== filters.categoryId)                           return false
    if (filters.search     && !tx.description?.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.dateFrom   && tx.date < filters.dateFrom)                                     return false
    if (filters.dateTo     && tx.date > filters.dateTo)                                       return false
    return true
  })

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Transactions</h4>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-lg me-1" />Add Transaction
        </Button>
      </div>
      <Card>
        <Card.Body>
          <TransactionFilters filters={filters} onChange={setFilters}
            onReset={() => setFilters(defaultFilters)} categories={categories} />
          <TransactionTable transactions={filtered} categories={categories}
            onEdit={handleEdit} onDelete={setDeleting} />
          <small className="text-muted">
            Showing {filtered.length} of {transactions.length} transactions
          </small>
        </Card.Body>
      </Card>
      <TransactionForm show={showForm} onHide={handleClose} transaction={editing} />
      <ConfirmDialog show={!!deleting} onHide={() => setDeleting(null)}
        onConfirm={() => { deleteTransaction(deleting.id); setDeleting(null) }}
        title="Delete Transaction" message="Delete this transaction? This cannot be undone." />
    </Container>
  )
}