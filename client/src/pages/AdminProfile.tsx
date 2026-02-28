import { useState, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import { adminApi, isAuthenticated } from '../api/admin'
import type { Profile } from '../types'

export default function AdminProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Partial<Profile>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    adminApi
      .getProfile()
      .then(setForm)
      .catch(() => setForm({}))
      .finally(() => setLoading(false))
  }, [navigate])

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSocialChange(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...(prev.socialLinks || {}), [field]: value },
    }))
  }

  function handleAcademicChange(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      academicProfiles: { ...(prev.academicProfiles || {}), [field]: value },
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      const updated = await adminApi.updateProfile(form)
      setForm(updated)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  // Generic array handlers
  function handleArrayChange<K extends keyof Profile>(
    field: K,
    index: number,
    subField: string,
    value: any
  ) {
    setForm((prev) => {
      const arr: any[] = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : []
      if (!arr[index]) arr[index] = {}
      arr[index] = { ...arr[index], [subField]: value }
      return { ...prev, [field]: arr }
    })
  }

  function addArrayItem<K extends keyof Profile>(field: K, emptyItem: any) {
    setForm((prev) => {
      const arr = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : []
      arr.push(emptyItem)
      return { ...prev, [field]: arr }
    })
  }

  function removeArrayItem<K extends keyof Profile>(field: K, index: number) {
    setForm((prev) => {
      const arr = Array.isArray(prev[field]) ? [...(prev[field] as any[])] : []
      arr.splice(index, 1)
      return { ...prev, [field]: arr }
    })
  }

  const [uploadingPdf, setUploadingPdf] = useState(false)
  async function handlePdfUpload(file: File) {
    if (!file) return
    setError('')
    setUploadingPdf(true)
    try {
      const { url } = await adminApi.uploadFile(file)
      handleChange('cvUrl', url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload PDF')
    } finally {
      setUploadingPdf(false)
    }
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
      <div className="container container-narrow">
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/admin/blogs')}
              className="btn btn-ghost"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="page-title">Edit Profile</h1>
          </div>
        </div>

        {success && (
          <div className="status-card success compact" style={{ marginBottom: '1.5rem' }}>
            Profile saved successfully!
          </div>
        )}
        {error && (
          <div className="status-card error compact" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <fieldset className="admin-fieldset">
            <legend>Basic Information</legend>
            <div className="admin-form-grid">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title / Tagline</label>
                <input
                  id="title"
                  type="text"
                  value={form.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  rows={5}
                  value={form.bio || ''}
                  onChange={(e) => handleChange('bio', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="motto">Motto</label>
                <input
                  id="motto"
                  type="text"
                  value={form.motto || ''}
                  onChange={(e) => handleChange('motto', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="avatar">Avatar URL</label>
                <input
                  id="avatar"
                  type="text"
                  value={form.avatar || ''}
                  onChange={(e) => handleChange('avatar', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>CV PDF URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    id="cvUrl"
                    type="text"
                    value={form.cvUrl || ''}
                    onChange={(e) => handleChange('cvUrl', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      accept="application/pdf"
                      style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                      onChange={(e) => {
                        if (e.target.files) {
                          handlePdfUpload(e.target.files[0])
                          e.target.value = ''
                        }
                      }}
                      title="Upload PDF CV"
                    />
                    <button type="button" className="btn btn-outline" disabled={uploadingPdf}>
                      {uploadingPdf ? 'Uploading...' : 'Upload PDF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="admin-fieldset">
            <legend>Research Profile</legend>
            <div className="admin-form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="researchProfile">Research Summary</label>
                <textarea
                  id="researchProfile"
                  rows={4}
                  value={form.researchProfile || ''}
                  onChange={(e) => handleChange('researchProfile', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="researchInterests">Research Interests (Comma separated)</label>
                <input
                  id="researchInterests"
                  type="text"
                  value={form.researchInterests?.join(', ') || ''}
                  onChange={(e) => {
                    const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setForm(prev => ({ ...prev, researchInterests: val }));
                  }}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="admin-fieldset">
            <div className="admin-form-section-header" style={{ marginBottom: '1rem' }}>
              <legend style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Education</legend>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('education', { degree: '', meta: '', thesis: '', supervisor: '' })}>
                Add Education
              </button>
            </div>
            {form.education?.map((edu, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', i, 'degree', e.target.value)} style={{ flex: 1 }} />
                  <input type="text" placeholder="Meta Data (University, Years)" value={edu.meta} onChange={(e) => handleArrayChange('education', i, 'meta', e.target.value)} style={{ flex: 1 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeArrayItem('education', i)}>Remove</button>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input type="text" placeholder="Thesis (Optional)" value={edu.thesis || ''} onChange={(e) => handleArrayChange('education', i, 'thesis', e.target.value)} style={{ flex: 2 }} />
                  <input type="text" placeholder="Supervisor (Optional)" value={edu.supervisor || ''} onChange={(e) => handleArrayChange('education', i, 'supervisor', e.target.value)} style={{ flex: 1 }} />
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset className="admin-fieldset">
            <div className="admin-form-section-header" style={{ marginBottom: '1rem' }}>
              <legend style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Experience</legend>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('experience', { role: '', meta: '', responsibilities: [] })}>
                Add Experience
              </button>
            </div>
            {form.experience?.map((exp, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange('experience', i, 'role', e.target.value)} style={{ flex: 1 }} />
                  <input type="text" placeholder="Meta Data (Company, Dates)" value={exp.meta} onChange={(e) => handleArrayChange('experience', i, 'meta', e.target.value)} style={{ flex: 1 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeArrayItem('experience', i)}>Remove</button>
                </div>
                <textarea
                  placeholder="Responsibilities (One per line)"
                  rows={3}
                  value={exp.responsibilities?.join('\n') || ''}
                  onChange={(e) => handleArrayChange('experience', i, 'responsibilities', e.target.value.split('\n').filter(Boolean))}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </fieldset>

          <fieldset className="admin-fieldset">
            <div className="admin-form-section-header" style={{ marginBottom: '1rem' }}>
              <legend style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Publications</legend>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('publications', { badge: '', title: '', meta: '' })}>
                Add Publication
              </button>
            </div>
            {form.publications?.map((pub, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Badge (e.g. In Preparation, 2024)" value={pub.badge} onChange={(e) => handleArrayChange('publications', i, 'badge', e.target.value)} style={{ width: '150px' }} />
                  <input type="text" placeholder="Title" value={pub.title} onChange={(e) => handleArrayChange('publications', i, 'title', e.target.value)} style={{ flex: 2 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeArrayItem('publications', i)}>Remove</button>
                </div>
                <input type="text" placeholder="Meta Data (Authors, Location)" value={pub.meta} onChange={(e) => handleArrayChange('publications', i, 'meta', e.target.value)} style={{ width: '100%' }} />
              </div>
            ))}
          </fieldset>

          <fieldset className="admin-fieldset">
            <div className="admin-form-section-header" style={{ marginBottom: '1rem' }}>
              <legend style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Skills</legend>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('skills', { category: '', items: [] })}>
                Add Skill Category
              </button>
            </div>
            {form.skills?.map((skill, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Category (e.g. Agentic Workflows)" value={skill.category} onChange={(e) => handleArrayChange('skills', i, 'category', e.target.value)} style={{ flex: 1 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeArrayItem('skills', i)}>Remove</button>
                </div>
                <input
                  type="text"
                  placeholder="Items (Comma separated)"
                  value={skill.items?.join(', ') || ''}
                  onChange={(e) => handleArrayChange('skills', i, 'items', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </fieldset>

          <fieldset className="admin-fieldset">
            <div className="admin-form-section-header" style={{ marginBottom: '1rem' }}>
              <legend style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Certifications</legend>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('certifications', { title: '', meta: '' })}>
                Add Certification
              </button>
            </div>
            {form.certifications?.map((cert, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Title" value={cert.title} onChange={(e) => handleArrayChange('certifications', i, 'title', e.target.value)} style={{ flex: 2 }} />
                  <input type="text" placeholder="Meta Data (Code · Date)" value={cert.meta} onChange={(e) => handleArrayChange('certifications', i, 'meta', e.target.value)} style={{ flex: 1 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeArrayItem('certifications', i)}>Remove</button>
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset className="admin-fieldset">
            <div className="admin-form-section-header" style={{ marginBottom: '1rem' }}>
              <legend style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>Languages</legend>
              <button type="button" className="btn btn-sm btn-outline" onClick={() => addArrayItem('languages', { name: '', proficiency: '' })}>
                Add Language
              </button>
            </div>
            {form.languages?.map((lang, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                  <input type="text" placeholder="Language (e.g. English)" value={lang.name} onChange={(e) => handleArrayChange('languages', i, 'name', e.target.value)} style={{ flex: 1 }} />
                  <input type="text" placeholder="Proficiency (e.g. Native)" value={lang.proficiency} onChange={(e) => handleArrayChange('languages', i, 'proficiency', e.target.value)} style={{ flex: 2 }} />
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeArrayItem('languages', i)}>Remove</button>
                </div>
              </div>
            ))}
          </fieldset>

          <fieldset className="admin-fieldset">
            <legend>Social Links</legend>
            <div className="admin-form-grid">
              {(['github', 'linkedin', 'twitter', 'email', 'instagram'] as const).map(
                (field) => (
                  <div className="form-group" key={field}>
                    <label htmlFor={`social-${field}`}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={`social-${field}`}
                      type="text"
                      value={form.socialLinks?.[field] || ''}
                      onChange={(e) => handleSocialChange(field, e.target.value)}
                      placeholder={field === 'email' ? 'you@example.com' : 'https://...'}
                    />
                  </div>
                )
              )}
            </div>
          </fieldset>

          <fieldset className="admin-fieldset">
            <legend>Academic Profiles</legend>
            <div className="admin-form-grid">
              {(
                [
                  ['googleScholar', 'Google Scholar'],
                  ['researchGate', 'ResearchGate'],
                  ['dblp', 'DBLP'],
                  ['orcid', 'ORCID'],
                ] as const
              ).map(([field, label]) => (
                <div className="form-group" key={field}>
                  <label htmlFor={`academic-${field}`}>{label}</label>
                  <input
                    id={`academic-${field}`}
                    type="text"
                    value={form.academicProfiles?.[field] || ''}
                    onChange={(e) => handleAcademicChange(field, e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="admin-form-actions">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/admin/blogs')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
