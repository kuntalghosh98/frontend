// components/Carousel/CarouselItem.js

import React from 'react';
import Router from 'next/router';
const CarouselItem = ({ imageUrl, route }) => {
    const handleClick = () => {
        Router.push(route); // Navigate to the specified route onClick
      };
  return (
    <div
       className="w-full  sm:w-full sm:h-96 lg:w-1/2   rounded-lg  overflow-hidden cursor-pointer flex-shrink-0 p-4"
      onClick={handleClick}
    >
      <img src={imageUrl} alt="Card Image" className="w-full h-60 lg:h-96 rounded-lg object-cover bg-white shadow-md" />
    </div>
  );
};

export default CarouselItem;
