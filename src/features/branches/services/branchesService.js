import api from '@/api/axios';

export const branchesService = {
  getAll: () =>
    api.get('/branches?include[0]=sections&include[1]=sections.tables'),
  updateStatus: (id, data) => api.put(`/branches/${id}`, data),
  updateInfo: (id, data) => api.put(`/branches/${id}`, data),
};
