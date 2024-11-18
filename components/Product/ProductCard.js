// components/Product/ProductCard.js

import React from 'react';
import { useRouter } from 'next/router';

const ProductCard = ({ product }) => {
  const router=useRouter();
  console.log("product card",product)
  const productClick=()=>{
    router.push(`./productDetailsCard?id=${product._id}`)
  }
  return (
    <div className="bg-white rounded-md shadow-md p-4 cursor-pointer" onClick={productClick}>
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-gray-800 mt-2">${product.price}</p>
    </div>
  );
};

export default ProductCard;
