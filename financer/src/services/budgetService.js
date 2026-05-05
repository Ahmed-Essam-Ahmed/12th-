import { storage, KEYS } from './storage'

export const budgetService = {
  getAll: (userId) => {
    const all = storage.get(KEYS.BUDGETS) || {}
    return all[userId] || []
  },

  add: (userId, budget) => {
    const all = storage.get(KEYS.BUDGETS) || {}
    // If budget for same category + month exists, update it instead
    const existing = (all[userId] || []).find(
      b => b.categoryId === budget.categoryId && b.month === budget.month
    )
    if (existing) {
      all[userId] = (all[userId] || []).map(b =>
        b.id === existing.id ? { ...b, amount: budget.amount } : b
      )
    } else {
      const newBudget = {
        id: `budget_${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...budget,
      }
      all[userId] = [...(all[userId] || []), newBudget]
    }
    storage.set(KEYS.BUDGETS, all)
  },

  update: (userId, budgetId, updates) => {
    const all = storage.get(KEYS.BUDGETS) || {}
    all[userId] = (all[userId] || []).map(b =>
      b.id === budgetId ? { ...b, ...updates } : b
    )
    storage.set(KEYS.BUDGETS, all)
  },

  delete: (userId, budgetId) => {
    const all = storage.get(KEYS.BUDGETS) || {}
    all[userId] = (all[userId] || []).filter(b => b.id !== budgetId)
    storage.set(KEYS.BUDGETS, all)
  },
}