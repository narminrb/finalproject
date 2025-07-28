import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get('/cart');
        setCart(res.data);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchCart();
  }, [navigate]);

  const handleCheckout = async () => {
    try {
      const res = await api.post('/stripe/create-checkout-session');
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Checkout failed:', err);
      if (err.response?.status === 401) {
        alert('Please login to continue.');
        navigate('/login');
      } else {
        alert('Error during checkout.');
      }
    }
  };

  if (!cart) return <p>Loading cart...</p>;
  if (cart.items.length === 0) return <p>Your cart is empty.</p>;

  const total = cart.items.reduce(
    (sum, item) =>
      sum + (item.product.discountPrice ?? item.product.price) * item.qty,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart 🛒</h2>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div className="cart-item" key={item._id}>
            <img 
      src={`http://localhost:3000/${item.product.image.replace(/\\/g, '/')}`} 
      alt={item.product.name} 
    />
            <div>
              <h4 className='text-black'>{item.product.name}</h4>
              <p className='text-black'>Price: ${item.product.discountPrice ?? item.product.price}</p>
              <p className='text-black'>Quantity: {item.qty}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3 className='text-black'>Total: ${total.toFixed(2)}</h3>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
