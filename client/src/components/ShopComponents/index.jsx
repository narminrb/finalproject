import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './styles.css'
import HomePopularCard from '../../shared/PopularItemCard';
import { getShops } from '../../api/shop';

const ShopComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['shop'],
    queryFn: getShops,
  });

  console.log(data)
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="home-categories-bg bg-cover bg-center bg-no-repeat py-10">
            <div className='home_bg'>
                <h2 className='category_title'>
                    Shop
                </h2>
            </div>
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.data.map((popular) => (
          <HomePopularCard key={popular.id} popular={popular} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShopComponent;
