import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './styles.css';
import { getBlogPage } from '../../api/blogpage';
import BlogPageCard from '../../shared/BlogPageCard';
import Breadcrumb from '../Bredcrumb/BreadCrumb';

const BlogPageComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['blogpage'],
    queryFn: getBlogPage,
  });

  const blogs = data?.data || [];
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const currentBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-cover bg-center bg-no-repeat py-10">
       <div className="home_bg flex items-center justify-center py-10">
        <Breadcrumb />
      </div>
      <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
          {currentBlogs.map((blogpage) => (
            <BlogPageCard key={blogpage.id} blogpage={blogpage} />
          ))}
        </div>

        <ul className="etheme-pagination flex justify-center mt-10 space-x-3 items-center">
  {currentPage > 1 && (
    <li>
      <button
        onClick={() => goToPage(currentPage - 1)}
        className="page-square"
      >
        <i className="ri-arrow-left-wide-fill"></i>
      </button>
    </li>
  )}

  {[...Array(totalPages)].map((_, index) => {
    const page = index + 1;
    return (
      <li key={page}>
        <button
          onClick={() => goToPage(page)}
          className={`page-square ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      </li>
    );
  })}

  {currentPage < totalPages && (
    <li>
      <button
        onClick={() => goToPage(currentPage + 1)}
        className="page-square"
      >
        <i className="ri-arrow-right-wide-fill"></i>
      </button>
    </li>
  )}
</ul>

      </div>
    </div>
  );
};

export default BlogPageComponent;

