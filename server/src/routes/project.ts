import { Router, Request, Response } from 'express'
import { Project } from '../models/Project'
import { requireAuth } from '../middleware/auth'

const router = Router()

// Public: get all projects grouped by section
router.get('/', async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ section: 1, order: 1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Admin: get all projects flat list
router.get('/all', requireAuth, async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ section: 1, order: 1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Admin: get single project by id
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Admin: create
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Admin: update
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Admin: delete
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
