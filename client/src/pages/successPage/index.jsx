import React from 'react';
import './styles.css';

const SuccessPage = () => {
  return (
    <div className="success-container">
      <h1>🎉 Payment Successful!</h1>
      <p className='text-black'>Thank you for your order. We'll process it shortly.</p>
      <a href="/" className="back-button">Continue Shopping</a>
    </div>
  );
};

export default SuccessPage;
