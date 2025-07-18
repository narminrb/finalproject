import React from 'react';
import './style.css'

const ShopCard = ({ popular }) => {
  const trimmedDescription = popular.description
    .split(' ')
    .slice(0, 7)
    .join(' ') + '...';
  return (
    <div className="overflow-hidden">
      <div className='outer_popular'>
      <h2 className='popular_name'>{popular.name}</h2>
      </div>
      <div className="popular_card relative">
            {popular.sale && <div className="onSale">SALE</div>}
            {!popular.inStock && <div className="inStock">OUT OF STOCK</div>}
            <img
                src={`http://localhost:3000/${popular.image.replace(/\\/g, '/')}`}
                alt={popular.name}
                className="w-full h-[279px] object-cover"
            />
            </div>


      <div className="outer_popular">
                <div className="price-section">
            {popular.discountPrice ? (
                <>
                <span className="original_price">${popular.price}</span>
                <span className="popular_discprice">${popular.discountPrice}</span>
                </>
            ) : (
                <span className="popular_price">${popular.price}</span>
            )}
            </div>

        <p className='popular_desc'>{trimmedDescription}</p>
        <div className='flex justify-between paint_box'>
          <p className='paint'>Painter:</p>
          <p className='paint_popular'>{popular.painter}</p>
        </div>
        <div className='flex justify-between paint_box'>
          <p className='paint'>Size:</p>
          <p className='size_popular'>{popular.size}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
