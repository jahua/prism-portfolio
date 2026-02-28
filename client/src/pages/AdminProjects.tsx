import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit2, Trash2, ArrowLeft, Github, ExternalLink } from 'lucide-react'
import { adminApi, isAuthenticated, logout } from '../api/admin'
import type { Project } from '../types'

export default function AdminProjects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin')
      return
    }
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await adminApi.getAllProjects()
      setProjects(data)
    } catch {
      setError('Failed to load projects.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    try {
      await adminApi.deleteProject(id)
      setProjects((prev) => prev.filter((p) => p._id !== id))
    } catch {
      setError('Failed to delete project.')
    } finally {
      setDeleting(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  // Group by section
  const sections = Array.from(new Set(projects.map((p) => p.section)))

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <Link to="/admin/dashboard" className="admin-back-link">
              <ArrowLeft size={16} /> Dashboard
            </Link>
            <h1 className="admin-page-title">Projects</h1>
          </div>
          <div className="admin-header-right">
            <Link to="/admin/projects/new" className="btn btn-primary">
              <Plus size={16} /> New Project
            </Link>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {error && <div className="admin-error">{error}</div>}

        {projects.length === 0 ? (
          <div className="admin-empty">
            <p>No projects yet.</p>
            <Link to="/admin/projects/new" className="btn btn-primary">
              <Plus size={16} /> Create First Project
            </Link>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section} className="admin-section-group">
              <h2 className="admin-section-heading">{section}</h2>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Period</th>
                      <th>Stack</th>
                      <th>Links</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects
                      .filter((p) => p.section === section)
                      .map((project) => (
                        <tr key={project._id}>
                          <td>
                            <strong>{project.title}</strong>
                            {project.repo && (
                              <div className="admin-table-sub">{project.repo}</div>
                            )}
                          </td>
                          <td>
                            <span className="tag">{project.category}</span>
                          </td>
                          <td>{project.period}</td>
                          <td>
                            <div className="admin-stack-pills">
                              {project.stack.slice(0, 3).map((s) => (
                                <span key={s} className="tag tag-sm">{s}</span>
                              ))}
                              {project.stack.length > 3 && (
                                <span className="tag tag-sm">+{project.stack.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="admin-link-icons">
                              {project.links.map((l) => (
                                <a
                                  key={l.url}
                                  href={l.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  title={l.label}
                                >
                                  {l.icon === 'github' ? <Github size={14} /> : <ExternalLink size={14} />}
                                </a>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="admin-actions">
                              <Link
                                to={`/admin/projects/${project._id}`}
                                className="btn btn-sm btn-outline"
                              >
                                <Edit2 size={14} /> Edit
                              </Link>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(project._id, project.title)}
                                disabled={deleting === project._id}
                              >
                                <Trash2 size={14} />
                                {deleting === project._id ? '...' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}
