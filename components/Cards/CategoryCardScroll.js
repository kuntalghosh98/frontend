// components/ProductScrollBanner/ProductScrollBanner.js

import React from 'react';
import CategoryCard from './CategoryCard';
import ProductCard from '../ProductScrollBanner/ProductCard';

const CategoryCardScroll = ({ products }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="flex space-x-4">
        {products.map((product, index) => (
        //   <ProductCard key={index} product={product} />
          <CategoryCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCardScroll;
