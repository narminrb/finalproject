import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import './styles.css'

const ContactComponent = () => {
//   const { id } = useParams();
//   const { data: blog, isLoading, isError } = useQuery({
//     queryKey: ['contact'],
//     queryFn: () => getBlogById(id),
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !blog) return <p>Blog not found</p>;

  return (
    <div className='home-categories-bg py-2'>
    <div className="container max-w-screen-xl mx-auto px-3 relative">
    <div className="blog-detail-container">
      <div className="blog-header-img">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96708.3111418599!2d-73.969231!3d40.7590615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2zTWFuaGV0dGVuLCBOeXUtWW9yaywgTnl1IFlvcmssIEFtZXJpa2EgQmlybMmZxZ9tacWfIMWedGF0bGFyxLE!5e0!3m2!1saz!2saz!4v1752685022106!5m2!1saz!2saz" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="blog-detail-content">


      </div>
    </div>
    </div>
    </div>
  );
};

export default ContactComponent;
