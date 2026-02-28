import { Request, Response, NextFunction } from 'express'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme-admin-secret'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = header.slice(7)
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  next()
}

export function loginHandler(req: Request, res: Response) {
  const { password } = req.body
  if (!password) {
    return res.status(400).json({ error: 'Password required' })
  }
  if (password !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Invalid password' })
  }
  res.json({ token: ADMIN_TOKEN })
}
