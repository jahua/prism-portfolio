import { Heart } from 'lucide-react'
import { useI18n } from '../i18n/context'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear().toString()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          {t('footer.built_by', { heart: '' })}
          <Heart size={14} className="heart-icon" />
        </p>
        <p className="footer-copy">{t('footer.rights', { year })}</p>
      </div>
    </footer>
  )
}
