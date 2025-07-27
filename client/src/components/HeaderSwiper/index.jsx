import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { getHeaderSlides } from '../../api/headerSlides';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';
import { Navigation } from 'swiper/modules';

const HeaderSwiper = () => {
  const { data: slides = [], isLoading } =useQuery({
    queryKey: ['headerSlides'],
    queryFn: getHeaderSlides,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Swiper
    navigation={true}
    loop={true}
    modules={[Navigation]}
    className="mySwiper"
    style={{ height: '100vh' }}
  >
    {slides.map((slide) => (
      
      <SwiperSlide key={slide._id}>
        <div className="relative w-full h-screen">
        <img
            src={`http://localhost:3000/${slide.image.replace(/\\/g, '/')}`}
            alt={slide.name}
            className="w-full h-full object-cover"
          />

          {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className='header_swiper_name'>{slide.name}</h2>
            <p className="mb-6 max-w-4xl">{slide.description}</p>
            <div className="btn uppercase">
              Learn More
            </div>
          </div> */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
  <h2 className="header_swiper_name fade-in"> {slide.name} </h2>
  <p className="mb-6 max-w-4xl slide-down"> {slide.description} </p>
  <div className="btn uppercase fade-in delay"> Learn More </div>
</div>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  
  );
};

export default HeaderSwiper;
