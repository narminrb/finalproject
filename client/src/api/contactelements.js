import api from './axios';

export const getContactElements = () => {
  return api.get('/contactelements').then(res => res.data);
};
