import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './styles.css'
import AboutUsCard from '../../shared/AboutCard';
import { getAboutUs } from '../../api/aboutus';

const AboutPageComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['aboutus'],
    queryFn: getAboutUs,
  });
  console.log(data);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-cover bg-center bg-no-repeat py-10">
            <div className='home_bg'>
                <h2 className='category_title'>
                    About us
                </h2>
            </div>
    <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6">
            {data?.abouts?.map((about, index) => (
        <AboutUsCard key={about.id} about={about} index={index} />
        ))}

      </div>
    </div>
    </div>
  );
};

export default AboutPageComponent;
