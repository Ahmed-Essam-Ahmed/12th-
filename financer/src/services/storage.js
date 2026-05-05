export const KEYS = {
  USERS:        'mz_users',
  CURRENT_USER: 'mz_current_user',
  TRANSACTIONS: 'mz_transactions',
  CATEGORIES:   'mz_categories',
  GOALS:        'mz_goals',
  BUDGETS:      'mz_budgets',
}

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch { return null }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
  remove: (key) => localStorage.removeItem(key),
}