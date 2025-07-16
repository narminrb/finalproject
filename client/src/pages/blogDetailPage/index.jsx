import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '../../api/blogdetail';
import './styles.css'

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useQuery({
    queryKey: ['blogDetail', id],
    queryFn: () => getBlogById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Blog not found</p>;

  return (
    <div className='home-categories-bg py-15'>
    <div className="container max-w-screen-xl mx-auto px-3 relative">
        <div className="home_bg">
        <h2 className="category_title">Insects Pencil Drawings</h2>
      </div>
    <div className="blog-detail-container">
      <div className="blog-header-img">
        <img src={`http://localhost:3000/${blog.imagefirst.replace(/\\/g, '/')}`} alt={blog.name} />
      </div>

      <div className="blog-detail-content">
        <h1 className="blog-title">{blog.name}</h1>
        <div className="blog-meta"><i class="ri-calendar-2-line"></i> {new Date(blog.date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})} / Posted by Rose Tyler / <i class="ri-eye-line"></i> {blog.views}</div>

        <p className="blog-desc">{blog.descfirst}</p>

        <div className="blog-section">
          <div className="section-left">
            <img src={`http://localhost:3000/${blog.imagesecond.replace(/\\/g, '/')}`} alt="Second" />
          </div>
          <div className="section-right">
            <p>{blog.descsecond}</p>
          </div>
        </div>

        <div className="blog-section reverse">
          <div className="section-left">
            <p>{blog.descthird}</p>
          </div>
          <div className="section-right">
            <img src={`http://localhost:3000/${blog.imagethird.replace(/\\/g, '/')}`} alt="Third" />
          </div>
        </div>
      </div>
        <div className='icons'>
        <i class="ri-twitter-x-line"></i>
        <i class="ri-facebook-fill"></i>
        <i class="ri-pinterest-line"></i>
        <i class="ri-mail-line"></i>
        <i class="ri-linkedin-fill"></i>
        <i class="ri-skype-fill"></i>
        </div>
    </div>
    </div>
    </div>
  );
};

export default BlogDetailPage;
