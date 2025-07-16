import api from './axios';

export const getBlogPage = () => {
  return api.get('/blogpage').then(res => res.data);
};
