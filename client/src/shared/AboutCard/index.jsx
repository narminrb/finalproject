import React from 'react';
import './styles.css';
const AboutUsCard = ({ about, index }) => {
    const isReversed = index % 2 === 1; 
    return (
      <div className={`about-container ${isReversed ? 'reverse' : ''}`}>
        <div className="about-image-wrapper">
          <img
            src={`http://localhost:3000/${about.image.replace(/\\/g, '/')}`}
            alt={about.name}
            className="about-image"
          />
  
          <div className="about-text-box">
            <h2 className="about-name">{about.name}</h2>
            <p className="about-desc">{about.description}</p>
            <p className="about-desc2">{about.description2}</p>
            <button className="btn medium see-details-btn">See details</button>
          </div>
        </div>
      </div>
    );
  };
  

export default AboutUsCard;
