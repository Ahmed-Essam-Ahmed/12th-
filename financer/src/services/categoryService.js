import { storage, KEYS } from './storage'
import { DEFAULT_CATEGORIES } from '../data/seedData'

export const categoryService = {
  getAll: (userId) => {
    const all = storage.get(KEYS.CATEGORIES) || {}
    if (!all[userId]) {
      all[userId] = DEFAULT_CATEGORIES
      storage.set(KEYS.CATEGORIES, all)
    }
    return all[userId]
  },

  add: (userId, category) => {
    const all = storage.get(KEYS.CATEGORIES) || {}
    const newCat = { id: `cat_${Date.now()}`, ...category }
    all[userId] = [...(all[userId] || []), newCat]
    storage.set(KEYS.CATEGORIES, all)
    return newCat
  },

  update: (userId, categoryId, updates) => {
    const all = storage.get(KEYS.CATEGORIES) || {}
    all[userId] = (all[userId] || []).map((c) =>
      c.id === categoryId ? { ...c, ...updates } : c
    )
    storage.set(KEYS.CATEGORIES, all)
  },

  delete: (userId, categoryId) => {
    const all = storage.get(KEYS.CATEGORIES) || {}
    all[userId] = (all[userId] || []).filter((c) => c.id !== categoryId)
    storage.set(KEYS.CATEGORIES, all)
  },
}