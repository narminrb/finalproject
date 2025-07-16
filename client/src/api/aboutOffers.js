import api from './axios';

export const getAboutOffers = () => {
  return api.get('/aboutoffers').then(res => res.data);
};
