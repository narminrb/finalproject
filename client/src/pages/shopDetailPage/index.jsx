import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './styles.css'
import { getShopId } from '../../api/shopdetail';
import ShopSwiper from '../../components/ShopSwiper';
import Brands from '../../components/Brands';
import ShopTabs from '../../shared/ShopTabs';

const ShopDetailPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['shopDetail', id],
    queryFn: () => getShopId(id),
  });
  const [qty, setQty] = useState(1);


  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Blog not found</p>;

  return (
    <div className='home-categories-bg py-15'>
    <div className="container max-w-screen-xl mx-auto px-3 relative">
        <div className="home_bg">
        <h2 className="category_title">{blog.name}</h2>
      </div>
    <div className="shop-detail-container">
      <div className='grid grid-cols-12'>
        <div className='col-span-8'>
        <div className="blog-header-img">
        <img src={`http://localhost:3000/${blog.image.replace(/\\/g, '/')}`} alt={blog.name} />
      </div>
        </div>
        <div className='col-span-4 flex justify-center items-start'>
       <div className='shop-detail-content w-full max-w-[250px]'>
       <div className='shop-detail-inside'>
            <h2 className='shop_prod'>
        Product Information

            </h2>
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
            <p className='shop-detail-desc'>
                {blog.description}
            </p>
            <p className='shop-detail-desc'>
                Artist: {blog.painter}
            </p>
            <p className='shop-detail-desc'>
               Size: 700x500
            </p>
            {/* <div className='flex items-center justify-between mt-4'>

  <div className='flex items-center border rounded px-2'>
    <button onClick={() => setQty((prev) => Math.max(prev - 1, 1))} className='px-2 text-lg'>−</button>
    <span className='px-3'>{qty}</span>
    <button onClick={() => setQty((prev) => prev + 1)} className='px-2 text-lg'>+</button>
  </div>

  <button
    onClick={handleAddToCart}
    className='ml-4 bg-[#74a8b5] hover:bg-[#5f92a2] text-white px-4 py-2 rounded'
  >
    Add to Cart
  </button>
</div> */}
{/* 
<div className="mt-4 flex items-center gap-2">
  <button onClick={handleAddToWishlist} className='text-[#555] hover:text-red-500'>
    ❤️ Add to Wishlist
  </button>
</div> */}
        </div>
       </div>
        </div>
      </div>
      <ShopTabs productId={blog._id} />

      <ShopSwiper/>

    </div>
    </div>
    <Brands/>
    </div>
  );
};

export default ShopDetailPage;
