import api from './axios';

export const getAboutUs = () => {
  return api.get('/aboutpage').then(res => res.data);
};

export const createAboutPages = (formData) => {
  return api.post('/aboutpage/create', formData).then(res => res.data);
};

export const updateAboutPages = (id, formData) => {
  return api.put(`/aboutpage/update/${id}`, formData).then(res => res.data);
};

export const deleteAboutPages = (id) => {
  return api.delete(`/aboutpage/delete/${id}`).then(res => res.data);
};