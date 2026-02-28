import { Router, Request, Response } from 'express'
import { Blog } from '../models/Blog'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const tag = req.query.tag as string | undefined

    const filter: Record<string, unknown> = { published: true }
    if (tag) filter.tags = tag

    const total = await Blog.countDocuments(filter)
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content')

    res.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/all', requireAuth, async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-content')
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true })
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()
    res.status(201).json(blog)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json({ message: 'Blog deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
