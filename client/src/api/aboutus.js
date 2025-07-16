import api from './axios';

export const getAboutUs = () => {
  return api.get('/aboutpage').then(res => res.data);
};
