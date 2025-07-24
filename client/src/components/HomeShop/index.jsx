import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomePopular } from '../../api/homePopular';
import './styles.css';
import HomeShopCard from '../../shared/HomeShopCard';

const HomeShop = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['homepopular'],
    queryFn: getHomePopular,
  });

  const [visibleCount, setVisibleCount] = useState(6);

  if (isLoading) return <p>Loading popular items...</p>;
  if (error) return <p>Error loading popular items.</p>;

  const popularItems = data?.data || [];
  const visibleItems = popularItems.slice(0, visibleCount);
  const hasMore = visibleCount < popularItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="home-categories-bg bg-cover bg-center bg-no-repeat py-20">
      <div className="home_bgg">
        <h2 className="popular_title">Our Shop</h2>
      </div>
      <div className="container max-w-screen-xl mx-auto my-10 px-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <HomeShopCard key={item._id} popular={item} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 font-semibold text-white bg-[#74a8b5] border border-[#74a8b5] rounded-[25px] hover:opacity-90 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeShop;
