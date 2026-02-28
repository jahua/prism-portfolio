import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import About from '../components/About'
import BlogCard from '../components/BlogCard'
import { api } from '../api/client'
import { useI18n } from '../i18n/context'
import type { Profile, Blog } from '../types'

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useI18n()

  useEffect(() => {
    async function load() {
      try {
        const [prof, blogRes] = await Promise.all([
          api.getProfile(),
          api.getBlogs(1, 3),
        ])
        setProfile(prof)
        setBlogs(blogRes.blogs)
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>{t('common.welcome')}</h2>
        <p><code>{t('common.seed_hint')}</code></p>
      </div>
    )
  }

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />

      {blogs.length > 0 && (
        <section className="section" id="latest-blogs">
          <div className="container">
            <h2 className="section-title">{t('blog.latest')}</h2>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            <div className="section-action">
              <Link to="/blogs" className="btn btn-outline">
                {t('blog.view_all')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
