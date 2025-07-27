import React from 'react';
import './wishlist.css'; 
import { Link } from 'react-router-dom';

const WishlistSidebar = ({ wishlist, onClose }) => {
  return (
    <div className="wishlist-overlay">
          <button className="cart-close-floating" onClick={onClose}>✖</button>

      <div className="wishlist-drawer">
        <h2 className="wishlist-title">Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p className="wishlist-empty">Your wishlist is empty.</p>
        ) : (
          <ul className="wishlist-items">
            {wishlist.map((item) => (
              <li key={item._id || item.id} className="wishlist-item">
                <img
                  className="wishlist-item-img"
                  src={`http://localhost:3000/${item.image.replace(/\\/g, '/')}`}
                  alt={item.name}
                />
                <div className="wishlist-item-text">
                  <p className="wishlist-item-name">{item.name}</p>
                  <span className="cart-item-price">
                 1 ×
                 <span className='small-price'> ${item.price}</span>
                </span>
                </div>
              </li>
            ))}
          </ul>
        )}
          <div className="cart-footer">

  <button
    className="wishlist-checkout-btn"
  >
    <Link to="/wishlist">
    View Wishlist
    </Link>
  </button>
</div>
      </div>
    </div>
  );
};

export default WishlistSidebar;
