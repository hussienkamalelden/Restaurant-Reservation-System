import api from '@/api/axios';

export const branchesService = {
  getAll: () =>
    api.get('/branches?include[0]=sections&include[1]=sections.tables'),
  updateInfo: (id, data) => api.put(`/branches/${id}`, data),
  updateTables: (id, data) => api.put(`/tables/${id}`, data),
};
