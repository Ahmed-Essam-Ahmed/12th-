import { Row, Col, Form, Button } from 'react-bootstrap'

export default function TransactionFilters({ filters, onChange, onReset, categories }) {
  const h = (e) => onChange({ ...filters, [e.target.name]: e.target.value })
  return (
    <Row className="g-2 align-items-end mb-3">
      <Col md={3}>
        <Form.Label className="small fw-semibold">Search</Form.Label>
        <Form.Control type="text" name="search" placeholder="Description..."
          value={filters.search} onChange={h} />
      </Col>
      <Col md={2}>
        <Form.Label className="small fw-semibold">Type</Form.Label>
        <Form.Select name="type" value={filters.type} onChange={h}>
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Label className="small fw-semibold">Category</Form.Label>
        <Form.Select name="categoryId" value={filters.categoryId} onChange={h}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Form.Select>
      </Col>
      <Col md={2}>
        <Form.Label className="small fw-semibold">From</Form.Label>
        <Form.Control type="date" name="dateFrom" value={filters.dateFrom} onChange={h} />
      </Col>
      <Col md={2}>
        <Form.Label className="small fw-semibold">To</Form.Label>
        <Form.Control type="date" name="dateTo" value={filters.dateTo} onChange={h} />
      </Col>
      <Col xs={12} className="text-end">
        <Button variant="outline-secondary" size="sm" onClick={onReset}>
          <i className="bi bi-x-circle me-1" />Clear Filters
        </Button>
      </Col>
    </Row>
  )
}