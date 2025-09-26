import api from '@/api/axios';

export const loginService = {
  // HEAD request to check if token is valid
  checkToken: () =>
    api.head('/branches?include[0]=sections&include[1]=sections.tables'),
};
