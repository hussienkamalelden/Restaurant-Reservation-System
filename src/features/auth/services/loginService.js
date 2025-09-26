import api from '@/api/axios';

export const loginService = {
  getAll: () =>
    api.get('/branches?include[0]=sections&include[1]=sections.tables'),
};
