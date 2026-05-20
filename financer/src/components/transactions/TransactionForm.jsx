import { useState, useEffect, useRef } from 'react'
import { Modal, Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { useData } from '../../hooks/useData'

const today = new Date().toISOString().split('T')[0]

const empty = {
  type: 'expense', amount: '', categoryId: '',
  description: '', date: today,
}

export default function TransactionForm({ show, onHide, transaction = null }) {
  const { categories, addTransaction, updateTransaction } = useData()
  const [form, setForm]         = useState(empty)
  const [scanning, setScanning] = useState(false)
  const [ocrMsg, setOcrMsg]     = useState('')
  const fileRef                 = useRef()
  const isEditing               = !!transaction

  useEffect(() => {
    setForm(transaction
      ? { type: transaction.type, amount: transaction.amount,
          categoryId: transaction.categoryId,
          description: transaction.description || '', date: transaction.date }
      : empty)
    setOcrMsg('')
  }, [transaction, show])

  const handle = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value, ...(name === 'type' ? { categoryId: '' } : {}) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, amount: parseFloat(form.amount) }
    isEditing ? updateTransaction(transaction.id, data) : addTransaction(data)
    onHide()
  }

  const handleScan = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setScanning(true)
    setOcrMsg('')
    try {
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng')
      const { data: { text } } = await worker.recognize(file)
      await worker.terminate()

      // Extract amount
      const amountMatch = text.match(/(\d+[\.,]\d{2})/g)
      const amounts = amountMatch
        ? amountMatch.map(a => parseFloat(a.replace(',', '.')))
        : []
      const maxAmount = amounts.length ? Math.max(...amounts) : null

      // Extract date
      const dateMatch = text.match(/(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/)
      let extractedDate = today
      if (dateMatch) {
        const parts = dateMatch[1].split(/[\/\-\.]/)
        if (parts.length === 3) {
          const year  = parts[2].length === 2 ? '20' + parts[2] : parts[2]
          const month = parts[1].padStart(2, '0')
          const day   = parts[0].padStart(2, '0')
          const parsed = `${year}-${month}-${day}`
          if (parsed <= today) extractedDate = parsed
        }
      }

      if (maxAmount) {
        setForm(f => ({ ...f, amount: maxAmount, date: extractedDate }))
        setOcrMsg(`✓ Found amount: ${maxAmount} EGP${dateMatch ? ` · Date: ${extractedDate}` : ''}. Review and adjust if needed.`)
      } else {
        setOcrMsg('Could not extract amount. Please enter manually.')
      }
    } catch {
      setOcrMsg('Scan failed. Please enter details manually.')
    } finally {
      setScanning(false)
      fileRef.current.value = ''
    }
  }

  const filtered = categories.filter((c) => c.type === form.type)

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>

          {/* OCR Scanner */}
          {!isEditing && (
            <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'var(--mz-bg)', border: '1px dashed var(--mz-border)' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small fw-semibold">
                  <i className="bi bi-camera me-1" />Scan Receipt
                </span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => fileRef.current.click()}
                  disabled={scanning}
                >
                  {scanning
                    ? <><Spinner size="sm" className="me-1" />Scanning...</>
                    : <><i className="bi bi-upload me-1" />Upload Receipt</>}
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleScan}
                />
              </div>
              {ocrMsg && (
                <Alert
                  variant={ocrMsg.startsWith('✓') ? 'success' : 'warning'}
                  className="py-2 mb-0 small"
                >
                  {ocrMsg}
                </Alert>
              )}
              {!ocrMsg && (
                <small style={{ color: 'var(--mz-muted)' }}>
                  Upload a photo of a receipt to auto-fill the amount and date.
                </small>
              )}
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handle}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Amount (EGP)</Form.Label>
                <Form.Control type="number" name="amount" min="0" step="0.01"
                  placeholder="0.00" value={form.amount} onChange={handle} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={form.date}
                  onChange={handle} max={today} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select name="categoryId" value={form.categoryId} onChange={handle} required>
              <option value="">Select a category</option>
              {filtered.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Description <span className="small" style={{ color: 'var(--mz-muted)' }}>(optional)</span>
            </Form.Label>
            <Form.Control type="text" name="description"
              placeholder="e.g. Monthly groceries"
              value={form.description} onChange={handle} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}