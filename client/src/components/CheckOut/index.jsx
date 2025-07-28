import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './style.css';
import { deleteCartItem, getCartItems, updateCartQuantity } from '../../api/cart';
import { Link, Navigate } from 'react-router-dom';
import api from '../../api/axios';

const CheckOut = () => {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
      queryKey: ['cart'],
      queryFn: getCartItems,
    });
    const cartItems = Array.isArray(data) ? data : [];
    
    
      
      const updateQtyMutation = useMutation({
        mutationFn: updateCartQuantity,
        onSuccess: () => {
          queryClient.invalidateQueries(['cart']); // Refresh cart data
        }
      });
     
      const handleCheckout = async () => {
        try {
          const res = await api.post('/stripe/create-checkout-session');
          window.location.href = res.data.url;
        } catch (err) {
          console.error('Checkout failed:', err);
          if (err.response?.status === 401) {
            alert('Please login to continue.');
            Navigate('/login');
          } else {
            alert('Error during checkout.');
          }
        }
      };

const removeMutation = useMutation({
  mutationFn: deleteCartItem,
  onSuccess: () => {
    queryClient.invalidateQueries(['cart']); // refetch cart
  },
});


const handleRemove = (productId) => {
    removeMutation.mutate(productId);
  };
  

  const getItemPrice = (item) =>
    item.product.discountPrice ?? item.product.price;

  const getItemSubtotal = (item) =>
    getItemPrice(item) * item.qty;

  const total = cartItems.reduce((acc, item) => acc + getItemSubtotal(item), 0);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="checkout-container">

  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative checkout-content">
      {/* Cart Table */}
      <div className="checkout-table-wrapper">
        <table className="checkout-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="product-cell">
                  <img
                    src={`http://localhost:3000/${item.product.image.replace(/\\/g, '/')}`}
                    alt={item.product.name}
                    className="product-img"
                  />
                  <div>
                    <p className="product-name">{item.product.name}</p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
                <td>${getItemPrice(item)}</td>
                <td>
                  <div className="qty-wrapper">
                    <button
                      className="qty-control-minus"
                      onClick={() => {
                        if (item.qty > 1) {
                          updateQtyMutation.mutate({
                            productId: item.product._id,
                            qty: item.qty - 1,
                          });
                        }
                      }}
                    >
                      −
                    </button>
                    <p className="qty-control">{item.qty}</p>
                    <button
                      className="qty-control-plus"
                      onClick={() =>
                        updateQtyMutation.mutate({
                          productId: item.product._id,
                          qty: item.qty + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${getItemSubtotal(item).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Totals */}
      <div className="cart-totals-box">
        <h3 className='text-black'>Cart Totals</h3>
        <div className="cart-total-line">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="cart-total-line total-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
        <button className="continue-btn" onClick={() => window.location.href = '/shop'}>
          Continue Shopping
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default CheckOut;
