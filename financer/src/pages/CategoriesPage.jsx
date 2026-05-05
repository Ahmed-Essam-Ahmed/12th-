import { useState } from 'react'
import { Container, Button, Nav } from 'react-bootstrap'
import { useData } from '../hooks/useData'
import CategoryList from '../components/categories/CategoryList'
import CategoryForm from '../components/categories/CategoryForm'
import ConfirmDialog from '../components/common/ConfirmDialog'

export default function CategoriesPage() {
  const { categories, deleteCategory } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [tab, setTab]           = useState('expense')

  const handleEdit  = (cat) => { setEditing(cat); setShowForm(true) }
  const handleClose = ()    => { setEditing(null); setShowForm(false) }

  return (
    <Container>
      {/* Page header */}
      <div className="page-header">
        <h4>Categories</h4>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-lg me-1" /> Add Category
        </Button>
      </div>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4">
        {['expense', 'income'].map((t) => (
          <Nav.Item key={t}>
            <Nav.Link
              active={tab === t}
              onClick={() => setTab(t)}
              style={{ cursor: 'pointer' }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}{' '}
              <span style={{ color: 'var(--mz-muted)', fontSize: '0.8rem' }}>
                ({categories.filter((c) => c.type === t).length})
              </span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* List */}
      <CategoryList
        categories={categories.filter((c) => c.type === tab)}
        onEdit={handleEdit}
        onDelete={setDeleting}
      />

      <CategoryForm show={showForm} onHide={handleClose} category={editing} />
      <ConfirmDialog
        show={!!deleting} onHide={() => setDeleting(null)}
        onConfirm={() => { deleteCategory(deleting.id); setDeleting(null) }}
        title="Delete Category"
        message="Delete this category? Transactions using it will lose their category label."
      />
    </Container>
  )
}