import { Github, Linkedin, Twitter, Mail, Instagram } from 'lucide-react'

interface Props {
  links: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
    instagram?: string
  }
}

const ICON_MAP: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  instagram: Instagram,
}

export default function SocialLinks({ links }: Props) {
  const entries = Object.entries(links).filter(([, v]) => v)

  return (
    <div className="social-links">
      {entries.map(([key, url]) => {
        const Icon = ICON_MAP[key]
        if (!Icon) return null
        const href = key === 'email' ? `mailto:${url}` : url!
        return (
          <a
            key={key}
            href={href}
            target={key === 'email' ? undefined : '_blank'}
            rel="noreferrer"
            className="social-link"
            aria-label={key}
          >
            <Icon size={22} />
          </a>
        )
      })}
    </div>
  )
}
