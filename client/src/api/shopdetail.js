import api from './axios';

export const getShopId = (id) => {
  return api.get(`/shop/${id}`).then(res => res.data);
};
