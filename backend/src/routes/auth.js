const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

const DEFAULT_CATEGORIES = [
  { name: 'Food & Dining',  type: 'expense', color: '#FF6B6B', isDefault: true },
  { name: 'Transport',      type: 'expense', color: '#4ECDC4', isDefault: true },
  { name: 'Rent',           type: 'expense', color: '#45B7D1', isDefault: true },
  { name: 'Utilities',      type: 'expense', color: '#96CEB4', isDefault: true },
  { name: 'Entertainment',  type: 'expense', color: '#FFEAA7', isDefault: true },
  { name: 'Healthcare',     type: 'expense', color: '#DDA0DD', isDefault: true },
  { name: 'Shopping',       type: 'expense', color: '#F0A500', isDefault: true },
  { name: 'Salary',         type: 'income',  color: '#2ECC71', isDefault: true },
  { name: 'Freelance',      type: 'income',  color: '#3498DB', isDefault: true },
  { name: 'Other',          type: 'expense', color: '#95A5A6', isDefault: true },
]

const makeToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password)
      return res.status(400).json({ error: 'All fields are required' })

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists)
      return res.status(400).json({ error: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 12)
    const user   = await prisma.user.create({
      data: { name, email, password: hashed }
    })

    await prisma.category.createMany({
      data: DEFAULT_CATEGORIES.map(c => ({ ...c, userId: user.id }))
    })

    res.status(201).json({
      token: makeToken(user.id),
      user:  { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
}
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password required' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      return res.status(401).json({ error: 'Invalid email or password' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return res.status(401).json({ error: 'Invalid email or password' })

    res.json({
      token: makeToken(user.id),
      user:  { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
    })
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get current user
router.get('/me', require('../middleware/auth'), async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where:  { id: req.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router