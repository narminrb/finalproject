import api from './axios';

export const getContactElements = () => {
  return api.get('/contactelements').then(res => res.data);
};

export const createContactElement = (formData) => {
  return api.post('/contactelements/create', formData).then(res => res.data);
};

export const updateContactElement = (id, formData) => {
  return api.put(`/contactelements/update/${id}`, formData).then(res => res.data);
};

export const deleteContactElement = (id) => {
  return api.delete(`/contactelements/delete/${id}`).then(res => res.data);
};