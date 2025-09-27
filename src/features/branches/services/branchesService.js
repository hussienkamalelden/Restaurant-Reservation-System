import api from '@/api/axios';

export const branchesService = {
  getAll: () =>
    api.get('/branches?include[0]=sections&include[1]=sections.tables'),
  add: (data) => api.post('/branches', data),
  update: (id, data) => api.patch(`/branches/${id}`, data),
  disableAll: () => api.patch('/branches/disable-all'),
};
