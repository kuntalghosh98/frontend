// components/Banner/BannerProducts.js

import React from 'react';
import Router from 'next/router';

const BannerProducts = ({ products }) => {

  console.log("bannercard",products)
  const handleClick = (route) => {
    Router.push(`./productDetailsCard?id=${route}`)// Navigate to the specified route onClick
  };

  const getGridClasses = () => {
    switch (products.length) {
      case 1:
        return "w-[50vh] h-[50vh]  justify-center items-center px-10";
      case 2:
        return "grid grid-cols-2 gap-4 flex w-full  h-[40vh]";
      case 3:
        return "w-full flex-col grid grid-cols-2 gap-4 h-[70vh] justify-center items-center";
      case 4:
        return "w-full flex-col grid grid-cols-2 gap-4 h-[70vh] justify-center items-center";
      default:
        return "";
    }
  };

  const getItemClasses = () => {
    switch (products.length) {
      case 1:
        return "w-full h-full";
      case 2:
        return "w-full h-full";
      case 3:
        return "w-full h-full sm:max-w-80";
      case 4:
        return "w-full h-full sm:max-w-80";
      default:
        return "";
    }
  };

  return (
    <div className={`${getGridClasses()} p-4 overflow-auto`}>
      {products.map((product, index) => (
        <div 
          key={product._id} 
          className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${getItemClasses()} ${products.length === 3 && index === 2 ? ' flex justify-center' : ''}`}
          onClick={() => handleClick(product._id)}
        >
          <div className="w-full">
            <img src={product.imageUrl} alt="Product Image" className="w-full h-3/4 object-cover" />
            <div className="p-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerProducts;
