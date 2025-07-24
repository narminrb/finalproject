import api from './axios';

export const getBlog = () => {
  return api.get('/blogpage').then(res => res.data);
};
export const createBlog = (formData) => {
  return api.post('/blogpage/create', formData).then(res => res.data);
};

export const updateBlog = (id, formData) => {
  return api.put(`/blogpage/update/${id}`, formData).then(res => res.data);
};

export const deleteBlog = (id) => {
  return api.delete(`/blogpage/delete/${id}`).then(res => res.data);
};