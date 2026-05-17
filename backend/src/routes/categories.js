const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

router.use(auth)

router.get('/', async (req, res) => {
  try {
    const data = await prisma.category.findMany({ where: { userId: req.userId } })
    res.json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.post('/', async (req, res) => {
  try {
    const { name, type, color } = req.body
    const data = await prisma.category.create({
      data: { name, type, color, userId: req.userId }
    })
    res.status(201).json(data)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, type, color } = req.body
    await prisma.category.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data:  { name, type, color },
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

router.delete('/:id', async (req, res) => {
  try {
    await prisma.category.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    })
    res.json({ success: true })
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router