import { api } from './api'
import { storage } from './storage'

export const authService = {
  register: async ({ name, email, password }) => {
    const data = await api.post('/auth/register', { name, email, password })
    storage.setToken(data.token)
    storage.setUser(data.user)
    return data.user
  },

  login: async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    storage.setToken(data.token)
    storage.setUser(data.user)
    return data.user
  },

  logout: () => storage.clear(),

  getCurrentUser: () => storage.getUser(),
}