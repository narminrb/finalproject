import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './styles.css'
import { getAboutOffers } from '../../api/aboutOffers';
import AboutOffersCard from '../../shared/AboutOffersCard';

const AboutOffers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['aboutoffers'],
    queryFn: getAboutOffers,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-cover bg-center bg-no-repeat ">
            <div className='home_bg'>
                <h2 className='category_title'>
                    Our offers
                </h2>
            </div>
    <div className="container max-w-screen-xl mx-auto mt-10 px-3 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {data?.abouts?.map((offers) => (
          <AboutOffersCard key={offers.id} offers={offers} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default AboutOffers;
