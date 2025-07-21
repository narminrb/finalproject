// // example: reviewApi.js
// import api from './axios';

// export const getReviews = (productId) => {
//   return api.get(`/reviews/${productId}`).then((res) => res.data);
// };

export const getReviews = async (productId) => {
  const res = await fetch(`http://localhost:3000/api/reviews/${productId}`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
};

export const postReview = async (reviewData) => {
  const res = await fetch('http://localhost:3000/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const text = await res.text(); // get raw response to see if it's HTML
    let message;
    try {
      const json = JSON.parse(text);
      message = json.message || 'Failed to post review';
    } catch (err) {
      message = `Server error: ${res.status}`; // fallback for HTML errors
    }
    throw new Error(message);
  }

  return res.json();
};

