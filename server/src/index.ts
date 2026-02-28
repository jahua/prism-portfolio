import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/db'
import { loginHandler } from './middleware/auth'
import profileRoutes from './routes/profile'
import blogRoutes from './routes/blog'
import projectRoutes from './routes/project'
import contactRoutes from './routes/contact'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '5mb' }))

app.post('/api/auth/login', loginHandler)
app.use('/api/profile', profileRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

import uploadRoutes from './routes/upload'
app.use('/api/upload', uploadRoutes)

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../../client/dist')
  app.use(express.static(clientDist))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
