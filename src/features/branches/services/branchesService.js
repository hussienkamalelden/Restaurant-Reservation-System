import api from '@/api/axios';

export const branchesService = {
  getAll: () =>
    api.get('/branches?include[0]=sections&include[1]=sections.tables'),
  add: (data) => api.put('/branches', data),
  update: (id, data) => api.put(`/branches/${id}`, data),
  disableAll: () => api.put('/branches/disable-all'),
};
