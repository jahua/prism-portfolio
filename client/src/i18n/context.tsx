import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { t, type Locale, type TranslationKey } from './translations'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, vars?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

function getInitialLocale(): Locale {
  const stored = localStorage.getItem('locale') as Locale | null
  if (stored && ['en', 'zh', 'bo'].includes(stored)) return stored

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) return 'zh'
  if (browserLang.startsWith('bo')) return 'bo'
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale === 'bo' ? 'bo' : newLocale === 'zh' ? 'zh-CN' : 'en'
    document.documentElement.setAttribute('data-locale', newLocale)
  }, [])

  const translate = useCallback(
    (key: TranslationKey, vars?: Record<string, string>) => t(key, locale, vars),
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
