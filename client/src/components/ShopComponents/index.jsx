// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import './styles.css'
// import HomePopularCard from '../../shared/PopularItemCard';
// import { getShops } from '../../api/shop';
// import ShopCard from '../../shared/ShopCard';

// const ShopComponent = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ['shop'],
//     queryFn: getShops,
//   });

//   console.log(data)
//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="bg-cover bg-center bg-no-repeat py-10">
//             <div className='home_bg'>
//                 <h2 className='category_title'>
//                     Shop
//                 </h2>
//             </div>
//     <div className="container max-w-screen-xl mx-auto my-10 px-3 relative">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {data?.data.map((popular) => (
//           <ShopCard key={popular.id} popular={popular} />
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ShopComponent;

// import React, { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import './styles.css';
// import { getShops } from '../../api/shop'; // Make sure these work correctly
// import ShopCard from '../../shared/ShopCard';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import 'remixicon/fonts/remixicon.css';
// import { getHomeCategory } from '../../api/homeCategory';

// const ShopComponent = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState([250, 950]);
//   const [selectedPainter, setSelectedPainter] = useState('');
//   const [gridCols, setGridCols] = useState(3);
//   const [showCount, setShowCount] = useState(9);
  

//   const { data: shopData, isLoading } = useQuery({
//     queryKey: ['shop'],
//     queryFn: getShops,
//   });
//   const { data: categoriesData } = useQuery({
//     queryKey: ['categories'],
//     queryFn: getHomeCategory,
//   });

//   const painters = Array.from(
//     new Set(shopData?.data?.map((shop) => shop.painter))
//   );

//   const getCategoryName = (id) => {
//     return categoriesData?.categories?.find((cat) => cat._id === id)?.category || 'Unknown';
//   };
  

//   const filteredShops = shopData?.data?.filter((shop) => {
//     const inPrice = shop.price >= priceRange[0] && shop.price <= priceRange[1];
//     const byPainter = selectedPainter ? shop.painter === selectedPainter : true;
//     return inPrice && byPainter;
//   }) || [];

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="bg-cover bg-center bg-no-repeat py-10">
//       <div className="home_bg">
//         <h2 className="category_title">Shop</h2>
//       </div>

//     <div className="container max-w-screen-xl mx-auto px-3">
//         {/* FILTER & SORT ROW */}
// <div className="flex items-center justify-between px-4 py-2 mb-6 text-black">

// {/* Left side group: Grid toggle + Filters */}
// <div className="flex items-center gap-6">
// {/* Filter toggle */}
// <div
//     className="flex items-center gap-2 cursor-pointer select-none"
//     onClick={() => setShowFilters(!showFilters)}
//   >
//     <i className="ri-equalizer-line text-xl"></i>
//     <span className="font-medium">Filters</span>
//   </div>
//   {/* Grid toggle buttons */}
//   <div className="flex gap-3">
    
//     <button
//       onClick={() => setGridCols(3)}
//       className={`p-2 rounded cursor-pointer ${gridCols === 3 ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-100'}`}
//       aria-label="Grid 3 columns"
//       type="button"
//     >
//       <i className="ri-layout-grid-2-fill text-xl"></i>
//     </button>
//     <button
//       onClick={() => setGridCols(2)}
//       className={`p-2 rounded cursor-pointer ${gridCols === 2 ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-100'}`}
//       aria-label="Grid 2 columns"
//       type="button"
//     >
//       <i className="ri-layout-grid-fill text-xl"></i>
//     </button>
//   </div>

// </div>

// {/* Right side: Pagination "Show" dropdown */}
// <div>
//   <span className="mr-2">Show</span>
//   <select
//     value={showCount}
//     onChange={(e) => setShowCount(Number(e.target.value))}
//     className="border rounded px-2 py-1"
//   >
//     {[9, 12, 24, 36, 'All'].map((n) => (
//       <option key={n} value={n}>
//         {n}
//       </option>
//     ))}
//   </select>
// </div>

// </div>


//       {/* FILTER PANEL */}
//       {showFilters && (
//         <div className="bg-gray-50 p-4 rounded shadow mb-6 space-y-4 grid grid-cols-3 gap-6">
//         {/* Price Filter */}
//         <div>
//           <h4 className="font-semibold mb-2">Filter By Price</h4>
//           <div className="relative">
//             <Slider
//               range
//               min={250}
//               max={950}
//               value={priceRange}
//               onChange={setPriceRange}
//             />
//             <div className="flex justify-between items-center mt-2">
//               <div className="text-sm text-gray-600">
//                 Price: ${priceRange[0]} - ${priceRange[1]}
//               </div>
//               <button
//                 onClick={() => setPriceRange([250, 950])}
//                 className="text-blue-600 text-sm underline ml-4"
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
      
//         {/* Painter Filter */}
//         <div>
//           <h4 className="font-semibold mb-2 text-black">Painter</h4>
//           {painters.map((painterName) => (
//             <div key={painterName} className="flex items-center gap-2 text-black">
//               <input
//                 type="checkbox"
//                 checked={selectedPainter === painterName}
//                 onChange={() => setSelectedPainter(painterName === selectedPainter ? '' : painterName)}
//               />
//               <label>{painterName}</label>
//             </div>
//           ))}
//         </div>
      
//         {/* Empty 3rd Column */}
//         <div></div>
//       </div>
      
//       )}
//     </div>

//       {/* SHOP GRID */}
//       <div className="container max-w-screen-xl mx-auto px-3">
//         <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} gap-6`}>
//           {filteredShops
//             .slice(0, showCount === 'All' ? undefined : showCount)
//             .map((shop) => (
//               <ShopCard
//                 key={shop.id}
//                 popular={{ ...shop, categoryName: getCategoryName(shop.category) }}
//               />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopComponent;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './styles.css';
import { getShops } from '../../api/shop'; 
import ShopCard from '../../shared/ShopCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'remixicon/fonts/remixicon.css';
import { getHomeCategory } from '../../api/homeCategory';

const ShopComponent = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([250, 950]);

  const [selectedPainters, setSelectedPainters] = useState([]);

  const [gridCols, setGridCols] = useState(3);
  const [showCount, setShowCount] = useState(9);

  const { data: shopData, isLoading } = useQuery({
    queryKey: ['shop'],
    queryFn: getShops,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getHomeCategory,
  });

  const painters = Array.from(
    new Set(shopData?.data?.map((shop) => shop.painter))
  );

  const getCategoryName = (id) => {
    return categoriesData?.categories?.find((cat) => cat._id === id)?.category || 'Unknown';
  };

  const togglePainter = (painterName) => {
    if (selectedPainters.includes(painterName)) {
      setSelectedPainters(selectedPainters.filter((p) => p !== painterName));
    } else {
      setSelectedPainters([...selectedPainters, painterName]);
    }
  };

  const clearAllPainters = () => setSelectedPainters([]);

  const filteredShops = shopData?.data?.filter((shop) => {
    const inPrice = shop.price >= priceRange[0] && shop.price <= priceRange[1];

    const byPainter =
      selectedPainters.length > 0 ? selectedPainters.includes(shop.painter) : true;

    return inPrice && byPainter;
  }) || [];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-cover bg-center bg-no-repeat py-10">
      <div className="home_bg">
        <h2 className="category_title">Shop</h2>
      </div>

      <div className="container max-w-screen-xl mx-auto px-3">
        <div className="flex items-center justify-between px-4 py-2 mb-6 text-black">
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="ri-equalizer-line filter-icon"></i>
              <span className="filter">Filters</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded cursor-pointer ${
                  gridCols === 3 ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-100'
                }`}
                aria-label="Grid 3 columns"
                type="button"
              >
                <i className="ri-layout-grid-2-fill text-xl"></i>
              </button>
              <button
                onClick={() => setGridCols(2)}
                className={`p-2 rounded cursor-pointer ${
                  gridCols === 2 ? 'bg-gray-200 text-blue-600' : 'hover:bg-gray-100'
                }`}
                aria-label="Grid 2 columns"
                type="button"
              >
                <i className="ri-layout-grid-fill text-xl"></i>
              </button>
            </div>
          </div>
          <div className='flex justify-center'>
            <span className="mr-2 text-[#888] text-[16px]">Show</span>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="pagenit"
            >
              {[9, 12, 24, 36, 'All'].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showFilters && (
          <div className=" p-4 rounded mb-6 space-y-4 grid grid-cols-3 gap-6">
            <div>
              <h4 className="pricename">Filter By Price</h4>
              <div className="relative">
                <Slider
                  range
                  min={250}
                  max={950}
                  value={priceRange}
                  onChange={setPriceRange}
                  trackStyle={[{ backgroundColor: '#74A8B5' }]}
                  handleStyle={[{ borderColor: '#74A8B5', backgroundColor: '#74A8B5' }]}
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-[16px] text-[#555555]">
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </div>
                  <button
                    onClick={() => setPriceRange([250, 950])}
                    className="text-gray-600 text-sm underline ml-4"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="pricename">Painter</h4>
              {painters.map((painterName) => (
                <div key={painterName} className="flex items-center gap-2 text-[16px] text-[#888]">
                  <input
                    type="checkbox"
                    className='check'
                    checked={selectedPainters.includes(painterName)}
                    onChange={() => togglePainter(painterName)}
                    id={`painter-${painterName}`}
                  />
                  <label htmlFor={`painter-${painterName}`}>{painterName}</label>
                </div>
              ))}
            </div>
            <div>
              <h4 className="pricename">Selected Painters</h4>
              <div className="flex flex-wrap gap-2 items-center">
                {selectedPainters.length > 0 ? (
                  <>
                    <button
                      onClick={clearAllPainters}
                      className="clear text-[#222] px-3 py-1  hover:bg-red-600"
                      type="button"
                    >
                      Clear All
                    </button>
                    {selectedPainters.map((painter) => (
                      <button
                        key={painter}
                        onClick={() => togglePainter(painter)}
                        className="painterbtn"
                        type="button"
                      >
                        <span>{painter}</span>
                        <span className="cursor-pointer text-[#222] ml-1">×</span>
                      </button>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500"></p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container max-w-screen-xl mx-auto px-3">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols} gap-6`}>
          {filteredShops
            .slice(0, showCount === 'All' ? undefined : showCount)
            .map((shop) => (
              <ShopCard
                key={shop.id}
                popular={{ ...shop, categoryName: getCategoryName(shop.category) }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShopComponent;
