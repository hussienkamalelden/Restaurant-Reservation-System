import api from '@/api/axios';

export const branchesService = {
  getAll: () =>
    api.get('/branches?include[0]=sections&include[1]=sections.tables'),
  add: (id, data) => api.put(`/branches/${id}`, data),
  update: (id, data) => api.put(`/branches/${id}`, data),
  disableAll: (id) =>
    api.put(`/branches/${id}`, {
      accepts_reservations: false,
    }),
};
