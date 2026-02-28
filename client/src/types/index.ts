export interface Profile {
  _id: string
  name: string
  title: string
  bio: string
  avatar: string
  motto: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
    instagram?: string
  }
  academicProfiles: {
    googleScholar?: string
    researchGate?: string
    dblp?: string
    orcid?: string
  }
  cvUrl?: string
  
  // New CV Sections
  researchProfile?: string
  researchInterests?: string[]
  education?: { degree: string; meta: string; thesis?: string; supervisor?: string }[]
  publications?: { badge: string; title: string; meta: string }[]
  experience?: { role: string; meta: string; responsibilities: string[] }[]
  skills?: { category: string; items: string[] }[]
  certifications?: { title: string; meta: string }[]
  languages?: { name: string; proficiency: string }[]
}

export interface Blog {
  _id: string
  title: string
  slug: string
  summary: string
  content: string
  coverImage: string
  tags: string[]
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogListResponse {
  blogs: Blog[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ProjectLink {
  label: string
  url: string
  icon: 'github' | 'external'
}

export interface Project {
  _id: string
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
  links: ProjectLink[]
  order: number
  createdAt: string
  updatedAt: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
