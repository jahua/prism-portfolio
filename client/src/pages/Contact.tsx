import { useState, type FormEvent } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { api } from '../api/client'
import { useI18n } from '../i18n/context'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const { t } = useI18n()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      await api.sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  return (
    <section className="section page-section">
      <div className="container container-narrow">
        <div className="page-header">
          <h1 className="page-title">{t('contact.title')}</h1>
          <p className="page-subtitle">{t('contact.subtitle')}</p>
        </div>

        {status === 'success' ? (
          <div className="status-card success">
            <CheckCircle size={48} />
            <h3>{t('contact.success_title')}</h3>
            <p>{t('contact.success_text')}</p>
            <button
              className="btn btn-primary"
              onClick={() => setStatus('idle')}
            >
              {t('contact.send_another')}
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {status === 'error' && (
              <div className="status-card error compact">
                <AlertCircle size={20} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">{t('contact.name')} *</label>
              <input
                id="name"
                type="text"
                required
                placeholder={t('contact.placeholder_name')}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('contact.email')} *</label>
              <input
                id="email"
                type="email"
                required
                placeholder={t('contact.placeholder_email')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.message')} *</label>
              <textarea
                id="message"
                required
                rows={6}
                placeholder={t('contact.placeholder_message')}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <div className="spinner-small" /> {t('contact.sending')}
                </>
              ) : (
                <>
                  <Send size={18} /> {t('contact.send')}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
