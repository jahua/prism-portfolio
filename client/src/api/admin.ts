import type { Blog, Profile, Project } from '../types'

const BASE = '/api'

function getToken(): string | null {
  return sessionStorage.getItem('admin_token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export function logout() {
  sessionStorage.removeItem('admin_token')
}

async function authRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  if (!token) throw new Error('Not authenticated')

  const res = await fetch(`${BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  })
  if (res.status === 401 || res.status === 403) {
    logout()
    throw new Error('Session expired')
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const adminApi = {
  login: async (password: string): Promise<boolean> => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) return false
    const { token } = await res.json()
    sessionStorage.setItem('admin_token', token)
    return true
  },

  getAllBlogs: () => authRequest<Blog[]>('/blogs/all'),

  getBlog: (slug: string) => authRequest<Blog>(`/blogs/${slug}`),

  createBlog: (data: Partial<Blog>) =>
    authRequest<Blog>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateBlog: (id: string, data: Partial<Blog>) =>
    authRequest<Blog>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteBlog: (id: string) =>
    authRequest<{ message: string }>(`/blogs/${id}`, {
      method: 'DELETE',
    }),

  getProfile: () => authRequest<Profile>('/profile'),

  updateProfile: (data: Partial<Profile>) =>
    authRequest<Profile>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAllProjects: () => authRequest<Project[]>('/projects/all'),

  getProject: (id: string) => authRequest<Project>(`/projects/${id}`),

  createProject: (data: Partial<Project>) =>
    authRequest<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProject: (id: string, data: Partial<Project>) =>
    authRequest<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProject: (id: string) =>
    authRequest<{ message: string }>(`/projects/${id}`, {
      method: 'DELETE',
    }),

  uploadFile: async (file: File): Promise<{ url: string }> => {
    const token = getToken()
    if (!token) throw new Error('Not authenticated')

    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${BASE}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error || 'Failed to upload image')
    }
    
    return res.json()
  },
}
