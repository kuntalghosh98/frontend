// components/ProductScrollBanner/ProductCard.js

import React from 'react';
import Router from 'next/router';

const ProductCard = ({ product }) => {
  console.log("")
  const handleClick = () => {
    Router.push(`./productDetailsCard?id=${product._id}`)
  };

  return (
    <div
      className="w-60 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0"
      onClick={handleClick}
    >
      <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;