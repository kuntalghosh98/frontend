// components/Product/ProductCard.js

import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { url,urlImg } from '@/constant';
import { useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../store/slices/recentlyViewedSlice";

const ProductCard = ({ product, callFrom = '', userId = '', handleRemove  }) => {
  const router=useRouter();
  // console.log("product card userId",userId)

  const dispatch = useDispatch();
  const imgUl1 = `${urlImg}${product.variants[0].imageUrls[0]}`; // Default image
  const imgUl2 = `${urlImg}${product.variants[0].imageUrls[1] || product.variants[0].imageUrls[0]}`; // Hover image, fallback to default
  const [currentImage, setCurrentImage] = useState(imgUl1);
  // console.log("imgurl11",imgUl1);
  const productClick=()=>{
    dispatch(addRecentlyViewed(product._id));
    router.push(`./productDetailsCard?id=${product._id}`)
  }
  
  return (
    <div>
 <div className="bg-white rounded-md   cursor-pointer" onClick={productClick}
    
    onMouseEnter={() => setCurrentImage(imgUl2)}
    onMouseLeave={() => setCurrentImage(imgUl1)}
    >
      <img src={currentImage} alt={product.name} className="w-full h-60 object-cover shadow-md transition-all duration-300" />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-gray-800 mt-2 ">
              {product?.discount && product.discount > 0 ? (
                <span className="flex items-center space-x-2">
                  {/* Original Price with Strikethrough */}
                  <span className="line-through text-gray-500">₹{product.price}</span>

                  {/* Discounted Price */}
                  <span className="text-black font-semibold">
                    ₹{(product.price - (product.price * product.discount) / 100).toFixed(2)}
                  </span>

                  {/* Discount Percentage */}
                  <span className="text-green-600 font-semibold">
                    {product.discount}% off
                  </span>
                </span>
              ) : (
                // Normal Price if no discount is available
                `₹${product.price}`
              )}
            </p>


    
    
    </div>
    {(callFrom === "wishList") && ( <div className="flex items-center">
       <button
          onClick={() => handleRemove(product._id)}
          className=" bg-black text-white px-4 py-2 rounded" 
        >
          Remove
        </button>
        
      </div>) }
    </div>
   
  );
};

export default ProductCard;
