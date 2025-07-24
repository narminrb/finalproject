import api from './axios';

export const getShops = () => {
  return api.get('/shop').then(res => res.data);
};
export const createShops = (formData) => {
  return api.post('/shop/create', formData).then(res => res.data);
};

export const updateShops = (id, formData) => {
  return api.put(`/shop/update/${id}`, formData).then(res => res.data);
};

export const deleteShops = (id) => {
  return api.delete(`/shop/delete/${id}`).then(res => res.data);
};