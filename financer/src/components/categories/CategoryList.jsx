import { Row, Col, Card, Badge, Button } from 'react-bootstrap'

export default function CategoryList({ categories, onEdit, onDelete }) {
  if (categories.length === 0)
    return (
      <div className="text-center text-muted py-5">
        <i className="bi bi-tags fs-1 d-block mb-2" />
        No categories found.
      </div>
    )

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-3">
      {categories.map((cat) => (
        <Col key={cat.id}>
          <Card className="h-100">
            <Card.Body className="d-flex align-items-center gap-3">
              <div style={{ width: 16, height: 16, borderRadius: '50%',
                backgroundColor: cat.color, flexShrink: 0 }} />
              <div className="flex-grow-1 overflow-hidden">
                <div className="fw-semibold text-truncate">{cat.name}</div>
                <Badge bg={cat.type === 'income' ? 'success' : 'danger'} className="small">
                  {cat.type}
                </Badge>
              </div>
              <div className="d-flex gap-1">
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(cat)}>
                  <i className="bi bi-pencil" />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(cat)}>
                  <i className="bi bi-trash" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}