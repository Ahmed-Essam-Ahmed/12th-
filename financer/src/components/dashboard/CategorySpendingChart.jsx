import { Card } from 'react-bootstrap'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useData } from '../../hooks/useData'
import { getByCategory } from '../../utils/calculations'

export default function CategorySpendingChart() {
  const { transactions, categories } = useData()
  const data = getByCategory(transactions, categories)

  return (
    <Card className="mb-4 h-100">
      <Card.Header><strong>Spending by Category</strong></Card.Header>
      <Card.Body>
        {data.length === 0 ? (
          <div className="text-center text-muted py-4">No expense data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `EGP ${v.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  )
}