import type { Profile } from '../types'
import SocialLinks from './SocialLinks'
import { FileText } from 'lucide-react'
import { useI18n } from '../i18n/context'

interface Props {
  profile: Profile
}

export default function Hero({ profile }: Props) {
  const { t } = useI18n()

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-avatar-wrapper">
          {profile.avatar || '/profile.jpg' ? (
            <img src={profile.avatar || '/profile.jpg'} alt={profile.name} className="hero-avatar" />
          ) : (
            <div className="hero-avatar-placeholder">
              {profile.name
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="hero-text">
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          {profile.motto && <p className="hero-motto">"{profile.motto}"</p>}

          <div className="hero-actions">
            <SocialLinks links={profile.socialLinks} />
            {profile.cvUrl && (
              <a href={profile.cvUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
                <FileText size={18} />
                {t('hero.cv_button')}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
