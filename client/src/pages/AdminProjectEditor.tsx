import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, ImagePlus, Loader2 } from 'lucide-react'
import { adminApi, isAuthenticated } from '../api/admin'
import type { Project, ProjectLink } from '../types'

const SECTIONS = [
  'Research & Thesis',
  'AI & Machine Learning',
  'Data Engineering & Analytics',
  'Software Engineering',
]

type FormState = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>

const empty: FormState = {
  title: '',
  repo: '',
  period: '',
  category: '',
  section: SECTIONS[0],
  description: '',
  highlights: [],
  stack: [],
  stars: undefined,
  license: '',
  language: '',
  links: [],
  order: 0,
}

export default function AdminProjectEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = !id

  const [form, setForm] = useState<FormState>(empty)
  const [highlightsText, setHighlightsText] = useState('')
  const [stackText, setStackText] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState('')
  const [loadingData, setLoadingData] = useState(!!id)

  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    if (!isNew && id) {
      adminApi.getProject(id)
        .then((p) => {
          setForm({
            title: p.title,
            repo: p.repo,
            period: p.period,
            category: p.category,
            section: p.section,
            description: p.description,
            highlights: p.highlights,
            stack: p.stack,
            stars: p.stars,
            license: p.license || '',
            language: p.language || '',
            links: p.links,
            order: p.order,
          })
          setHighlightsText(p.highlights.join('\n'))
          setStackText(p.stack.join(', '))
        })
        .catch(() => setError('Failed to load project.'))
        .finally(() => setLoadingData(false))
    }
  }, [id])

  const set = (field: keyof FormState, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const addLink = () =>
    setForm((prev) => ({
      ...prev,
      links: [...prev.links, { label: 'GitHub', url: '', icon: 'github' as const }],
    }))

  const updateLink = (i: number, field: keyof ProjectLink, value: string) =>
    setForm((prev) => {
      const links = [...prev.links]
      links[i] = { ...links[i], [field]: value }
      return { ...prev, links }
    })

  const removeLink = (i: number) =>
    setForm((prev) => ({
      ...prev,
      links: prev.links.filter((_, idx) => idx !== i),
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...form,
      highlights: highlightsText.split('\n').map((s) => s.trim()).filter(Boolean),
      stack: stackText.split(',').map((s) => s.trim()).filter(Boolean),
    }

    try {
      if (isNew) {
        await adminApi.createProject(payload)
      } else {
        await adminApi.updateProject(id!, payload)
      }
      navigate('/admin/projects')
    } catch {
      setError('Failed to save project.')
    } finally {
      setSaving(false)
    }
  }

  async function handleImageUpload(file: File) {
    if (!file) return
    setError('')
    setUploadingImage(true)
    try {
      const { url } = await adminApi.uploadFile(file)

      const ta = descriptionRef.current
      const start = ta ? ta.selectionStart : form.description?.length || 0
      const end = ta ? ta.selectionEnd : form.description?.length || 0
      const text = form.description || ''
      const markdownImage = `\n![${file.name}](${url})\n`

      const newDesc = text.substring(0, start) + markdownImage + text.substring(end)
      set('description', newDesc)

      setTimeout(() => {
        if (descriptionRef.current) {
          descriptionRef.current.focus()
          descriptionRef.current.setSelectionRange(start + markdownImage.length, start + markdownImage.length)
        }
      }, 10)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  if (loadingData) return <div className="loading-screen"><div className="spinner" /></div>

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <Link to="/admin/projects" className="admin-back-link">
              <ArrowLeft size={16} /> Projects
            </Link>
            <h1 className="admin-page-title">
              {isNew ? 'New Project' : 'Edit Project'}
            </h1>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {error && <div className="admin-error">{error}</div>}

        <form className="admin-form" onSubmit={handleSubmit}>
          {/* ── Basic Info ─────────────────────────────── */}
          <div className="admin-form-section">
            <h3>Basic Info</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="period">Period *</label>
                <input
                  id="period"
                  type="text"
                  required
                  value={form.period}
                  onChange={(e) => set('period', e.target.value)}
                  placeholder="e.g. 2024–2025"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="section">Section *</label>
                <select
                  id="section"
                  value={form.section}
                  onChange={(e) => set('section', e.target.value)}
                >
                  {SECTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="__custom__">Other (type below)</option>
                </select>
                {form.section === '__custom__' && (
                  <input
                    type="text"
                    placeholder="Custom section name"
                    onChange={(e) => set('section', e.target.value)}
                    style={{ marginTop: 6 }}
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <input
                  id="category"
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  placeholder="e.g. MSc Thesis, Applied AI"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="repo">GitHub Repo (name only)</label>
                <input
                  id="repo"
                  type="text"
                  value={form.repo}
                  onChange={(e) => set('repo', e.target.value)}
                  placeholder="e.g. chatbot"
                />
              </div>
              <div className="form-group">
                <label htmlFor="order">Sort Order</label>
                <input
                  id="order"
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => set('order', Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* ── Meta ───────────────────────────────────── */}
          <div className="admin-form-section">
            <h3>Meta</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <input
                  id="language"
                  type="text"
                  value={form.language}
                  onChange={(e) => set('language', e.target.value)}
                  placeholder="e.g. Python, TypeScript"
                />
              </div>
              <div className="form-group">
                <label htmlFor="license">License</label>
                <input
                  id="license"
                  type="text"
                  value={form.license}
                  onChange={(e) => set('license', e.target.value)}
                  placeholder="e.g. MIT, Apache-2.0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stars">Stars</label>
                <input
                  id="stars"
                  type="number"
                  min={0}
                  value={form.stars ?? ''}
                  onChange={(e) =>
                    set('stars', e.target.value === '' ? undefined : Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>

          {/* ── Description ────────────────────────────── */}
          <div className="admin-form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ marginBottom: 0 }}>Description *</h3>
              <div style={{ position: 'relative' }}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleImageUpload(e.target.files[0])
                      e.target.value = ''
                    }
                  }}
                  title="Insert Image into Description"
                />
                <button type="button" className="btn btn-outline btn-sm" disabled={uploadingImage} style={{ padding: '0.35rem 0.6rem' }}>
                  {uploadingImage ? <Loader2 size={16} className="spinner-small" /> : <ImagePlus size={16} />}
                  <span style={{ marginLeft: '0.25rem' }}>Insert Image</span>
                </button>
              </div>
            </div>
            <div className="form-group">
              <textarea
                ref={descriptionRef}
                required
                rows={10}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Project description (Markdown supported)"
              />
            </div>
          </div>

          {/* ── Highlights ─────────────────────────────── */}
          <div className="admin-form-section">
            <h3>Highlights</h3>
            <p className="admin-form-hint">One highlight per line</p>
            <div className="form-group">
              <textarea
                rows={5}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="Feature or achievement&#10;Another highlight&#10;..."
              />
            </div>
          </div>

          {/* ── Tech Stack ─────────────────────────────── */}
          <div className="admin-form-section">
            <h3>Tech Stack</h3>
            <p className="admin-form-hint">Comma-separated</p>
            <div className="form-group">
              <input
                type="text"
                value={stackText}
                onChange={(e) => setStackText(e.target.value)}
                placeholder="Python, PyTorch, PostgreSQL"
              />
            </div>
          </div>

          {/* ── Links ──────────────────────────────────── */}
          <div className="admin-form-section">
            <div className="admin-form-section-header">
              <h3>Links</h3>
              <button type="button" className="btn btn-sm btn-outline" onClick={addLink}>
                <Plus size={14} /> Add Link
              </button>
            </div>

            {form.links.map((link, i) => (
              <div key={i} className="admin-link-row">
                <select
                  value={link.icon}
                  onChange={(e) => updateLink(i, 'icon', e.target.value)}
                >
                  <option value="github">GitHub</option>
                  <option value="external">External</option>
                </select>
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => updateLink(i, 'label', e.target.value)}
                  placeholder="Label"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(i, 'url', e.target.value)}
                  placeholder="https://..."
                  style={{ flex: 2 }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => removeLink(i)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* ── Submit ─────────────────────────────────── */}
          <div className="admin-form-actions">
            <Link to="/admin/projects" className="btn btn-outline">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create Project' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
