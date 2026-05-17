import { api } from './api'

export const transactionService = {
  getAll: ()       => api.get('/transactions'),
  add:    (data)   => api.post('/transactions', data),
  update: (id, d)  => api.put(`/transactions/${id}`, d),
  delete: (id)     => api.delete(`/transactions/${id}`),
}