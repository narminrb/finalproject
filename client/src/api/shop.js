import api from './axios';

export const getShops = () => {
  return api.get('/shop').then(res => res.data);
};
