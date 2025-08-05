// pages/search.js

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ProductCard from '../components/Product/ProductCard'; // Replace with your actual ProductCard component

const SearchPage = () => {
  const router = useRouter();
  const { category } = router.query; // Access category from query string
  const products = useSelector(state => state.products.items);
console.log("products ---9995555", products);
  // Split category into individual search words
  const searchWords = category ? category.split(/[,\s]+/) : [];
console.log(searchWords)
  // Function to filter products by matching all search words
  const filterProductsByAllWords = () => {
    const matchingProducts = products.filter(product =>
      searchWords.every(word =>
        product.category.toLowerCase().includes(word.toLowerCase())
      )
    );
    return matchingProducts;
  };

  // Function to filter products by matching any search words
  const filterProductsByAnyWord = () => {
    const matchingProducts = products.filter(product =>
      searchWords.some(word =>
        product.category.toLowerCase().includes(word.toLowerCase())
      )
    );
    return matchingProducts;
  };

  // Determine the products to display based on search strategy
  const filteredProducts = filterProductsByAllWords();
  const anyWordMatches = filterProductsByAnyWord().length > 0;

  useEffect(() => {
    // Optionally, you can fetch products here if not already loaded into Redux
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Search Results for {category}</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <>
          {searchWords.length > 0 && anyWordMatches && (
            <div className="text-xl text-gray-600 mb-4">
              No exact match found for {category}. Showing similar products:
            </div>
          )}
          {searchWords.length > 0 && !anyWordMatches && (
            <div className="text-xl text-gray-600 mb-4">
              No products found matching any search word: {category}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filterProductsByAnyWord().map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {searchWords.length === 0 && (
            <p className="text-xl text-gray-600 mt-8">
              Please enter a search term to find products.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
