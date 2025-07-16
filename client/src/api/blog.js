import api from './axios';

export const getBlog = () => {
  return api.get('/blogpage').then(res => res.data);
};
