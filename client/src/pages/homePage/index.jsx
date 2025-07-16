import React from 'react'
import HeaderSwiper from '../../components/HeaderSwiper'
import HomeCategories from '../../components/HomeCategories'
import HomePopular from '../../components/HomePopular'
import HomeShop from '../../components/HomeShop'
import HomeBlogSwiper from '../../components/HomeBlogSwiper'

const HomePage = () => {
  return (
    <div>
        <HeaderSwiper/>
        <HomeCategories/>
        <HomePopular/>
        <HomeShop/>
        <HomeBlogSwiper/>
    </div>
  )
}

export default HomePage