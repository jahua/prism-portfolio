import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, AlertCircle } from 'lucide-react'
import { adminApi } from '../api/admin'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const ok = await adminApi.login(password)
    setLoading(false)

    if (ok) {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid password')
    }
  }

  return (
    <section className="section page-section">
      <div className="container" style={{ maxWidth: 420, paddingTop: '4rem' }}>
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <Lock size={32} />
          </div>
          <h1 className="admin-login-title">Admin Login</h1>

          {error && (
            <div className="status-card error compact">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                autoFocus
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
