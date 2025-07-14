import React, { useState } from "react";

const HeaderIcons = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const addToWishlist = () => setWishlistCount((prev) => prev + 1);
  const addToCart = () => setCartCount((prev) => prev + 1);

  return (
    <div className="flex items-center gap-6 text-white font-extralight text-2xl relative">

      <button className="hover:text-[#74a8b5] transition">
        <i className="ri-search-line"></i>
      </button>

      <div className="relative">
        <button onClick={addToWishlist} className="hover:text-[#74a8b5] transition">
          <i className="ri-heart-line"></i>
        </button>
        <span className="absolute top-1 -right-4 bg-[#74a8b5] text-white text-xs font-bold px-1 py-0.3 rounded-full">
          {wishlistCount}
        </span>
      </div>

      <div className="relative">
        <button onClick={addToCart} className="hover:text-[#74a8b5] transition">
          <i className="ri-shopping-cart-2-line"></i>
        </button>
        <span className="absolute top-1 -right-4 bg-[#74a8b5] text-white text-xs font-bold px-1 py-0.3 rounded-full">
          {cartCount}
        </span>
      </div>
    </div>
  );
};

export default HeaderIcons;
