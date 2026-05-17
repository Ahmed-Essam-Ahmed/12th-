const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      where:   { userId: req.userId },
      orderBy: { date: 'desc' },
    })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', async (req, res) => {
  try {
    const { type, amount, description, date, categoryId } = req.body
    const data = await prisma.transaction.create({
      data: { type, amount: parseFloat(amount), description, date, categoryId, userId: req.userId },
    })
    res.status(201).json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/:id', async (req, res) => {
  try {
    const { type, amount, description, date, categoryId } = req.body
    await prisma.transaction.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data:  { type, amount: parseFloat(amount), description, date, categoryId },
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await prisma.transaction.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router