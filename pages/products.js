// Optimized Products.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@/components/Product/ProductCard';
import MediaBanner from '@/components/MediaBanner';
import Filter from '@/components/Filter';
import { fetchProducts } from '@/store/slices/productSlice';
import { fetchBannerCards } from '@/store/slices/bannerCardSlice';
import { url } from '@/constant';

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category } = router.query;

  const products = useSelector((state) => state.products.items);
  const bannerCards = useSelector((state) => state.bannerCards.items?.data || []);
console.log("products ---999", products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [insideImage, setInsideImage] = useState('');

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
    if (bannerCards.length === 0) dispatch(fetchBannerCards());

    // Restore selected banner image if available
    const selectedImg = sessionStorage.getItem("selectedImage");
    if (category && selectedImg) setInsideImage(selectedImg);

    const refreshed = sessionStorage.getItem("isRefreshed");
    if (!refreshed) sessionStorage.setItem("isRefreshed", "true");
  }, []);

  useEffect(() => {
    if (bannerCards.length && category) {
      const cardsArray = bannerCards[0]?.cards || [];
      const matched = cardsArray.find(
        (item) => item.categoryName.toLowerCase() === category.toLowerCase()
      );
      if (matched?.insideimage) setInsideImage(`${url}uploads/${matched.insideimage}`);
    }else{
      setFilteredProducts(products);
    }
  }, [bannerCards, category]);

  useEffect(() => {
    if (products.length > 0 && category) {
      const filtered = products.filter((product) =>
        product.category.includes(category)
      );
      setFilteredProducts(filtered);
    }
  }, [products, category]);

  const handleFilter = (filteredList) => setFilteredProducts(filteredList);

  const heading = category ? category.split(" ").pop().toUpperCase() : '';

  return (
    <div className="bg-[#f9f7f3]">
      <MediaBanner imageUrl={insideImage} />
      <div className="text-center py-4 text-4xl font-semibold">{heading}</div>
      <aside className="w-1/4 p-4 hidden md:block">
          <Filter products={filteredProducts} onFilter={handleFilter} />
        </aside>
      <div className="flex">
        

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-lg font-medium">Sorry, all out</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
