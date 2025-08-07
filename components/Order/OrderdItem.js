


// import React from 'react';
// import Router from 'next/router';
// import { urlImg } from '@/constant';
// import { useDispatch } from 'react-redux';
// import { addRecentlyViewed } from '../../store/slices/recentlyViewedSlice';

// const OrderdItem = ({ item }) => {
//   const dispatch = useDispatch();
//   const productId = item.productId._id;

//   // Get the first image of the matched variant
//   const variant = item.productId.variants.find(
//     (variant) => variant.color === item.variantColor
//   );
//   const imageUrl = variant?.imageUrls?.[0] || '';

//   const handleClick = () => {
//     dispatch(addRecentlyViewed(productId));
//     Router.push(`./productDetailsCard?id=${productId}`);
//   };

//   return (
//     <div className="flex justify-between items-center m-8 border-t py-4">
//       <div className="flex items-center cursor-pointer" onClick={handleClick}>
//         <img
//           src={`${urlImg}${imageUrl}`}
//           alt={item.productId.name}
//           className="w-20 h-20 object-cover"
//         />
//         <div className="ml-4">
//           <h2 className="text-lg font-bold">{item.productId.name}</h2>
//           <p className="text-black-600">{item.category}</p>
//         </div>

//         <div className="ml-4 flex flex-col items-start">
//           <h2>Quantity</h2>
//           <div className="mt-1 w-16 text-center border rounded">
//             <h2 className="text-lg font-bold">{item.quantity}</h2>
//           </div>
//         </div>

//         {item.size && (
//           <div className="ml-4 flex flex-col items-start">
//             <h2>Size</h2>
//             <div className="mt-1 w-16 text-center border rounded">
//               <h2 className="text-lg font-bold">{item.size}</h2>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderdItem;


import React from 'react';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { urlImg } from '@/constant';
import { addRecentlyViewed } from '../../store/slices/recentlyViewedSlice';

const OrderdItem = ({ item }) => {
  const dispatch = useDispatch();
  const productId = item.productId._id;

  const variant = item.productId.variants.find(
    (variant) => variant.color === item.variantColor
  );
  const imageUrl = variant?.imageUrls?.[0] || '';

  const handleClick = () => {
    dispatch(addRecentlyViewed(productId));
    Router.push(`/productDetailsCard?id=${productId}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-6 hover:shadow-md transition bg-white">
      <div
        className="flex flex-row gap-4 items-start cursor-pointer"
        onClick={handleClick}
      >
        {/* Image */}
        <img
          src={`${imageUrl}`}
          alt={item.productId.name}
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded border"
        />

        {/* Details */}
        <div className="flex flex-col justify-between w-full">
          {/* Name */}
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {item.productId.name}
          </h2>

          {/* Category */}
          <p className="text-sm text-gray-500 mb-2">
            {item.category || 'Jewelry'}
          </p>

          {/* Size & Quantity row */}
          <div className="flex flex-wrap gap-8 text-sm text-gray-700">
            {item.size && <span>Size: {item.size}</span>}
            <span>Quantity: {item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderdItem;
