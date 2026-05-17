const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const data = await prisma.goal.findMany({
      where:   { userId: req.userId },
      include: { contributions: { orderBy: { date: 'desc' } } },
    })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', async (req, res) => {
  try {
    const { name, targetAmount, deadline, color } = req.body
    const data = await prisma.goal.create({
      data:    { name, targetAmount: parseFloat(targetAmount), deadline, color, userId: req.userId },
      include: { contributions: true },
    })
    res.status(201).json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, targetAmount, deadline, color } = req.body
    await prisma.goal.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data:  { name, targetAmount: parseFloat(targetAmount), deadline, color },
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await prisma.goal.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/:id/contributions', async (req, res) => {
  try {
    const goal = await prisma.goal.findFirst({
      where: { id: req.params.id, userId: req.userId }
    })
    if (!goal) return res.status(404).json({ error: 'Goal not found' })

    const { amount, date, note } = req.body
    const contribution = await prisma.contribution.create({
      data: { amount: parseFloat(amount), date, note, goalId: goal.id },
    })

    const newSaved = goal.savedAmount + parseFloat(amount)
    await prisma.goal.update({
      where: { id: goal.id },
      data:  { savedAmount: newSaved, completed: newSaved >= goal.targetAmount },
    })

    res.status(201).json(contribution)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router