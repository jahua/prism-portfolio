import { Router, Request, Response } from 'express'
import { Profile } from '../models/Profile'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne()
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }
    res.json(profile)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    })
    res.json(profile)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
