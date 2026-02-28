import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useI18n } from '../i18n/context'
import type { TranslationKey } from '../i18n/translations'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_ITEMS: { path: string; labelKey: TranslationKey }[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/projects', labelKey: 'nav.projects' },
  { path: '/blogs', labelKey: 'nav.blog' },
  { path: '/cv', labelKey: 'nav.cv' },
  { path: '/contact', labelKey: 'nav.contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useI18n()

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          Jiahua Duojie
        </Link>

        <div className="navbar-right">
          <LanguageSwitcher />
          <button
            className="navbar-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={`navbar-nav ${open ? 'open' : ''}`}>
          {NAV_ITEMS.map(({ path, labelKey }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${pathname === path ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {t(labelKey)}
            </Link>
          ))}
          <div className="navbar-lang-mobile">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}
