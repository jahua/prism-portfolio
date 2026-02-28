import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import { requireAuth } from '../middleware/auth'

const router = Router()

// Ensure the uploads directory exists in the client/public folder
const UPLOAD_DIR = path.resolve(__dirname, '../../../client/public/uploads')
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (_req, file, cb) => {
    // Generate a random 16-byte hex string for the filename + original extension
    const hash = crypto.randomBytes(16).toString('hex')
    const ext = path.extname(file.originalname)
    cb(null, `${hash}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file format. Only JPEG, PNG, WEBP, GIF, and PDF are allowed.'))
    }
  },
})

// POST /api/upload
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    // Return the public URL that Vite will serve cleanly
    const publicUrl = `/uploads/${req.file.filename}`
    res.status(201).json({ url: publicUrl })
  } catch (error) {
    console.error('Upload Error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

export default router
