
// //components\Banners\BannerProducts.js
// import React from 'react';
// import Router from 'next/router';
// import { urlImg } from '@/constant';

// const BannerProducts = ({ products }) => {
//   console.log("bannercard-------------------*", products);

//   const handleClick = (route) => {
//     Router.push(`./productDetailsCard?id=${route}`);
//   };

//   const getGridClasses = () => {
//     switch (products.length) {
//       case 1:
//         return "w-[50vh] h-[50vh] flex justify-center items-center px-10";
//       case 2:
//         return "grid grid-cols-2 gap-4 w-full h-[40vh]";
//       case 3:
//       case 4:
//         return "grid grid-cols-2 gap-4 w-full h-auto";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className={`${getGridClasses()} p-4  `}>
//       {products.map((product) => (
//         <div 
//           key={product._id} 
//           className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
//           onClick={() => handleClick(product._id)}
//         >
//           {/* Ensure the height is balanced */}
//           <div className="w-full flex flex-col h-full">
//             <img 
//               src={`${urlImg}${product.variants[0].imageUrls[0]}`} 
//               alt="Product Image" 
//               className="w-full h-[200px] object-cover"
//             />
//             <div className="p-2 flex flex-col items-center text-center">
//               <h3 className="text-lg font-semibold truncate w-full">{product.name}</h3>
//               <p className="text-sm text-gray-600">₹{product.price}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BannerProducts;







// components/Banner/BannerProducts.js

import React from 'react';
import { useRouter } from 'next/router';
import { urlImg } from '@/constant';

const BannerProducts = ({ products = [] }) => {
  const router = useRouter();

  const handleClick = (productId) => {
    router.push(`/productDetailsCard?id=${productId}`);
  };

  const getGridClasses = () => {
    switch (products.length) {
      case 1:
        return "w-[50vh] h-[50vh] flex justify-center items-center px-10";
      case 2:
        return "grid grid-cols-2 gap-4 w-full h-[40vh]";
      case 3:
      case 4:
        return "grid grid-cols-2 gap-4 w-full h-auto";
      default:
        return "grid grid-cols-2 gap-4 w-full h-auto";
    }
  };

  return (
    <div className={`${getGridClasses()} p-4`}>
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          onClick={() => handleClick(product._id)}
        >
          <div className="w-full flex flex-col h-full">
            <img
              src={`${product.variants?.[0]?.imageUrls?.[0]}`}
              alt={product.name || 'Product'}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-2 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold truncate w-full">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerProducts;