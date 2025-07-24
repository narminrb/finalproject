import api from './axios';

export const getAboutOffers = () => {
  return api.get('/aboutoffers').then(res => res.data);
};
export const createAboutOffers = (formData) => {
  return api.post('/aboutoffers/create', formData).then(res => res.data);
};

export const updateAboutOffers = (id, formData) => {
  return api.put(`/aboutoffers/update/${id}`, formData).then(res => res.data);
};

export const deleteAboutOffers = (id) => {
  return api.delete(`/aboutoffers/delete/${id}`).then(res => res.data);
};