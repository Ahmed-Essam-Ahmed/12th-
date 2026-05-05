import { storage, KEYS } from './storage'

export const goalService = {
  getAll: (userId) => {
    const all = storage.get(KEYS.GOALS) || {}
    return all[userId] || []
  },

  add: (userId, goal) => {
    const all = storage.get(KEYS.GOALS) || {}
    const newGoal = {
      id: `goal_${Date.now()}`,
      createdAt: new Date().toISOString(),
      contributions: [],
      savedAmount: 0,
      completed: false,
      ...goal,
    }
    all[userId] = [...(all[userId] || []), newGoal]
    storage.set(KEYS.GOALS, all)
    return newGoal
  },

  update: (userId, goalId, updates) => {
    const all = storage.get(KEYS.GOALS) || {}
    all[userId] = (all[userId] || []).map(g =>
      g.id === goalId ? { ...g, ...updates } : g
    )
    storage.set(KEYS.GOALS, all)
  },

  delete: (userId, goalId) => {
    const all = storage.get(KEYS.GOALS) || {}
    all[userId] = (all[userId] || []).filter(g => g.id !== goalId)
    storage.set(KEYS.GOALS, all)
  },

  addContribution: (userId, goalId, contribution) => {
    const all = storage.get(KEYS.GOALS) || {}
    all[userId] = (all[userId] || []).map(g => {
      if (g.id !== goalId) return g
      const newContrib = { id: `c_${Date.now()}`, ...contribution }
      const newSaved = g.savedAmount + contribution.amount
      return {
        ...g,
        savedAmount: newSaved,
        contributions: [...g.contributions, newContrib],
        completed: newSaved >= g.targetAmount,
      }
    })
    storage.set(KEYS.GOALS, all)
  },
}