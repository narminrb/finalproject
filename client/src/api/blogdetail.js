 import api from './axios';

export const getBlogById = (id) => {
  return api.get(`/blogpage/${id}`).then(res => res.data);
};
