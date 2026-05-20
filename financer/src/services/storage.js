export const storage = {
  getToken: () => localStorage.getItem('mz_token'),
  getUser: () => {
    const u = localStorage.getItem('mz_user')
    return u ? JSON.parse(u) : null
  },
  setToken: (token) => localStorage.setItem('mz_token', token),
  setUser: (user) => localStorage.setItem('mz_user', JSON.stringify(user)),
  clear: () => {
    localStorage.removeItem('mz_token')
    localStorage.removeItem('mz_user')
  },
}