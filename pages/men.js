// pages/men.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/Product/ProductCard';
import MediaBanner from '@/components/MediaBanner';
import CategoryCardScroll from '@/components/Cards/CategoryCardScroll';
import { useRouter } from 'next/router';
import { url } from '@/constant';
const Men = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const productData1 = [
    {
      imageUrl: "http://localhost:4000/uploads/banner_ 1720212570132.jpg",
      route: '/path/to/product1-route',
      name: 'Product 1',
      price: 29.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    {
      imageUrl: '/path/to/product2-image.jpg',
      route: '/path/to/product2-route',
      name: 'Product 2',
      price: 49.99,
    },
    // Add more products as needed
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch men's products from your API
        const response = await axios.get(`${url}/api/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto ">
        <MediaBanner/>
        <CategoryCardScroll products={productData1}/>
      <h1 className="text-3xl font-bold mb-4">Men's Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Men;
