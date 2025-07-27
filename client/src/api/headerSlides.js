import api from './axios';

export const getHeaderSlides = () => {
  return api.get('/homeslider').then(res => res.data.slides);
};

export const createHomeHeaderSlider = (formData) =>
  api.post('/homeslider/create', formData).then(res => res.data);

export const updateHomeHeaderSlider = (id, formData) =>
  api.put(`/homeslider/update/${id}`, formData).then(res => res.data);

export const deleteHomeHeaderSlider = (id) =>
  api.delete(`/homeslider/delete/${id}`).then(res => res.data);