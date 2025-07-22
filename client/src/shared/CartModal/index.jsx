// import React from 'react';
// import useCartModal from '../store/useCartModal';
// import { FaTimes } from 'react-icons/fa';

// const CartModal = () => {
//   const { isOpen, closeModal } = useCartModal();

//   if (!isOpen) return null;

//   return (
//     <div className='fixed top-0 right-0 w-[400px] h-full bg-white shadow-xl z-50 p-6 overflow-y-auto'>
//       <div className='flex justify-between items-center mb-4'>
//         <h2 className='text-lg font-bold'>Your Cart</h2>
//         <FaTimes onClick={closeModal} className='cursor-pointer' />
//       </div>

//       {/* Fetch and show cart items here */}
//       <div className="space-y-4">
//         {/* Example: */}
//         <div className="flex justify-between items-center border-b pb-2">
//           <div>
//             <p className='font-semibold'>Painting Name</p>
//             <p className='text-sm text-gray-600'>Qty: 2</p>
//           </div>
//           <p>$200</p>
//         </div>
//       </div>

//       {/* Total & Checkout */}
//       <div className='mt-8 border-t pt-4'>
//         <p className='text-right font-bold text-lg'>Total: $500</p>
//         <button className='w-full mt-4 bg-[#74a8b5] hover:bg-[#5f92a2] text-white py-2 rounded'>
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartModal;
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

const CartModalContent = ({ onClose }) => {
  const { data: cart, isLoading } = useQuery(['cart'], () => api.get('/cart').then(res => res.data));

  if (isLoading) return <p>Loading cart...</p>;

  const total = cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <div className="cart-modal">
      <button className="close" onClick={onClose}>✖</button>
      <h2>Your Cart</h2>
      {cart.items.length ? (
        <>
          <ul>
            {cart.items.map(i => (
              <li key={i.product._id}>
                <span>{i.product.name} × {i.qty}</span>
                <span>${(i.product.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="total">
            Total: <strong>${total.toFixed(2)}</strong>
          </div>
          <button onClick={() => alert('Go to checkout')}>Checkout</button>
        </>
      ) : <p>Your cart is empty</p>}
    </div>
  );
};

export default CartModalContent;

