// components/Header/SearchBar.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { setSearchQuery } from '../../store/slices/searchSlice';
import { useRouter } from 'next/router';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  
  const products = useSelector((state) => state.products.items);
  console.log("search bar",products)

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      router.push(`/search?category=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const getSuggestions = (query) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    const categoryMap = {};

    products.forEach((product) => {
      const category = product.category.toLowerCase();
      if (category.includes(lowerQuery)) {
        if (categoryMap[category]) {
          categoryMap[category].count += 1;
        } else {
          categoryMap[category] = {
            name: product.category,
            count: 1,
          };
        }
      }
    });

    return Object.values(categoryMap);
  };

  const handleSuggestionClick = (category) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
    onClose();
  };

  const suggestions = getSuggestions(query);

  return (
    <div className="fixed top-0 left-0 right-0 h-3/4 w-full max-w-2xl mx-auto bg-white z-50 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <FontAwesomeIcon
          icon={faTimes}
          className="text-gray-500 hover:text-black cursor-pointer ml-4"
          onClick={onClose}
        />
      </div>
      <div>
        {query && (
          <div className="absolute top-18 left-0 right-0 max-w-screen-lg mx-auto bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
            {suggestions.length > 0 ? (
              suggestions.map((category) => (
                <div
                  key={category.name}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(category.name)}
                >
                  {category.name} ({category.count})
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No suggestions found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
