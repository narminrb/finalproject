import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';

const BlogCard = ({ popular }) => {
  const trimmedDescription = popular.descfirst
    .split(' ')
    .slice(0, 15)
    .join(' ') + '...';
  return (
    <div className="overflow-hidden">
      <div className='blog_image'>
                <img
            src={`http://localhost:3000/${popular.imagefirst.replace(/\\/g, '/')}`}
            alt={popular.name}
            style={{
                height: '225px',
                width: '100%',
                objectFit: 'cover',
            }}
            className="blog-image"
            />

      </div>
      <div className="outer_popular">
        <h2 className='blog_name'>{popular.name}</h2>
        <p className='popular_desc'>{trimmedDescription}</p>
        <div>
            <h2 className='blog_read'>
            <Link to={`/blog/${popular.id}`}>Continue Reading</Link>
            </h2>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
