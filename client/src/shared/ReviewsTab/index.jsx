import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

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

    // Clear form
    setRating(0);
    setHover(null);
    setComment('');
    setReviewerName('');
    setReviewerEmail('');
    setRemember(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Review Form */}
      <div>
        <form onSubmit={handleSubmit}>
          <p className="font-semibold mb-2">Your rating *</p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition-colors ${
                  (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </div>

          <label className="block font-semibold mb-1">
            Your review *
            <textarea
              className="w-full mt-1 border p-2 rounded-md"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>

          <label className="block font-semibold mt-4 mb-1">
            Name *
            <input
              type="text"
              className="w-full mt-1 border p-2 rounded-md"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </label>

          <label className="block font-semibold mt-4 mb-1">
            Email (optional)
            <input
              type="email"
              className="w-full mt-1 border p-2 rounded-md"
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
            className="mt-6 px-6 py-2 bg-[#74a8b5] text-white rounded hover:bg-[#5f92a2]"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Display Submitted Reviews */}
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
    </div>
  );
};

export default ReviewsTab;
