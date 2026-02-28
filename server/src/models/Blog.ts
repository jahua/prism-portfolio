import { Schema, model, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  summary: string
  content: string
  coverImage: string
  tags: string[]
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

blogSchema.index({ slug: 1 })
blogSchema.index({ published: 1, createdAt: -1 })

export const Blog = model<IBlog>('Blog', blogSchema)
