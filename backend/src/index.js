const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.use('/api/auth',         require('./routes/auth'))
app.use('/api/transactions', require('./routes/transactions'))
app.use('/api/categories',   require('./routes/categories'))
app.use('/api/goals',        require('./routes/goals'))
app.use('/api/budgets',      require('./routes/budgets'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))