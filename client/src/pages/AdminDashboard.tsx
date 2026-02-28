import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, FolderGit2, User, LogOut } from 'lucide-react'
import { isAuthenticated, logout } from '../api/admin'

const TILES = [
  {
    to: '/admin/blogs',
    icon: FileText,
    title: 'Blog Posts',
    desc: 'Create, edit, and delete articles',
    color: 'var(--accent)',
  },
  {
    to: '/admin/projects',
    icon: FolderGit2,
    title: 'Projects',
    desc: 'Manage research and software projects',
    color: '#10b981',
  },
  {
    to: '/admin/profile',
    icon: User,
    title: 'Profile / CV',
    desc: 'Update bio, links, and academic profile',
    color: '#6366f1',
  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin')
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-page-title">Admin Dashboard</h1>
          <button className="btn btn-outline" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-dashboard-grid">
          {TILES.map(({ to, icon: Icon, title, desc, color }) => (
            <Link key={to} to={to} className="admin-dashboard-tile">
              <div className="admin-tile-icon" style={{ color }}>
                <Icon size={32} />
              </div>
              <h2 className="admin-tile-title">{title}</h2>
              <p className="admin-tile-desc">{desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
