// // components/ProductScrollBanner/ProductCard.js
// import React, { useState } from "react";
// import Router from "next/router";
// import { urlImg } from "@/constant";
// import { useDispatch } from "react-redux";
// import { addRecentlyViewed } from "../../store/slices/recentlyViewedSlice";


// const ProductCard = ({ product }) => {
//   // console.log("product card", product);

//   const imgUl1 = `${urlImg}${product.variants[0].imageUrls[0]}`; // Default image
//   const imgUl2 = `${urlImg}${product.variants[0].imageUrls[1] || product.variants[0].imageUrls[0]}`; // Hover image, fallback to default
//   const dispatch = useDispatch();
//   const [currentImage, setCurrentImage] = useState(imgUl1);

//   const handleClick = () => {
//     dispatch(addRecentlyViewed(product._id));
//     Router.push(`./productDetailsCard?id=${product._id}`);
//   };

//   return (
//     <div
//       className="w-60 bg-red-50   overflow-hidden cursor-pointer flex-shrink-0"
//       onClick={handleClick}
//       onMouseEnter={() => setCurrentImage(imgUl2)}
//       onMouseLeave={() => setCurrentImage(imgUl1)}
//     >
      


//       <img src={currentImage} alt={product.name} className="w-full h-60 object-cover shadow-md transition-all duration-300" />
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{product.name}</h3>
//         <p className="text-gray-800 mt-2 ">
//               {product?.discount && product.discount > 0 ? (
//                 <span className="flex items-center space-x-2">
//                   {/* Original Price with Strikethrough */}
//                   <span className="line-through text-gray-500">₹{product.price}</span>

//                   {/* Discounted Price */}
//                   <span className="text-black font-semibold">
//                     ₹{(product.price - (product.price * product.discount) / 100).toFixed(2)}
//                   </span>

//                   {/* Discount Percentage */}
//                   <span className="text-green-600 font-semibold">
//                     {product.discount}% off
//                   </span>
//                 </span>
//               ) : (
//                 // Normal Price if no discount is available
//                 `₹${product.price}`
//               )}
//             </p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



// components/ProductScrollBanner/ProductCard.js
import React, { useState } from "react";
import Router from "next/router";
import { urlImg } from "@/constant";
import { useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../store/slices/recentlyViewedSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const variant = product.variants?.[0] || {};
  const image1 = `${urlImg}${variant.imageUrls?.[0] || ""}`;
  const image2 = `${urlImg}${variant.imageUrls?.[1] || variant.imageUrls?.[0] || ""}`;
  const [currentImage, setCurrentImage] = useState(image1);

  const handleClick = () => {
    dispatch(addRecentlyViewed(product._id));
    Router.push(`./productDetailsCard?id=${product._id}`);
  };

  const renderPrice = () => {
    const price = product.price;
    const discount = product.discount || 0;

    if (discount > 0) {
      const discountedPrice = (price - (price * discount) / 100).toFixed(2);
      return (
        <span className="flex items-center space-x-2">
          <span className="line-through text-gray-500">₹{price}</span>
          <span className="text-black font-semibold">₹{discountedPrice}</span>
          <span className="text-green-600 font-semibold">{discount}% off</span>
        </span>
      );
    }

    return `₹${price}`;
  };

  return (
    <div
      className="w-60 bg-white rounded-md shadow-md overflow-hidden cursor-pointer flex-shrink-0 hover:scale-[1.02] transition-transform"
      onClick={handleClick}
      onMouseEnter={() => setCurrentImage(image2)}
      onMouseLeave={() => setCurrentImage(image1)}
    >
      <img
        src={currentImage}
        alt={product.name}
        className="w-full h-60 object-cover transition-all duration-300"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-gray-800 mt-2">{renderPrice()}</p>
      </div>
    </div>
  );
};

export default ProductCard;

