import api from './axios';

export const getBlog = () => {
  return api.get('/blog').then(res => res.data);
};
