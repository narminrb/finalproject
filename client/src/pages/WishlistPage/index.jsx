import React from 'react'
import WishListPage from '../../shared/WishListPage'
import Breadcrumb from '../../components/Bredcrumb/BreadCrumb'
import Brands from '../../components/Brands'

const WishlistPage = () => {
  return (
    <div className='home-categories-bg'>
    <div className="home_bg flex items-center justify-center py-10 my-30">
    <Breadcrumb />
  </div>
  <WishListPage/>
  <Brands/>
</div>
  )
}

export default WishlistPage