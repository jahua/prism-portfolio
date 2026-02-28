import { useState, useEffect } from 'react'
import {
  Download,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  BookOpen,
  Award,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'
import { api } from '../api/client'
import { useI18n } from '../i18n/context'
import type { Profile } from '../types'

export default function CV() {
  const { t } = useI18n()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getProfile()
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <section className="section page-section">
      <div className="container container-narrow">
        <div className="page-header">
          <h1 className="page-title">{t('cv.title')}</h1>
          {profile?.cvUrl && (
            <a
              href={profile.cvUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={18} /> {t('cv.download')}
            </a>
          )}
        </div>

        {/* Research Profile */}
        <div className="cv-section">
          <div className="cv-card cv-card-full cv-research-profile">
            <div className="cv-profile-header">
              <div className="cv-profile-image-wrapper">
                <img src="/profile.jpg" alt="Jiahua Duojie" className="cv-profile-image" />
              </div>
              <div className="cv-profile-title">
                <div className="cv-card-icon cv-icon-inline">
                  <BookOpen size={24} />
                </div>
                <h3>{t('cv.research_profile')}</h3>
              </div>
            </div>
            {profile?.researchProfile && (
              <p className="cv-profile-text" style={{ whiteSpace: 'pre-wrap' }}>
                {profile.researchProfile}
              </p>
            )}

            {(profile?.researchInterests && profile.researchInterests.length > 0) && (
              <div className="cv-interests">
                <h4>{t('cv.research_interests')}</h4>
                <div className="cv-skills">
                  {profile.researchInterests.map((interest) => (
                    <span key={interest} className="cv-skill-tag cv-skill-tag--accent">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="cv-grid">
          {/* Education */}
          {profile?.education && profile.education.length > 0 && (
            <div className="cv-card">
              <div className="cv-card-icon">
                <GraduationCap size={28} />
              </div>
              <h3>{t('cv.education')}</h3>
              {profile.education.map((edu, idx) => (
                <div className="cv-item" key={idx}>
                  <h4>{edu.degree}</h4>
                  <p className="cv-item-meta">{edu.meta}</p>
                  {edu.thesis && (
                    <div className="cv-thesis">
                      <strong>Thesis:</strong> <em>{edu.thesis}</em>
                      {edu.supervisor && (
                        <p className="cv-item-meta" style={{ marginTop: '0.25rem' }}>
                          Supervisor: {edu.supervisor}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications */}
          {profile?.publications && profile.publications.length > 0 && (
            <div className="cv-card">
              <div className="cv-card-icon">
                <BookOpen size={28} />
              </div>
              <h3>{t('cv.publications')}</h3>
              {profile.publications.map((pub, idx) => (
                <div className="cv-item" key={idx}>
                  <div className="cv-pub">
                    <span className={`cv-pub-badge ${pub.badge !== 'In Preparation' ? 'cv-pub-badge--published' : ''}`}>
                      {pub.badge}
                    </span>
                    <h4>{pub.title}</h4>
                    <p className="cv-item-meta">{pub.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Professional Experience */}
          {profile?.experience && profile.experience.length > 0 && (
            <div className="cv-card">
              <div className="cv-card-icon">
                <Briefcase size={28} />
              </div>
              <h3>{t('cv.experience')}</h3>
              {profile.experience.map((exp, idx) => (
                <div className="cv-item" key={idx}>
                  <h4>{exp.role}</h4>
                  <p className="cv-item-meta">{exp.meta}</p>
                  {(exp.responsibilities && exp.responsibilities.length > 0) && (
                    <ul className="cv-item-list">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Technical Skills */}
          {profile?.skills && profile.skills.length > 0 && (
            <div className="cv-card">
              <div className="cv-card-icon">
                <Code size={28} />
              </div>
              <h3>{t('cv.skills')}</h3>
              {profile.skills.map((skill, idx) => (
                <div className="cv-skill-section" key={idx}>
                  <h4>{skill.category}</h4>
                  <div className="cv-skills">
                    {skill.items.map((s) => (
                      <span key={s} className="cv-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {profile?.certifications && profile.certifications.length > 0 && (
            <div className="cv-card">
              <div className="cv-card-icon">
                <ShieldCheck size={28} />
              </div>
              <h3>{t('cv.certifications')}</h3>
              {profile.certifications.map((cert, idx) => (
                <div className="cv-item" key={idx}>
                  <div className="cv-cert">
                    <Award size={20} className="cv-cert-icon" />
                    <div>
                      <h4>{cert.title}</h4>
                      <p className="cv-item-meta">{cert.meta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {profile?.languages && profile.languages.length > 0 && (
            <div className="cv-card">
              <div className="cv-card-icon">
                <Globe size={28} />
              </div>
              <h3>{t('cv.languages')}</h3>
              {profile.languages.map((lang, idx) => (
                <div className="cv-item" key={idx}>
                  <h4>{lang.name}</h4>
                  <p>{lang.proficiency}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Academic Links */}
        <div className="cv-footer-links">
          <a
            href="https://orcid.org/0009-0008-4656-1977"
            target="_blank"
            rel="noreferrer"
            className="cv-footer-link"
          >
            <ExternalLink size={16} /> ORCID
          </a>
          <a
            href="https://github.com/jahua"
            target="_blank"
            rel="noreferrer"
            className="cv-footer-link"
          >
            <ExternalLink size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/duojie-jiahua/"
            target="_blank"
            rel="noreferrer"
            className="cv-footer-link"
          >
            <ExternalLink size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
