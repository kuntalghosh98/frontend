import React from 'react';
import ProductCard from './ProductCard';

const ProductScrollList = ({ products,name }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar ">
      <div className="flex space-x-4">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={index === products.length - 1 ? "mr-8" : ""} // Add extra right margin to last card
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductScrollList;