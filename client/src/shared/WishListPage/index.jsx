import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEye, FaTrash } from 'react-icons/fa';
import './style.css';
import { addToCart } from '../../api/cart';

const WISHLIST_STORAGE_KEY = 'myapp_wishlist';
const WishListPage = () => {

    const queryClient = useQueryClient();
    const [showPopup, setShowPopup] = useState(false);

const triggerPopup = () => {
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 2000);
};

    const [wishlist, setWishlist] = useState(() => {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    });
  
    useEffect(() => {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      }, [wishlist]);
    
      const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
      };
      const [quantities, setQuantities] = useState(() => {
        const initial = {};
        try {
          const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
          const parsed = stored ? JSON.parse(stored) : [];
          parsed.forEach(item => {
            initial[item._id] = 1; 
          });
        } catch {}
        return initial;
      });

  const updateQtyMutation = useMutation({
    mutationFn: ({ productId, qty }) => {
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']); 
    },
  });

  const changeQty = (productId, newQty) => {
    if (newQty < 1) return;
    setQuantities((prev) => ({ ...prev, [productId]: newQty }));
  };
  
  const addToCartMutation = useMutation({
    mutationFn: ({ productId, qty }) => addToCart({ productId, qty }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']); 
    },
    onError: (error) => {
      console.error('Failed to add to cart:', error);
      alert('Failed to add item to cart.');
    },
  });
  


  if (wishlist.length === 0)
    return <p className="wishlist-empty">Your wishlist is empty.</p>;

  return (
    <div className="wishlist-container container max-w-screen-xl mx-auto px-3">
         {showPopup && (
      <div className="popup">
        ✅ Product added to cart
      </div>
    )}
      <h2>My Wishlist</h2>
      <table className="wishlist-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Stock Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((item) => (
            <tr key={item._id}>
              <td className="product-cell">
                <img
                  src={`http://localhost:3000/${item.image.replace(/\\/g, '/')}`}
                  alt={item.name}
                  className="product-img"
                  style={{ width: 90, height: 70, objectFit: 'cover' }}
                />
                <span className='text-black'>{item.name}</span>
              </td>
              <td>
              <div className="qty-wrapper">
                <button
                className="qty-control-minus"
                onClick={() => changeQty(item._id, (quantities[item._id] || 1) - 1)}
                >
                −
                </button>
                <span className="qty-control text-black">{quantities[item._id] || 1}</span>
                <button
                className="qty-control-plus"
                onClick={() => changeQty(item._id, (quantities[item._id] || 1) + 1)}
                >
                +
                </button>
            </div>
              </td>
              <td className='text-black'>${item.price.toFixed(2)}</td>
              <td className='text-black'>{item.inStock ? 'In Stock' : 'Out of Stock'}</td>
              <td>
                <button
                  className="action-btn"
                  title="View details"
                  onClick={() =>
                    window.open(`/shop/${item.id}`, '_blank')
                  }
                  style={{ marginRight: 8 }}
                >
                  <FaEye />
                </button>
                <button
  className="action-btn"
  title="Add to cart"
  onClick={() => {
    addToCartMutation.mutate(
      {
        productId: item._id,
        qty: quantities[item._id] || 1,
      },
      {
        onSuccess: () => {
          triggerPopup(); 
        },
      }
    );
  }}
  style={{ marginRight: 8 }}
  disabled={!item.inStock}
>
  Add to Cart
</button>


                <button
                  className="action-btn remove-btn"
                  title="Remove from wishlist"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishListPage;
