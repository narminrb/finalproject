import { useState, useEffect } from 'react';

const WISHLIST_STORAGE_KEY = 'myapp_wishlist';

export default function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist(prev => {
      if (prev.find(i => i._id === item._id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(i => i._id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some(i => i._id === id);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
}
