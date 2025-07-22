import React from 'react'
import AboutPageComponent from '../../components/AboutPageComponent'
import AboutOffers from '../../components/AboutOffers'
import './styles.css'
import Brands from '../../components/Brands'

const AboutPage = () => {
  return (
    <div className='home-categories-bg'>
        <AboutPageComponent/>
        <AboutOffers/>
        <Brands/>
    </div>
  )
}

export default AboutPage