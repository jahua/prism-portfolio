import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { useI18n } from '../i18n/context'
import type { Blog } from '../types'

interface Props {
  blog: Blog
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogCard({ blog }: Props) {
  const { t } = useI18n()

  return (
    <article className="blog-card">
      {blog.coverImage && (
        <div className="blog-card-image">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
      )}
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-date">
            <Calendar size={14} />
            {formatDate(blog.createdAt)}
          </span>
        </div>
        <h3 className="blog-card-title">
          <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h3>
        <p className="blog-card-summary">{blog.summary}</p>
        <div className="blog-card-footer">
          <div className="blog-card-tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/blogs/${blog.slug}`} className="read-more">
            {t('blog.read_more')} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
