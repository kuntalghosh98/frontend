


// import React from 'react';
// import { useRouter } from 'next/router';
// import { urlImg } from '@/constant';

// const OrderMainCard = ({ items }) => {
//   const router = useRouter();
//   const orderedItems = items.items;
//   let imageUrls = [];

//   // Extract first image from each variant
//   orderedItems?.forEach((item) => {
//     const variant = item.productId.variants.find(
//       (variant) => variant.color === item.variantColor
//     );
//     if (variant?.imageUrls?.[0]) {
//       imageUrls.push(variant.imageUrls[0]);
//     }
//   });

//   const isMore = imageUrls.length > 3;
//   if (isMore) imageUrls = imageUrls.slice(0, 3);

//   const handleOrderClick = () => {
//     router.push(`./orderdetailpage?id=${items._id}`);
//   };

//   return (
//     <div>
//       <div
//         className="border m-4 p-4 flex flex-row items-center cursor-pointer"
//         onClick={handleOrderClick}
//       >
//         <div className="flex items-center space-x-2">
//           {imageUrls.map((img, index) => (
//             <img
//               key={index}
//               src={`${urlImg}${img}`}
//               alt={`Product ${index}`}
//               className="w-20 h-20 object-cover rounded"
//             />
//           ))}
//           {/* Uncomment if you want a '+' icon for more */}
//           {/* {isMore && <Image src={plus} alt="More" className="w-5 h-5 object-cover" />} */}
//         </div>

//         <div className="w-full flex justify-end">
//           <div className="text-right">
//             <p>{`Order date: ${items.createdAt.slice(0, 10)}`}</p>
//             <p>{`Total Amount: ₹${items.payment.amount / 100}`}</p>
//             <p className="text-sm text-gray-600">{`Order ID: ${items._id}`}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderMainCard;



import React from 'react';
import { useRouter } from 'next/router';
import { urlImg } from '@/constant';

const OrderMainCard = ({ items }) => {
  const router = useRouter();
  const orderedItems = items.items;
  let imageUrls = [];

  // Get variant thumbnails
  orderedItems?.forEach((item) => {
    const variant = item.productId.variants.find(
      (v) => v.color === item.variantColor
    );
    if (variant?.imageUrls?.[0]) imageUrls.push(variant.imageUrls[0]);
  });

  const isMore = imageUrls.length > 3;
  if (isMore) imageUrls = imageUrls.slice(0, 3);

  const handleOrderClick = () => {
    router.push(`./orderdetailpage?id=${items._id}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4 hover:shadow-md transition cursor-pointer bg-white flex flex-row items-center justify-between"
    onClick={handleOrderClick}>
  {/* Image */}
  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded overflow-hidden border shadow-sm">
  <img
    src={`${imageUrls[0]}`}
    alt="Order preview"
    className="object-cover w-full h-full"
  />

  {orderedItems.length > 1 && (
    <div className="absolute top-0 right-0 bg-black bg-opacity-60 text-white text-xs md:text-sm font-semibold px-2 py-1 rounded-bl-md">
      +{orderedItems.length - 1}
    </div>
  )}
</div>


  {/* Info */}
  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col text-right flex-1">
    <p className="text-sm text-gray-500 mb-1">
      <span className="font-medium text-gray-700">Order Date:</span> {items.createdAt.slice(0, 10)}
    </p>
    <p className="text-base font-semibold text-black mb-1">
      Total Amount: ₹{items.payment.amount / 100}
    </p>
    <p className="text-xs text-gray-400">
      Order ID: {items._id}
    </p>
  </div>
</div>

  );
};

export default OrderMainCard;
