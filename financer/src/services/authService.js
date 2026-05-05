import { storage, KEYS } from './storage'

export const authService = {
  register: ({ name, email, password }) => {
    const users = storage.get(KEYS.USERS) || []
    if (users.find((u) => u.email === email)) {
      throw new Error('This email is already registered.')
    }
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    }
    storage.set(KEYS.USERS, [...users, newUser])
    const { password: _, ...safe } = newUser
    storage.set(KEYS.CURRENT_USER, safe)
    return safe
  },

  login: (email, password) => {
    const users = storage.get(KEYS.USERS) || []
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    const { password: _, ...safe } = user
    storage.set(KEYS.CURRENT_USER, safe)
    return safe
  },

  logout: () => storage.remove(KEYS.CURRENT_USER),

  getCurrentUser: () => storage.get(KEYS.CURRENT_USER),
}