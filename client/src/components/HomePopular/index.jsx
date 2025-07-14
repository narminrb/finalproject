import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { getHomePopular } from '../../api/homePopular';
import HomePopularCard from '../../shared/PopularItemCard';
import './styles.css'; // Custom CSS for styling bullets, arrows

const HomePopularSwiper = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['homepopular'],
    queryFn: getHomePopular,
  });

  if (isLoading) return <p>Loading popular items...</p>;
  if (error) return <p>Error loading popular items.</p>;

  const popularItems = data?.data || [];

  return (
    <div className="home-popular-bg bg-cover bg-center bg-no-repeat py-20">
      <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={3}
          spaceBetween={20}
          className="popularSwiper"
        >
          {popularItems.map((item) => (
            <SwiperSlide key={item._id}>
              <HomePopularCard category={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomePopularSwiper;
