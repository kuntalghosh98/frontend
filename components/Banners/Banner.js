// // components/Banner/Banner.js

// import React from 'react';
// import BannerCard from './BannerCard';
// import BannerProducts from './BannerProducts';
// import { url } from '@/constant';

// const Banner = ({ cardData,productData=[] }) => {
//     console.log("highlighted card",cardData);
    
//     // console.log("highlighted card productData",cardData.products);
//     console.log("banner")
//   return (
//     <div className="flex lg:flex-row flex-col w-[100hw]">
//     <div className="w-full lg:w-[50%] sm:h-auto lg:h-[80h] flex justify-center bg-white p-4">
//       <BannerCard imageUrl={`${url}uploads/${cardData.image}`} />
//     </div>
   
//     <div className="w-full lg:w-[50%] sm:h-auto lg:h-[80h]  flex justify-center items-center bg-white ">
//        <BannerProducts products={cardData.products}/>
      
//     </div>
//   </div>
//   );
// };

// export default Banner;




// components/Banner/Banner.js

import React from 'react';
import BannerCard from './BannerCard';
import BannerProducts from './BannerProducts';
import { url } from '@/constant';

const Banner = ({ cardData, productData = [] }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-1/2 flex justify-center bg-white p-4">
        <BannerCard imageUrl={`${cardData.image}`} route={cardData.route} />
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white">
        <BannerProducts products={cardData.products || []} />
      </div>
    </div>
  );
};

export default Banner;

