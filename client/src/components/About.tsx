import type { Profile } from '../types'
import { BookOpen, GraduationCap, Globe, Award } from 'lucide-react'
import { useI18n } from '../i18n/context'

interface Props {
  profile: Profile
}

const ACADEMIC_ICONS: Record<string, typeof BookOpen> = {
  googleScholar: GraduationCap,
  researchGate: Globe,
  dblp: BookOpen,
  orcid: Award,
}

const ACADEMIC_LABELS: Record<string, string> = {
  googleScholar: 'Google Scholar',
  researchGate: 'Research Gate',
  dblp: 'DBLP',
  orcid: 'ORCID',
}

export default function About({ profile }: Props) {
  const { t } = useI18n()
  const academics = Object.entries(profile.academicProfiles || {}).filter(
    ([, v]) => v
  )

  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="about-content">
          <div className="about-bio">
            {profile.bio.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {academics.length > 0 && (
            <div className="about-academics">
              <h3>{t('about.academic_profiles')}</h3>
              <div className="academic-links">
                {academics.map(([key, url]) => {
                  const Icon = ACADEMIC_ICONS[key] || Globe
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="academic-link"
                    >
                      <Icon size={20} />
                      <span>{ACADEMIC_LABELS[key] || key}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
