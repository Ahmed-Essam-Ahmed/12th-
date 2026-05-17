import { api } from './api'

export const goalService = {
  getAll:          ()         => api.get('/goals'),
  add:             (data)     => api.post('/goals', data),
  update:          (id, d)    => api.put(`/goals/${id}`, d),
  delete:          (id)       => api.delete(`/goals/${id}`),
  addContribution: (id, data) => api.post(`/goals/${id}/contributions`, data),
}