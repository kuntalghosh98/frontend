// components/Cards/HorizontalScrollCardItem.js

import React from 'react';
import Router from 'next/router';

const HorizontalScrollCardItem = ({ imageUrl, route }) => {

  const handleClick = () => {
    Router.push(`/products?catagory=${route}`); // Navigate to the specified route onClick
  };

  return (
    <div
       className="w-full sm:w-full lg:w-1/2 lg:h-96 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0 "
      onClick={handleClick}
    >
      <img src={imageUrl} alt="Card Image" className="w-full h-60 lg:h-96 object-cover " />
    </div>
  );
};

export default HorizontalScrollCardItem;
