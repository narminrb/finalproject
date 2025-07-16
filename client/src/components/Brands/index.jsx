import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './styles.css'
import { getBrands } from '../../api/brands';
import BrandsCard from '../../shared/BrandsCard';

const Brands = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-cover bg-center bg-no-repeat py-10 px-35">
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6">
        {data?.brands.map((brands) => (
          <BrandsCard key={brands.id} brands={brands} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Brands;
