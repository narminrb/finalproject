import React from 'react'
import './styles.css'
const AboutOffersCard = ({offers}) => {
  return (
    <div>
        <div className='offers_card'>
            <div className='offers_imgbox'>
            <img
        src={`http://localhost:3000/${offers.image.replace(/\\/g, '/')}`}
        alt={offers.name}
             />
            </div>
            <h2 className='offers_name'>{offers.name}</h2>
            <p className='offers_desc'>{offers.description}</p>
        </div>
    </div>
  )
}

export default AboutOffersCard