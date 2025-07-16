import api from './axios';

export const getBrands = () => {
  return api.get('/brands').then(res => res.data);
};
