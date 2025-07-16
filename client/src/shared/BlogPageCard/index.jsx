import React from 'react';
import './style.css';

const BlogPageCard = ({ blogpage }) => {
  const trimmedDescription = blogpage.descfirst
    .split(' ')
    .slice(0, 45)
    .join(' ') + '...';
console.log(blogpage)
  return (
    <div className="blog-card">
      <div className="blog-image-wrapper">
        <img
          src={`http://localhost:3000/${blogpage.imagefirst.replace(/\\/g, '/')}`}
          alt={blogpage.name}
          className="blog-image"
        />
      </div>
      <div className="blog-content">
        <h2 className="blogpage_name">{blogpage.name}</h2>
        <p className="blogpage_desc">{trimmedDescription}</p>
        <h2 className="blog_read">
          <a>Continue Reading</a>
        </h2>
      </div>
    </div>
  );
};

export default BlogPageCard;
