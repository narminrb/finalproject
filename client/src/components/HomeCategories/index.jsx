import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomeCategory } from '../../api/homeCategory';
import HomeCategoryCard from '../../shared/HomeCategoryCard';
import './styles.css'

const HomeCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['homecategory'],
    queryFn: getHomeCategory,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="home-categories-bg bg-cover bg-center bg-no-repeat py-10">
            <div className='home_bg'>
                <h2 className='category_title'>
                    Categories
                </h2>
            </div>
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((category) => (
          <HomeCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default HomeCategories;
