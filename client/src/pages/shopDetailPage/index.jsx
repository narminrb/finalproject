// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import Modal from 'react-modal';
// import './styles.css'
// import { getShopId } from '../../api/shopdetail';
// import ShopSwiper from '../../components/ShopSwiper';
// import Brands from '../../components/Brands';
// import ShopTabs from '../../shared/ShopTabs';
// import api from '../../api/axios';
// import CartModalContent from '../../shared/CartModal';

// const ShopDetailPage = () => {
//   const { id } = useParams();
//   const { data: blog, isLoading, isError } = useQuery({
//     queryKey: ['shopDetail', id],
//     queryFn: () => getShopId(id),
//   });
//   const [qty, setQty] = useState(1);
//   const [modalOpen, setModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const qc = useQueryClient();

  
//   const addMutation = useMutation({
//     mutationFn: (body) => api.post('/cart/add', body),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['cart'] });
//       setModalOpen(true);
//     },
//     onError: (err) => {
//       if (err.response.status === 401) {
//         navigate('/login');
//       }
//     }
//   });
  

//   if (isLoading) return <p>Loading...</p>;

//   // const handleAdd = () => addMutation.mutate({ productId: id, qty });
//   const handleAdd = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Please log in to add items to the cart.');
//       navigate('/login');
//       return;
//     }
//     addMutation.mutate({ productId: id, qty });
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !blog) return <p>Blog not found</p>;

//   return (
//     <div className='home-categories-bg py-15'>
//     <div className="container max-w-screen-xl mx-auto px-3 relative">
//         <div className="home_bg">
//         <h2 className="category_title">{blog.name}</h2>
//       </div>
//     <div className="shop-detail-container">
//       <div className='grid grid-cols-12'>
//         <div className='col-span-8'>
//         <div className="blog-header-img">
//         <img src={`http://localhost:3000/${blog.image.replace(/\\/g, '/')}`} alt={blog.name} />
//       </div>
//         </div>
//         <div className='col-span-4 flex justify-center items-start'>
//        <div className='shop-detail-content w-full max-w-[250px]'>
//        <div className='shop-detail-inside'>
//             <h2 className='shop_prod'>
//         Product Information

//             </h2>
//         <div>
//             {blog.discountPrice ? (
//                 <>
//                 <span className="original-price-detail">${blog.price}</span>
//                 <span className="popular_discprice">${blog.discountPrice}</span>
//                 </>
//             ) : (
//                 <span className="popular_price">${blog.price}</span>
//             )}
//             </div>
//             <p className='shop-detail-desc'>
//                 {blog.description}
//             </p>
//             <p className='shop-detail-desc'>
//                 Artist: {blog.painter}
//             </p>
//             <p className='shop-detail-desc'>
//                Size: 700x500
//             </p>
//             <div className="add-cart-section">
//         <div className='qty-control'>
//           <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
//           <span>{qty}</span>
//           <button onClick={() => setQty(q => q + 1)}>+</button>
//         </div>
//         <button className='add-to-cart' onClick={handleAdd}>Add to Cart</button>
//       </div>

//       <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} ariaHideApp={false}>
//         <CartModalContent onClose={() => setModalOpen(false)} />
//       </Modal>
//         </div>
//        </div>
//         </div>
//       </div>
//       <ShopTabs productId={blog._id} />

//       <ShopSwiper/>

//     </div>
//     </div>
//     <Brands/>
//     </div>
//   );
// };

// export default ShopDetailPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from 'react-modal';
import './styles.css';
import { getShopId } from '../../api/shopdetail';
import ShopSwiper from '../../components/ShopSwiper';
import Brands from '../../components/Brands';
import ShopTabs from '../../shared/ShopTabs';
import api from '../../api/axios';
import CartModalContent from '../../shared/CartModal';

const ShopDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['shopDetail', id],
    queryFn: () => getShopId(id),
  });

  const [qty, setQty] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get('/auth/verify');
        setIsLoggedIn(true);
      } catch (err) {
        console.log("Not logged in:", err.response?.data || err.message);
        setIsLoggedIn(false);
      }
    };
  
    // Delay to give time for the cookie to be set after login
    setTimeout(() => {
      checkLogin();
    }, 100); // 100ms delay
  }, []);
  

  const addMutation = useMutation({
    mutationFn: (body) => api.post('/cart/add', body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      setModalOpen(true);
    },
    onError: (err) => {
      if (err.response?.status === 401) {
        alert('Please login to add items to the cart.');
        navigate('/login');
      } else {
        alert('Failed to add to cart.');
      }
    },
  });

  const handleAdd = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }
    addMutation.mutate({ productId: blog._id, qty });
  };
  
  

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Product not found.</p>;

  return (
    <div className="home-categories-bg py-15">
      <div className="container max-w-screen-xl mx-auto px-3 relative">
        <div className="home_bg">
          <h2 className="category_title">{blog.name}</h2>
        </div>

        <div className="shop-detail-container">
          <div className="grid grid-cols-12">
            <div className="col-span-8">
              <div className="blog-header-img">
                <img
                  src={`http://localhost:3000/${blog.image.replace(/\\/g, '/')}`}
                  alt={blog.name}
                />
              </div>
            </div>
            <div className="col-span-4 flex justify-center items-start">
              <div className="shop-detail-content w-full max-w-[250px]">
                <div className="shop-detail-inside">
                  <h2 className="shop_prod">Product Information</h2>
                  <div>
                    {blog.discountPrice ? (
                      <>
                        <span className="original-price-detail">${blog.price}</span>
                        <span className="popular_discprice">${blog.discountPrice}</span>
                      </>
                    ) : (
                      <span className="popular_price">${blog.price}</span>
                    )}
                  </div>
                  <p className="shop-detail-desc">{blog.description}</p>
                  <p className="shop-detail-desc">Artist: {blog.painter}</p>
                  <p className="shop-detail-desc">Size: 700x500</p>

                  <div className="add-cart-section">
                    <div className="qty-control">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(q => q + 1)}>+</button>
                    </div>
                    <button
                      className="add-to-cart"
                      onClick={handleAdd}
                      disabled={!isLoggedIn || addMutation.isLoading}
                      style={{
                        opacity: !isLoggedIn ? 0.5 : 1,
                        cursor: !isLoggedIn ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {addMutation.isLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>

                  <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    ariaHideApp={false}
                  >
                    <CartModalContent onClose={() => setModalOpen(false)} />
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          <ShopTabs productId={blog._id} />

          <ShopSwiper />
        </div>
      </div>
      <Brands />
    </div>
  );
};

export default ShopDetailPage;
