import { api } from './api'

export const budgetService = {
  getAll: ()      => api.get('/budgets'),
  add:    (data)  => api.post('/budgets', data),
  update: (id, d) => api.put(`/budgets/${id}`, d),
  delete: (id)    => api.delete(`/budgets/${id}`),
}