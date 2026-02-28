import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { api } from '../api/client'
import { useI18n } from '../i18n/context'
import type { Blog } from '../types'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { t } = useI18n()

  useEffect(() => {
    async function load() {
      if (!slug) return
      try {
        const data = await api.getBlog(slug)
        setBlog(data)
      } catch {
        setError(t('blog.not_found'))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug, t])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <section className="section page-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>{error || t('blog.not_found')}</h2>
          <Link to="/blogs" className="btn btn-outline" style={{ marginTop: '1rem' }}>
            <ArrowLeft size={18} /> {t('blog.back')}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="section page-section">
      <div className="container container-narrow">
        <Link to="/blogs" className="back-link">
          <ArrowLeft size={18} /> {t('blog.back')}
        </Link>

        <article className="blog-article">
          <header className="blog-article-header">
            <h1>{blog.title}</h1>
            <div className="blog-article-meta">
              <span>
                <Calendar size={16} />
                {formatDate(blog.createdAt)}
              </span>
              {blog.tags.length > 0 && (
                <span className="blog-article-tags">
                  <Tag size={16} />
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className="tag"
                    >
                      {tag}
                    </Link>
                  ))}
                </span>
              )}
            </div>
          </header>

          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="blog-article-cover"
            />
          )}

          <div className="blog-article-content prose">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </section>
  )
}
