import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderIcons = () => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const addToWishlist = () => setWishlistCount((prev) => prev + 1);
  const addToCart = () => setCartCount((prev) => prev + 1);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-6 text-white font-extralight text-2xl relative">

      <button className="hover:text-[#74a8b5] transition">
        <i className="ri-search-line"></i>
      </button>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="hover:text-[#74a8b5] transition"
        >
          <i className="ri-user-3-line"></i>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white text-black shadow-md z-50 py-2 px-4 w-32">
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/register");
              }}
              className="block w-full text-[18px] text-left hover:text-[#74a8b5] transition py-1"
            >
              Register
            </button>
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/login");
              }}
              className="block w-full text-left text-[18px] hover:text-[#74a8b5] transition py-1"
            >
              Login
            </button>
          </div>
        )}
      </div>

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
