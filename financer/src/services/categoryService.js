import { api } from './api'

export const categoryService = {
  getAll: ()      => api.get('/categories'),
  add:    (data)  => api.post('/categories', data),
  update: (id, d) => api.put(`/categories/${id}`, d),
  delete: (id)    => api.delete(`/categories/${id}`),
}