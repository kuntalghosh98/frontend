// components/Banner/BannerCard.js

import React from 'react';
import Router from 'next/router';

const BannerCard = ({ imageUrl, route }) => {
  const handleClick = () => {
    // Router.push(route); // Navigate to the specified route onClick
  };

  return (
    <div
      className="w-full  bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0"
      onClick={handleClick}
    >
      <img src={imageUrl} alt="Banner Image" className="w-full h-full object-cover cursor-pointer" />
    </div>
  );
};

export default BannerCard;
