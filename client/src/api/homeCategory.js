import api from './axios';

export const getHomeCategory = () => {
  return api.get('/homecategory').then(res => res.data.categories);
};
