import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { useI18n } from '../i18n/context'
import { LOCALE_LABELS, LOCALE_FLAGS, type Locale } from '../i18n/translations'

const LOCALES: Locale[] = ['en', 'zh', 'bo']

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher-btn"
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
      >
        <Globe size={18} />
        <span className="lang-switcher-current">{LOCALE_FLAGS[locale]}</span>
      </button>

      {open && (
        <div className="lang-dropdown">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              className={`lang-option ${loc === locale ? 'active' : ''}`}
              onClick={() => {
                setLocale(loc)
                setOpen(false)
              }}
            >
              <span className="lang-option-flag">{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_LABELS[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
