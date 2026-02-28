import { Schema, model, Document } from 'mongoose'

export interface IProfile extends Document {
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
  
  updatedAt: Date
}

const profileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: { type: String, default: '' },
    motto: { type: String, default: '' },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      email: String,
      instagram: String,
    },
    academicProfiles: {
      googleScholar: String,
      researchGate: String,
      dblp: String,
      orcid: String,
    },
    cvUrl: String,
    
    // New CV Sections
    researchProfile: String,
    researchInterests: [String],
    education: [{
      degree: String,
      meta: String,
      thesis: String,
      supervisor: String
    }],
    publications: [{
      badge: String,
      title: String,
      meta: String
    }],
    experience: [{
      role: String,
      meta: String,
      responsibilities: [String]
    }],
    skills: [{
      category: String,
      items: [String]
    }],
    certifications: [{
      title: String,
      meta: String
    }],
    languages: [{
      name: String,
      proficiency: String
    }]
  },
  { timestamps: true }
)

export const Profile = model<IProfile>('Profile', profileSchema)
