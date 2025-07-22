import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './style.css'

const ReviewsTab = ({ productId, onSubmit, reviews = [] }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment || !reviewerName) {
      alert('Please fill in all required fields (rating, review, and name).');
      return;
    }

    const reviewData = {
      product: productId,
      rating,
      comment,
      reviewerName,
      reviewerEmail: reviewerEmail || null,
    };

    onSubmit(reviewData);


    setRating(0);
    setHover(null);
    setComment('');
    setReviewerName('');
    setReviewerEmail('');
    setRemember(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         <div className="space-y-6">
        <h3 className="text-lg font-bold">Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev, idx) => (
          <div key={idx} className="border p-4 rounded shadow-sm">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar
                  key={s}
                  size={18}
                  className={`${rev.rating >= s ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-gray-700 mb-2">"{rev.comment}"</p>
            <p className="text-sm text-gray-500">
              – {rev.reviewerName} {rev.reviewerEmail ? `(${rev.reviewerEmail})` : ''}
            </p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
        <p className='review-text mb-10'>Your email address will not be published. Required fields are marked</p>
          <p className='review-text'>Your rating *</p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </div>

          <label className="block mb-1">
          <p className='review-text'>Your Review *</p>
            <textarea
              className="w-full mt-1 input-border p-2"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>

          <label className="block mt-4">
            <p className='review-text'>Name *</p>
            <input
              type="text"
              className="w-full p-2 input-border"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </label>

          <label className="block mt-4 ">
          <p className='review-text'>Email (optional)</p>
            <input
              type="email"
              className="w-full p-2 input-border"
              value={reviewerEmail}
              onChange={(e) => setReviewerEmail(e.target.value)}
            />
          </label>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm">
              Save my name and email in this browser for the next time I comment.
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 px-8 py-2 bg-[#74a8b5] text-white rounded-full hover:bg-[#5f92a2]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsTab;
