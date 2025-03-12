import React from 'react';
import Router from 'next/router';

const CategoryCard = ({ product }) => {
  const handleClick = () => {
    Router.push(product.route);
  };

  return (
    <div
      className="w-40 bg-transparent rounded-lg  overflow-hidden cursor-pointer flex-shrink-0"
      onClick={handleClick}
    >
        <div className='w-full  flex flex-grow items-center justify-center '>
        <img
        src={product.imageUrl}
        alt={product.name}
        className="w-40 h-60 rounded-2xl object-cover p-2"
      />
        </div>
      
      <div className="w-full  flex flex-grow items-center justify-center">
        <h3 className="text-lg font-bold">{product.name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
