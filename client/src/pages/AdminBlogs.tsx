import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut } from 'lucide-react'
import { adminApi, isAuthenticated, logout } from '../api/admin'
import type { Blog } from '../types'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    adminApi
      .getAllBlogs()
      .then(setBlogs)
      .catch(() => navigate('/admin'))
      .finally(() => setLoading(false))
  }, [navigate])

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      await adminApi.deleteBlog(id)
      setBlogs((prev) => prev.filter((b) => b._id !== id))
    } catch (err) {
      alert('Failed to delete')
    }
  }

  async function handleTogglePublish(blog: Blog) {
    try {
      const updated = await adminApi.updateBlog(blog._id, {
        published: !blog.published,
      })
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? updated : b))
      )
    } catch (err) {
      alert('Failed to update')
    }
  }

  function handleLogout() {
    logout()
    navigate('/admin')
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
          <div>
            <h1 className="page-title">Blog Management</h1>
            <p className="page-subtitle">{blogs.length} posts total</p>
          </div>
          <div className="admin-header-actions">
            <Link to="/admin/profile" className="btn btn-outline">
              Edit Profile
            </Link>
            <Link to="/admin/blogs/new" className="btn btn-primary">
              <Plus size={18} /> New Post
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <strong>{blog.title}</strong>
                    <span className="admin-slug">/{blog.slug}</span>
                  </td>
                  <td>
                    <button
                      className={`admin-status-badge ${blog.published ? 'published' : 'draft'}`}
                      onClick={() => handleTogglePublish(blog)}
                      title={blog.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {blog.published ? (
                        <><Eye size={12} /> Published</>
                      ) : (
                        <><EyeOff size={12} /> Draft</>
                      )}
                    </button>
                  </td>
                  <td>
                    <div className="admin-tags">
                      {blog.tags.slice(0, 3).map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="tag">+{blog.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="admin-date">{formatDate(blog.createdAt)}</td>
                  <td>
                    <div className="admin-actions">
                      <Link
                        to={`/admin/blogs/edit/${blog._id}`}
                        className="admin-action-btn edit"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => handleDelete(blog._id, blog.title)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                    No blog posts yet. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
