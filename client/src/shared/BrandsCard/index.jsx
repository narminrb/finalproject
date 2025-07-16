import React from 'react';

const BrandsCard = ({ brands }) => {
  return (
    <div className="overflow-hidden">
      <div>
      <img
        src={`http://localhost:3000/${brands.image.replace(/\\/g, '/')}`}
        className="w-full  object-cover"
      />
      </div>
    </div>
  );
};

export default BrandsCard;
