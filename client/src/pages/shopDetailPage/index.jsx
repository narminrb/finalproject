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


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import Modal from 'react-modal';
// import './styles.css';
// import { getShopId } from '../../api/shopdetail';
// import ShopSwiper from '../../components/ShopSwiper';
// import Brands from '../../components/Brands';
// import ShopTabs from '../../shared/ShopTabs';
// import api from '../../api/axios';
// import CartModalContent from '../../shared/CartModal';

// const ShopDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const qc = useQueryClient();

//   const { data: blog, isLoading, isError } = useQuery({
//     queryKey: ['shopDetail', id],
//     queryFn: () => getShopId(id),
//   });

//   const [qty, setQty] = useState(1);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = async () => {
//       try {
//         const res = await api.get('/auth/verify');
//         setIsLoggedIn(true);
//       } catch (err) {
//         console.log("Not logged in:", err.response?.data || err.message);
//         setIsLoggedIn(false);
//       }
//     };
  
//     // Delay to give time for the cookie to be set after login
//     setTimeout(() => {
//       checkLogin();
//     }, 100); // 100ms delay
//   }, []);
  

//   const addMutation = useMutation({
//     mutationFn: (body) => api.post('/cart/add', body),
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ['cart'] });
//       setModalOpen(true);
//     },
//     onError: (err) => {
//       if (err.response?.status === 401) {
//         alert('Please login to add items to the cart.');
//         navigate('/login');
//       } else {
//         alert('Failed to add to cart.');
//       }
//     },
//   });

//   const handleAdd = () => {
//     if (!isLoggedIn) {
//       alert('You must be logged in to add items to the cart.');
//       navigate('/login');
//       return;
//     }
//     addMutation.mutate({ productId: blog._id, qty });
//   };
  
  

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !blog) return <p>Product not found.</p>;

//   return (
//     <div className="home-categories-bg py-15">
//       <div className="container max-w-screen-xl mx-auto px-3 relative">
//         <div className="home_bg">
//           <h2 className="category_title">{blog.name}</h2>
//         </div>

//         <div className="shop-detail-container">
//           <div className="grid grid-cols-12">
//             <div className="col-span-8">
//               <div className="blog-header-img">
//                 <img
//                   src={`http://localhost:3000/${blog.image.replace(/\\/g, '/')}`}
//                   alt={blog.name}
//                 />
//               </div>
//             </div>
//             <div className="col-span-4 flex justify-center items-start">
//               <div className="shop-detail-content w-full max-w-[250px]">
//                 <div className="shop-detail-inside">
//                   <h2 className="shop_prod">Product Information</h2>
//                   <div>
//                     {blog.discountPrice ? (
//                       <>
//                         <span className="original-price-detail">${blog.price}</span>
//                         <span className="popular_discprice">${blog.discountPrice}</span>
//                       </>
//                     ) : (
//                       <span className="popular_price">${blog.price}</span>
//                     )}
//                   </div>
//                   <p className="shop-detail-desc">{blog.description}</p>
//                   <p className="shop-detail-desc">Artist: {blog.painter}</p>
//                   <p className="shop-detail-desc">Size: 700x500</p>

//                   <div className="add-cart-section">
//                     <div className="qty-control">
//                       <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
//                       <span>{qty}</span>
//                       <button onClick={() => setQty(q => q + 1)}>+</button>
//                     </div>
//                     <button
//                       className="add-to-cart"
//                       onClick={handleAdd}
//                       disabled={!isLoggedIn || addMutation.isLoading}
//                       style={{
//                         opacity: !isLoggedIn ? 0.5 : 1,
//                         cursor: !isLoggedIn ? 'not-allowed' : 'pointer',
//                       }}
//                     >
//                       {addMutation.isLoading ? 'Adding...' : 'Add to Cart'}
//                     </button>
//                   </div>

//                   <Modal
//                     isOpen={modalOpen}
//                     onRequestClose={() => setModalOpen(false)}
//                     ariaHideApp={false}
//                   >
//                     <CartModalContent onClose={() => setModalOpen(false)} />
//                   </Modal>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <ShopTabs productId={blog._id} />

//           <ShopSwiper />
//         </div>
//       </div>
//       <Brands />
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
import useWishlist from '../../shared/Wishlist';
import WishlistNotification from '../../shared/WishlistPopup';
import WishlistSidebar from '../../shared/WishlistModal';

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

  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get('/auth/verify');
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    setTimeout(checkLogin, 100);
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
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const [showWishlistSidebar, setShowWishlistSidebar] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const toggleWishlist = () => {
    if (isInWishlist(blog._id)) {
      removeFromWishlist(blog._id);
    } else {
      addToWishlist(blog);
      setLastAddedProduct(blog);
      setShowWishlistPopup(true);

      setTimeout(() => setShowWishlistPopup(false), 3000); 
    }
  };

  const handleAdd = () => {
    if (!isLoggedIn) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }
    addMutation.mutate({ productId: blog._id, qty });
  };

  // const toggleWishlist = () => {
  //   if (isInWishlist(blog._id)) {
  //     removeFromWishlist(blog._id);
  //   } else {
  //     addToWishlist(blog);
  //   }
  // };

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

               <div className="add-to-cart-section my-5">
  <div className="qty-wrapper">
    <button
      className="qty-control-minus"
      onClick={() => setQty(q => Math.max(1, q - 1))}
    >
      −
    </button>
    <p className="qty-control">{qty}</p>
    <button
      className="qty-control-plus"
      onClick={() => setQty(q => q + 1)}
    >
      +
    </button>
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

                  <button
      onClick={toggleWishlist}
      className="wishlist-btn"
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        color: isInWishlist(blog._id) ? '#74a8b5' : 'gray',
      }}
      aria-label="Add to Wishlist"
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isInWishlist(blog._id) ? '#74a8b5' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {isInWishlist(blog._id) ? 'Browse wishlist' : 'Add to Wishlist'}
    </button>
                  <p className="shop-detail-desc my-3">Category: {blog.category.category}</p>
                  <p className="shop-detail-desc my-3">Tags: bootstrap,collections,color</p>
                  <div className='shop-detail-desc-icons'>
              <p>
                Share:
              </p>
              <i class="ri-twitter-x-line"></i>
              <i class="ri-facebook-fill"></i>
              <i class="ri-pinterest-line"></i>
              <i class="ri-mail-line"></i>
              <i class="ri-linkedin-fill"></i>
              <i class="ri-skype-fill"></i>
              </div>
            {showWishlistPopup && lastAddedProduct && (
              <WishlistNotification
                product={lastAddedProduct}
                onViewWishlist={() => {
                  setShowWishlistSidebar(true);
                  setShowWishlistPopup(false);
                }}
                onClose={() => setShowWishlistPopup(false)}
              />
            )}

            {showWishlistSidebar && (
              <WishlistSidebar
                wishlist={wishlist}
                onClose={() => setShowWishlistSidebar(false)}
              />
            )}

{modalOpen && <CartModalContent onClose={() => setModalOpen(false)} />}

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
