import React from 'react';
import './style.css'

const HomeCategoryCard = ({ category }) => {
  return (
    <div className="border  overflow-hidden">
      <div>
      <img
        src={`http://localhost:3000/${category.image.replace(/\\/g, '/')}`}
        alt={category.category}
        className="w-full h-[225px] object-cover"
      />
      </div>
      <div className="outer_div">
        <div className='inner_div'>
        <h4 className='category_name'>
        {category.category}
        </h4>
        </div>
      </div>
    </div>
  );
};

export default HomeCategoryCard;
