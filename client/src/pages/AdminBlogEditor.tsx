import { useState, useEffect, type FormEvent, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Save, ArrowLeft, Eye, ImagePlus, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { adminApi, isAuthenticated } from '../api/admin'
import { api } from '../api/client'
import type { Blog } from '../types'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const EMPTY: Partial<Blog> = {
  title: '',
  slug: '',
  summary: '',
  content: '',
  coverImage: '',
  tags: [],
  published: false,
}

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState<Partial<Blog>>(EMPTY)
  const [tagsInput, setTagsInput] = useState('')
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [error, setError] = useState('')

  const contentRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    if (isEdit && id) {
      adminApi
        .getAllBlogs()
        .then((blogs) => {
          const blog = blogs.find((b) => b._id === id)
          if (!blog) throw new Error('Not found')
          return api.getBlog(blog.slug).catch(() => blog)
        })
        .then((blog) => {
          setForm(blog)
          setTagsInput((blog.tags || []).join(', '))
        })
        .catch(() => {
          setError('Blog not found')
        })
        .finally(() => setLoading(false))
    }
  }, [id, isEdit, navigate])

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'title' && !isEdit) {
      setForm((prev) => ({ ...prev, slug: slugify(value as string) }))
    }
  }

  function handleTagsChange(value: string) {
    setTagsInput(value)
    const tags = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    setForm((prev) => ({ ...prev, tags }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (isEdit && id) {
        await adminApi.updateBlog(id, form)
      } else {
        await adminApi.createBlog(form)
      }
      navigate('/admin/blogs')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleImageUpload(file: File, isCover: boolean = false) {
    if (!file) return
    setError('')
    setUploadingImage(true)
    try {
      const { url } = await adminApi.uploadFile(file)

      if (isCover) {
        handleChange('coverImage', url)
      } else {
        // Insert markdown image syntax at cursor position or end of content
        const ta = contentRef.current
        const start = ta ? ta.selectionStart : form.content?.length || 0
        const end = ta ? ta.selectionEnd : form.content?.length || 0
        const text = form.content || ''
        const markdownImage = `\n![${file.name}](${url})\n`

        const newContent = text.substring(0, start) + markdownImage + text.substring(end)
        handleChange('content', newContent)

        // Reset focus to textarea after a short delay
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.focus()
            contentRef.current.setSelectionRange(start + markdownImage.length, start + markdownImage.length)
          }
        }, 10)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setUploadingImage(false)
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
      <div className="container">
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/admin/blogs')}
              className="btn btn-ghost"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="page-title">
              {isEdit ? 'Edit Post' : 'New Post'}
            </h1>
          </div>
          <div className="admin-header-actions">
            <button
              onClick={() => setPreview(!preview)}
              className={`btn ${preview ? 'btn-primary' : 'btn-outline'}`}
            >
              <Eye size={18} /> {preview ? 'Edit' : 'Preview'}
            </button>
          </div>
        </div>

        {error && (
          <div className="status-card error compact" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {preview ? (
          <div className="admin-preview">
            <h1>{form.title || 'Untitled'}</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              {form.summary}
            </p>
            <div className="prose">
              <ReactMarkdown>{form.content || ''}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="title">Title *</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={form.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Blog post title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug">Slug *</label>
                <input
                  id="slug"
                  type="text"
                  required
                  value={form.slug || ''}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  value={tagsInput}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="AI, LLM, Tutorial"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="summary">Summary *</label>
                <textarea
                  id="summary"
                  required
                  rows={2}
                  value={form.summary || ''}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  placeholder="Brief description of the post"
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="coverImage">Cover Image URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    id="coverImage"
                    type="text"
                    value={form.coverImage || ''}
                    onChange={(e) => handleChange('coverImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    style={{ flex: 1 }}
                  />
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      id="coverImageUpload"
                      accept="image/*"
                      style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files[0], true)}
                      title="Upload Cover Image"
                    />
                    <button type="button" className="btn btn-outline" disabled={uploadingImage}>
                      {uploadingImage ? <Loader2 size={18} className="spinner-small" /> : <ImagePlus size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label htmlFor="content" style={{ marginBottom: 0 }}>Content (Markdown) *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }}
                      onChange={(e) => {
                        if (e.target.files) {
                          handleImageUpload(e.target.files[0], false)
                          e.target.value = '' // Reset input after upload
                        }
                      }}
                      title="Insert Image into Content"
                    />
                    <button type="button" className="btn btn-outline btn-sm" disabled={uploadingImage} style={{ padding: '0.35rem 0.6rem' }}>
                      {uploadingImage ? <Loader2 size={16} className="spinner-small" /> : <ImagePlus size={16} />}
                      <span style={{ marginLeft: '0.25rem' }}>Insert Image</span>
                    </button>
                  </div>
                </div>
                <textarea
                  id="content"
                  ref={contentRef}
                  required
                  rows={20}
                  value={form.content || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="# Your blog post content in Markdown..."
                  className="admin-content-editor"
                />
              </div>

              <div className="form-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={form.published || false}
                    onChange={(e) => handleChange('published', e.target.checked)}
                  />
                  <span>Published</span>
                </label>
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/admin/blogs')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
