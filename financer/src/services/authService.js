import { api } from './api'

export const authService = {
  register: async ({ name, email, password }) => {
    const data = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('mz_token', data.token)
    localStorage.setItem('mz_user',  JSON.stringify(data.user))
    return data.user
  },

  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    localStorage.setItem('mz_token', data.token)
    localStorage.setItem('mz_user',  JSON.stringify(data.user))
    return data.user
  },

  logout: () => {
    localStorage.removeItem('mz_token')
    localStorage.removeItem('mz_user')
  },

  getCurrentUser: () => {
    const u = localStorage.getItem('mz_user')
    return u ? JSON.parse(u) : null
  },
}