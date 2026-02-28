import { Router, Request, Response } from 'express'
import { Message } from '../models/Message'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const msg = new Message({ name, email, message })
    await msg.save()

    res.status(201).json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/', async (_req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
