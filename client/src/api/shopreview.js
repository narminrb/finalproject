// example: reviewApi.js
import api from './axios';

export const getReviews = (productId) => {
  return api.get(`/reviews/${productId}`).then((res) => res.data);
};
