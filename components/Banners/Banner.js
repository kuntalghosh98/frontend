// components/Banner/Banner.js

import React from 'react';
import BannerCard from './BannerCard';
import BannerProducts from './BannerProducts';
import { url } from '@/constant';

const Banner = ({ cardData,productData=[] }) => {
    console.log("highlighted card",cardData);
    
    console.log("highlighted card productData",cardData.products);
    console.log("banner")
  return (
    <div className="flex lg:flex-row flex-col w-[100hw]">
    <div className="w-full lg:w-[50%] sm:h-auto lg:h-[80h] flex justify-center bg-white p-4">
      <BannerCard imageUrl={`${url}uploads/${cardData.image}`} />
    </div>
   
    <div className="w-full lg:w-[50%] sm:h-auto lg:h-[80h]  flex justify-center items-center bg-white ">
       <BannerProducts products={cardData.products}/>
      
    </div>
  </div>
  );
};

export default Banner;
