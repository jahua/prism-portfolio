import { useState, useEffect } from 'react'
import {
  ExternalLink,
  Github,
  Brain,
  MessageSquare,
  Compass,
  MapPin,
  Bike,
  BarChart3,
  Monitor,
  FileText,
  Volume2,
  Database,
  Globe,
  Receipt,
  Star,
} from 'lucide-react'
import { api } from '../api/client'
import { useI18n } from '../i18n/context'
import type { Project } from '../types'

const CATEGORY_ICONS: Record<string, typeof Brain> = {
  'MSc Thesis': MessageSquare,
  'Research': Brain,
  'Research Proposal': Compass,
  'Applied AI': MessageSquare,
  'NLP / Speech': Volume2,
  'Computer Vision': Monitor,
  'Machine Learning': Brain,
  'Data Science': BarChart3,
  'Data Visualization': BarChart3,
  'Data Engineering': Database,
  'Full-Stack': Globe,
  'Enterprise': Receipt,
  'Web': FileText,
  'default': MapPin,
}

const SECTION_ORDER = [
  'Research & Thesis',
  'AI & Machine Learning',
  'Data Engineering & Analytics',
  'Software Engineering',
]

function ProjectCard({ project }: { project: Project }) {
  const Icon = CATEGORY_ICONS[project.category] || Bike

  return (
    <article className="project-card">
      <div className="project-card-header">
        <div className="project-card-icon">
          <Icon size={24} />
        </div>
        <div className="project-card-meta">
          <span className="project-type-badge">{project.category}</span>
          <span className="project-period">{project.period}</span>
          {project.stars && project.stars > 0 && (
            <span className="project-stars">
              <Star size={14} /> {project.stars}
            </span>
          )}
        </div>
      </div>

      <h3 className="project-card-title">{project.title}</h3>

      {(project.language || project.license) && (
        <div className="project-meta-row">
          {project.language && (
            <span className="project-lang">{project.language}</span>
          )}
          {project.license && (
            <span className="project-license">{project.license}</span>
          )}
        </div>
      )}

      <p className="project-card-desc">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="project-highlights">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className="project-card-footer">
        <div className="project-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                {link.icon === 'github' ? <Github size={16} /> : <ExternalLink size={16} />}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useI18n()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // Group by section, preserve defined order
  const grouped = SECTION_ORDER.reduce<Record<string, Project[]>>((acc, sec) => {
    const items = projects.filter((p) => p.section === sec)
    if (items.length > 0) acc[sec] = items
    return acc
  }, {})
  // Append any sections not in SECTION_ORDER
  projects.forEach((p) => {
    if (!SECTION_ORDER.includes(p.section) && !grouped[p.section]) {
      grouped[p.section] = projects.filter((x) => x.section === p.section)
    }
  })

  const sectionKeys = [
    ...SECTION_ORDER.filter((s) => grouped[s]),
    ...Object.keys(grouped).filter((s) => !SECTION_ORDER.includes(s)),
  ]

  const SECTION_LABEL_MAP: Record<string, string> = {
    'Research & Thesis': t('projects.section.research'),
    'AI & Machine Learning': t('projects.section.ai'),
    'Data Engineering & Analytics': t('projects.section.data'),
    'Software Engineering': t('projects.section.software'),
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('projects.title')}</h1>
          <p className="page-subtitle">{t('projects.subtitle')}</p>
          <a
            href="https://github.com/jahua?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            style={{ marginTop: '0.5rem' }}
          >
            <Github size={18} /> {t('projects.view_github')}
          </a>
        </div>

        {sectionKeys.map((section) => (
          <div key={section} className="project-section">
            <h2 className="project-section-title">
              {SECTION_LABEL_MAP[section] || section}
            </h2>
            <div className="projects-timeline">
              {grouped[section].map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="empty-state">
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </section>
  )
}
