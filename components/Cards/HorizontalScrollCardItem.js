// import React from 'react';
// import Router from 'next/router';

// const HorizontalScrollCardItem = ({ imageUrl,insideimage, route }) => {
//   const handleClick = () => {
//     Router.push(
//       {
//         pathname: "/products",
//         query: { category: route },
//       },
//       undefined,
//       { shallow: true } // This prevents a full reload
//     );
    
//     sessionStorage.setItem("selectedImage", insideimage); // Store image in session storage
//   };
// let catagoryName=route.split(" ").splice(-1);
// let catagoryName1=catagoryName.toString().toUpperCase()
// console.log(catagoryName1)
//   return (
//     <div
//       className="relative w-full sm:w-full md:w-2/3 lg:w-1/2 md:h-80 lg:h-96 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0"
//       onClick={handleClick}
//     >
//       {/* Overlay for the text */}
//       <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-end justify-start">
//         <h3 className="pr-4 pl-3 mb-2 backdrop-blur-md bg-white/30  text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold ">{catagoryName1}</h3>
//       </div>

//       {/* Image */}
//       <img src={imageUrl} alt="Card Image" className="w-full h-60 md:h-80 lg:h-96 object-cover" />
//     </div>
//   );
// };

// export default HorizontalScrollCardItem;



// components/Cards/HorizontalScrollCardItem.js

import React from 'react';
import Router from 'next/router';

const HorizontalScrollCardItem = ({ imageUrl, insideimage, route }) => {
  const handleClick = () => {
    Router.push(
      {
        pathname: "/products",
        query: { category: route },
      },
      undefined,
      { shallow: true }
    );
    sessionStorage.setItem("selectedImage", insideimage);
  };

  const categoryName = route?.split(" ").pop()?.toUpperCase() || "";

  return (
    <div
      className="relative w-full sm:w-full md:w-2/3 lg:w-1/2 md:h-80 lg:h-96 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0"
      onClick={handleClick}
    >
      {/* Overlay Text */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 flex items-end justify-start">
        <h3 className="pr-4 pl-3 mb-2 backdrop-blur-md bg-white/30 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          {categoryName}
        </h3>
      </div>

      {/* Card Image */}
      <img
        src={imageUrl}
        alt={`${categoryName} Image`}
        className="w-full h-60 md:h-80 lg:h-96 object-cover"
      />
    </div>
  );
};

export default HorizontalScrollCardItem;
