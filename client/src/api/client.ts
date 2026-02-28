import type { Profile, BlogListResponse, Blog, Project, ContactForm } from '../types'

const BASE = '/api'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

export const api = {
  getProfile: () => request<Profile>('/profile'),

  getBlogs: (page = 1, limit = 10, tag?: string) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    if (tag) params.set('tag', tag)
    return request<BlogListResponse>(`/blogs?${params}`)
  },

  getBlog: (slug: string) => request<Blog>(`/blogs/${slug}`),

  getProjects: () => request<Project[]>('/projects'),

  sendMessage: (data: ContactForm) =>
    request<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}
