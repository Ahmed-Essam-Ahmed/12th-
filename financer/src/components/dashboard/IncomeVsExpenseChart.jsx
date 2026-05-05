import { Card } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useData } from '../../hooks/useData'
import { getMonthlyData } from '../../utils/calculations'

export default function IncomeVsExpenseChart() {
  const { transactions } = useData()
  const data = getMonthlyData(transactions)

  return (
    <Card className="mb-4 h-100">
      <Card.Header><strong>Income vs Expenses</strong></Card.Header>
      <Card.Body>
        {data.length === 0 ? (
          <div className="text-center text-muted py-4">No data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `EGP ${v.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="income"   name="Income"   fill="#198754" radius={[4,4,0,0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#dc3545" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card.Body>
    </Card>
  )
}