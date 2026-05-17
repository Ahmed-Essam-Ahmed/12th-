import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(authService.getCurrentUser())
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const u = await authService.login(email, password)
    setUser(u)
    return u
  }

  const register = async (data) => {
    const u = await authService.register(data)
    setUser(u)
    return u
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  if (loading) return null

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}