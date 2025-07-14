import React from 'react'
import HeaderSwiper from '../../components/HeaderSwiper'
import HomeCategories from '../../components/HomeCategories'
import HomePopular from '../../components/HomePopular'

const HomePage = () => {
  return (
    <div>
        <HeaderSwiper/>
        <HomeCategories/>
        <HomePopular/>
    </div>
  )
}

export default HomePage