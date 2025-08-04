import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ dynamicName = '' }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  let lastName = '';
  if (pathnames.length > 0) {
    lastName = decodeURIComponent(pathnames[pathnames.length - 1]);
    if (lastName === 'aboutus') lastName = 'About Us';
    else if (lastName === 'blog') lastName = 'Blog';
    else if (lastName === 'shop') lastName = 'Shop';
    else if (lastName === 'drawing') lastName = 'Process of drawing';
    else if (lastName === 'contactus') lastName = 'Contact Us';

    if (dynamicName) lastName = dynamicName;
  }

  return (
    <nav className="text-white text-center  uppercase">
    
      <div className="text-md hover:text-[#74a8b5]">
        <Link to="/">Home <span>›</span></Link>
      </div>

      {/* Second line: full breadcrumb with last item styled */}
      <div className="flex items-center space-x-2 mt-1">
        {pathnames.length > 0 && (
          <>
            <span
              style={{
                fontFamily: 'Amithen',
                fontSize: '50px',
                lineHeight: '50px',
                textTransform: 'none',
              }}
            >
              {lastName}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumb;
