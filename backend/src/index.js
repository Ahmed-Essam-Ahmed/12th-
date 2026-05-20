const express    = require('express')
const cors       = require('cors')
const helmet     = require('helmet')
const rateLimit  = require('express-rate-limit')
require('dotenv').config()

const app = express()

// Security headers
app.use(helmet())

// CORS
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))

// Body parser
app.use(express.json())

// Rate limiter on auth routes only
const authLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 10,               // max 10 requests per minute
  message: { error: 'Too many attempts, please try again later.' },
})

app.use('/api/auth', authLimiter)

// Routes
app.use('/api/auth',         require('./routes/auth'))
app.use('/api/transactions', require('./routes/transactions'))
app.use('/api/categories',   require('./routes/categories'))
app.use('/api/goals',        require('./routes/goals'))
app.use('/api/budgets',      require('./routes/budgets'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))