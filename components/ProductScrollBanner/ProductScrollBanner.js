// components/ProductScrollBanner/ProductScrollBanner.js

import React from 'react';
import ProductCard from './ProductCard';

const ProductScrollBanner = ({ products }) => {
  return (
   

  
    <div className="w-full overflow-x-auto no-scrollbar py-4">
    
      <div className="flex space-x-4 p-4">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
   
  );
};

export default ProductScrollBanner;
