import React, { useEffect, useState } from 'react';
import './styles.css'
import first from '../../assets/first.webp'
import second from '../../assets/second.webp'
import third from '../../assets/third.webp'
import ReviewsTab from '../ReviewsTab';
import { getReviews, postReview } from '../../api/shopreview';

const ShopTabs = ({ productId }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (activeTab === 'reviews') {
      getReviews(productId).then((data) => setReviews(data));
    }
  }, [activeTab, productId]);
  

  return (
    <div className="tabs-container">
      <div className="tabs">
        {['description', 'additional', 'reviews'].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'description'
              ? 'Description'
              : tab === 'additional'
              ? 'Additional Information'
              : 'Reviews'}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div>
            <p className='desc_text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
            <div className='grid grid-cols-3'>
                <div className='img_grids'>
                <img src={first} alt="" />
                <p className='desc_text'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                </div>
                <div className='img_grids'>
                <img src={second} alt="" />
                <p className='desc_text'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                </div>
                <div className='img_grids'>
                <img src={third} alt="" />
                <p className='desc_text'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
                </div>
            </div>
            <div className='grid grid-cols-2'>
            <p className='desc_text'>
            Commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Incididunt ut labore et dolore magna aliqua. Ut nostrud exercitation ullamco.
                </p>
                <p className='desc_text'>
                Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. Incididunt ut labore et dolore magna aliqua. Ut nostrud exercitation ullamco.
                </p>
            </div>
          </div>
    
        )}
        {activeTab === 'additional' && (
          <p>This section shows additional product information.</p>
        )}
       {activeTab === 'reviews' && (
          <ReviewsTab
          productId={productId}     
          reviews={reviews}
          onSubmit={async (reviewData) => {
            try {
              const savedReview = await postReview(reviewData);
              setReviews(prev => [savedReview, ...prev]);
            } catch (error) {
              alert('Failed to submit review: ' + error.message);
            }
          }}
        />
        
        )}

      </div>
    </div>
  );
};

export default ShopTabs;
