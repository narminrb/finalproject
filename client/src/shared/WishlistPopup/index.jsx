// WishlistNotification.jsx
import React from 'react';
import './styles.css'

const WishlistNotification = ({ product, onViewWishlist, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      background: 'white',
      border: '1px solid #ddd',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      padding: '10px 15px',
      display: 'flex',
      alignItems: 'center',
      gap: 15,
      zIndex: 9999,
      animation: 'slideInLeft 0.3s ease forwards'
    }}>
      <img
        src={`http://localhost:3000/${product.image.replace(/\\/g, '/')}`}
        alt={product.name}
        style={{ width: 60, height: 60, objectFit: 'cover' }}
      />
      <div>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{product.name}</p>
        <button
          onClick={onViewWishlist}
          style={{
            marginTop: 5,
            color: 'black',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          View Wishlist
        </button>
      </div>
      <button onClick={onClose} style={{ fontSize: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
        ✖
      </button>
    </div>
  );
};

export default WishlistNotification;
