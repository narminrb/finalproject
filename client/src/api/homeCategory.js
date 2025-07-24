import api from './axios';

export const getHomeCategory = () => {
  return api.get('/homecategory').then(res => res.data.categories);
};
export const createHomeCategory = (formData) =>
  api.post('/homecategory/create', formData).then(res => res.data);

export const updateHomeCategory = (id, formData) =>
  api.put(`/homecategory/update/${id}`, formData).then(res => res.data);

export const deleteHomeCategory = (id) =>
  api.delete(`/homecategory/delete/${id}`).then(res => res.data);
