import React from 'react'
import BlogPageComponent from '../../components/BlogPageComponent'
import Brands from '../../components/Brands'
import './styles.css'

const BlogPage = () => {
  return (
    <div className='home-categories-bg '>
        <BlogPageComponent/>
        <Brands/>
    </div>
  )
}

export default BlogPage