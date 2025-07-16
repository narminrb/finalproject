import React from 'react';
import './style.css'

const HomePopularCard = ({ popular }) => {
  const trimmedDescription = popular.description
    .split(' ')
    .slice(0, 7)
    .join(' ') + '...';
  return (
    <div className="overflow-hidden">
      <div className='outer_popular'>
      <h2 className='popular_name'>{popular.name}</h2>
      </div>
      <div className='popular_card'>
      <img
        src={`http://localhost:3000/${popular.image.replace(/\\/g, '/')}`}
        alt={popular.name}
        className="w-full h-[279px] object-cover"
      />
      </div>
      <div className="outer_popular">
        <h2 className='popular_price'>${popular.price}</h2>
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

export default HomePopularCard;
