import api from './axios';

export const getHeaderSlides = () => {
  return api.get('/homeslider').then(res => res.data.slides);
};
