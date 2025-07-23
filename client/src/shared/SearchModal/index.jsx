// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const SearchModal = ({ onClose, categories, products }) => {
//   const [query, setQuery] = useState("");

//   // Trending example
//   const trending = ["spring", "flowers", "art"];

//   // Filter products based on search query
//   const filtered = products.filter((p) =>
//     p.name.toLowerCase().includes(query.toLowerCase())
//   );

//   // Count products per category — compare product.category._id to category._id
//   const categoryCounts = categories.map((cat) => {
//     const count = products.filter((p) => p.category?._id === cat._id).length;
//     return { ...cat, count };
//   });

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ y: "-100%" }}
//         animate={{ y: 0 }}
//         exit={{ y: "-100%" }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="fixed top-0 left-0 w-full h-[600px] bg-white z-[1000] shadow-lg overflow-y-auto"
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-6 text-3xl text-gray-700 hover:text-black"
//         >
//           ✕
//         </button>

//         <div className="flex flex-col items-center mt-16 px-4">
//           <h2 className="text-3xl font-semibold mb-6">What are you looking for?</h2>

//           {/* Search input */}
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border-b-2 border-gray-300 focus:outline-none focus:border-[#74a8b5] text-xl w-1/2 text-center mb-6"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />

//           {/* Trending searches */}
//           <div className="mb-8">
//             <h3 className="text-lg font-medium mb-3">Trending Searches:</h3>
//             <div className="flex gap-3 flex-wrap justify-center">
//               {trending.map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => setQuery(item)}
//                   className="px-3 py-1 border rounded-full hover:bg-[#74a8b5] hover:text-white transition"
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Popular categories */}
//           <div className="w-full max-w-5xl">
//             <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//               {categoryCounts.map((cat) => (
//                 <div
//                   key={cat._id}
//                   className="flex flex-col items-center text-center"
//                 >
//                   <img
//                     src={`http://localhost:3000/${cat.image.replace(/\\/g, "/")}`}
//                     alt={cat.category}
//                     className="w-24 h-24 object-cover rounded-lg shadow"
//                   />
//                   <p className="mt-2 font-medium">{cat.category}</p>
//                   <p className="text-sm text-gray-500">{cat.count} products</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Search results */}
//           {query && (
//             <div className="w-full max-w-5xl mt-10">
//               <h3 className="text-xl font-semibold mb-4">
//                 Results for "{query}"
//               </h3>
//               {filtered.length > 0 ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {filtered.map((p) => (
//                     <div key={p._id} className="flex flex-col items-center">
//                       <img
//                         src={`http://localhost:3000/${p.image.replace(/\\/g, "/")}`}
//                         alt={p.name}
//                         className="w-32 h-32 object-cover rounded-lg shadow"
//                       />
//                       <p className="mt-2 font-medium">{p.name}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No products found.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default SearchModal;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SearchModal = ({ onClose, categories, products }) => {
  const [query, setQuery] = useState("");

  const trending = ["spring", "flowers", "art"];

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const categoryCounts = categories.map((cat) => {
    const count = products.filter((p) => p.category?._id === cat._id).length;
    return { ...cat, count };
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ height: query ? "100vh" : "600px" }}
        className="fixed top-0 left-0 w-full bg-white z-[1000] shadow-lg overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-3xl text-gray-700 hover:text-black"
        >
          ✕
        </button>

        <div className="flex flex-col items-center mt-16 px-4">
          <h2 className="text-3xl font-semibold mb-6">What are you looking for?</h2>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            className="border-b-2 border-gray-300 focus:outline-none focus:border-[#74a8b5] text-xl w-1/2 text-center mb-6 text-black placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Trending searches */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Trending Searches:</h3>
            <div className="flex gap-3 flex-wrap justify-center">
              {trending.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1 border rounded-full hover:bg-[#74a8b5] hover:text-white transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Show categories only if no search query */}
          {!query && (
            <div className="w-full max-w-5xl">
              <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {categoryCounts.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex flex-col items-center text-center"
                  >
                    <img
                      src={`http://localhost:3000/${cat.image.replace(/\\/g, "/")}`}
                      alt={cat.category}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />
                    <p className="mt-2 font-medium">{cat.category}</p>
                    <p className="text-sm text-gray-500">{cat.count} products</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show products only if there is a search query */}
          {query && (
            <div className="w-full max-w-5xl mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Results for "{query}"
              </h3>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filtered.map((p) => (
                    <div key={p._id} className="flex flex-col items-center">
                      <img
                        src={`http://localhost:3000/${p.image.replace(/\\/g, "/")}`}
                        alt={p.name}
                        className="w-32 h-32 object-cover rounded-lg shadow"
                      />
                      <p className="mt-2 font-medium text-black">{p.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;

