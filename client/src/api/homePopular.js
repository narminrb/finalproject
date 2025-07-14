import api from './axios';

export const getHomePopular = () => {
  return api.get('/homepopular').then(res => res.data);
};
