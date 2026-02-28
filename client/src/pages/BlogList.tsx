import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import { api } from '../api/client'
import { useI18n } from '../i18n/context'
import type { Blog } from '../types'

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')
  const currentTag = searchParams.get('tag') || undefined
  const { t } = useI18n()

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await api.getBlogs(currentPage, 9, currentTag)
        setBlogs(res.blogs)
        setTotalPages(res.pagination.pages)
      } catch (err) {
        console.error('Failed to load blogs:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [currentPage, currentTag])

  function goToPage(page: number) {
    const params: Record<string, string> = { page: String(page) }
    if (currentTag) params.tag = currentTag
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="section page-section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{t('blog.title')}</h1>
          <p className="page-subtitle">{t('blog.subtitle')}</p>
        </div>

        {currentTag && (
          <div className="active-filter">
            {t('blog.filtered_by')} <span className="tag">{currentTag}</span>
            <button
              onClick={() => setSearchParams({})}
              className="clear-filter"
            >
              {t('blog.clear')}
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading-screen">
            <div className="spinner" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <p>{t('blog.no_posts')}</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  disabled={currentPage <= 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <ChevronLeft size={18} /> {t('blog.previous')}
                </button>
                <span className="pagination-info">
                  {t('blog.page_of', {
                    page: String(currentPage),
                    total: String(totalPages),
                  })}
                </span>
                <button
                  className="pagination-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  {t('blog.next')} <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
