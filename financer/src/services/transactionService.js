import { storage, KEYS } from './storage'

export const transactionService = {
  getAll: (userId) => {
    const all = storage.get(KEYS.TRANSACTIONS) || {}
    return (all[userId] || []).sort((a, b) => new Date(b.date) - new Date(a.date))
  },

  add: (userId, transaction) => {
    const all = storage.get(KEYS.TRANSACTIONS) || {}
    const newTx = { id: `tx_${Date.now()}`, createdAt: new Date().toISOString(), ...transaction }
    all[userId] = [...(all[userId] || []), newTx]
    storage.set(KEYS.TRANSACTIONS, all)
    return newTx
  },

  update: (userId, txId, updates) => {
    const all = storage.get(KEYS.TRANSACTIONS) || {}
    all[userId] = (all[userId] || []).map((t) => (t.id === txId ? { ...t, ...updates } : t))
    storage.set(KEYS.TRANSACTIONS, all)
  },

  delete: (userId, txId) => {
    const all = storage.get(KEYS.TRANSACTIONS) || {}
    all[userId] = (all[userId] || []).filter((t) => t.id !== txId)
    storage.set(KEYS.TRANSACTIONS, all)
  },
}