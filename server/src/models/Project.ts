import { Schema, model, Document } from 'mongoose'

export interface IProjectLink {
  label: string
  url: string
  icon: 'github' | 'external'
}

export interface IProject extends Document {
  title: string
  repo: string
  period: string
  category: string
  section: string
  description: string
  highlights: string[]
  stack: string[]
  stars?: number
  license?: string
  language?: string
  links: IProjectLink[]
  order: number
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    repo: { type: String, default: '' },
    period: { type: String, required: true },
    category: { type: String, required: true },
    section: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    stack: [{ type: String }],
    stars: { type: Number },
    license: { type: String },
    language: { type: String },
    links: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, enum: ['github', 'external'], default: 'github' },
      },
    ],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

projectSchema.index({ section: 1, order: 1 })

export const Project = model<IProject>('Project', projectSchema)
