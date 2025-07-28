// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import api from '../../api/axios';
// import './style.css';
// import { Link } from 'react-router-dom';

// const CartModalContent = ({ onClose }) => {
//   const { data: cart, isLoading } = useQuery({
//     queryKey: ['cart'],
//     queryFn: () => api.get('/cart').then(res => res.data),
//   });

//   if (isLoading) return <p className="cart-loading">Loading cart...</p>;
//   if (!cart) return null;

//   const total = cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

//   return (
//     <div className="cart-overlay">
//       <button className="cart-close-floating" onClick={onClose}>✖</button>

//       <div className="cart-drawer">
//   <Link to="/cart">
//   <h2 className="cart-title">Shopping Cart</h2>
//   </Link>

//   {cart.items.length ? (
//     <>
//       <ul className="cart-items">
//         {cart.items.map((i) => (
//           <li key={i.product._id} className="cart-item">
//             <div className="cart-item-info">
//               <img
//                 className="cart-item-img"
//                 src={`http://localhost:3000/${i.product.image.replace(/\\/g, '/')}`}
//                 alt={i.product.name}
//               />
//               <div className="cart-item-text">
//                 <span className="cart-item-name">{i.product.name}</span>
//                 <span className="cart-item-price">
//                  {i.qty} ×
//                  <span className='small-price'> ${i.product.price}</span>
//                 </span>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>

      
//       <div className="cart-footer">
//   <div className="cart-subtotal-row">
//     <span className="cart-subtotal-label">Subtotal:</span>
//     <span className="cart-subtotal-amount">${total}</span>
//   </div>

//   <button
//     className="cart-checkout-btn"
//     onClick={() => alert('Go to checkout')}
//   >
//     Checkout
//   </button>
// </div>

//     </>
//   ) : (
//     <p className="cart-empty">Your cart is empty</p>
//   )}
// </div>

//     </div>
//   );
// };

// export default CartModalContent;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import './style.css';
import { Link } from 'react-router-dom';

const CartModalContent = ({ onClose }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => api.get('/cart').then(res => res.data),
  });

  const cartItems = Array.isArray(data?.items) ? data.items : [];
  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.qty;
  }, 0);

  if (isLoading) return <p className="cart-loading">Loading cart...</p>;

  return (
    <div className="cart-overlay">
      <button className="cart-close-floating" onClick={onClose}>✖</button>

      <div className="cart-drawer">
        <Link to="/cart">
          <h2 className="cart-title">Shopping Cart</h2>
        </Link>

        {cartItems.length > 0 ? (
          <>
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item.product._id} className="cart-item">
                  <div className="cart-item-info">
                    <img
                      className="cart-item-img"
                      src={`http://localhost:3000/${item.product.image?.replace(/\\/g, '/')}`}
                      alt={item.product.name}
                    />
                    <div className="cart-item-text">
                      <span className="cart-item-name">{item.product.name}</span>
                      <span className="cart-item-price">
                        {item.qty} ×
                        <span className="small-price"> ${item.product.price}</span>
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-subtotal-row">
                <span className="cart-subtotal-label">Subtotal:</span>
                <span className="cart-subtotal-amount">${total.toFixed(2)}</span>
              </div>

              <button
                className="cart-checkout-btn"
              >
                <Link to="/cart">
                Checkout
                </Link>
              </button>
            </div>
          </>
        ) : (
          <p className="cart-empty">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default CartModalContent;
