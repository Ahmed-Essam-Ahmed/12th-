const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const data = await prisma.budget.findMany({ where: { userId: req.userId } })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', async (req, res) => {
  try {
    const { categoryId, amount, month } = req.body
    const data = await prisma.budget.upsert({
      where:  { userId_categoryId_month: { userId: req.userId, categoryId, month } },
      update: { amount: parseFloat(amount) },
      create: { amount: parseFloat(amount), month, categoryId, userId: req.userId },
    })
    res.status(201).json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/:id', async (req, res) => {
  try {
    const { amount } = req.body
    await prisma.budget.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data:  { amount: parseFloat(amount) },
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await prisma.budget.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router