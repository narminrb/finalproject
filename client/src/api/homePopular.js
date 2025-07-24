import api from './axios';

export const getHomePopular = () => {
  return api.get('/homepopular').then(res => res.data);
};
export const createHomePopular = (formData) =>
  api.post('/homepopular/create', formData).then(res => res.data);

export const updateHomePopular = (id, formData) =>
  api.put(`/homepopular/update/${id}`, formData).then(res => res.data);

export const deleteHomePopular = (id) =>
  api.delete(`/homepopular/delete/${id}`).then(res => res.data);