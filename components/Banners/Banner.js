// components/Banner/Banner.js

import React from 'react';
import BannerCard from './BannerCard';
import BannerProducts from './BannerProducts';


const Banner = ({ cardData,productData=[] }) => {
    console.log("highlighted card",cardData);
    
    console.log("highlighted card productData",cardData.products);
    console.log("banner")
  return (
    <div className="flex lg:flex-row flex-col w-[100hw]">
    <div className="w-full lg:w-[50%] h-[70vh] bg-white">
      <BannerCard imageUrl={cardData.image} />
    </div>
   
    <div className="w-full lg:w-[50%] sm:h-auto lg:h-[70vh] flex justify-center items-center bg-white ">
       <BannerProducts products={cardData.products}/>
      
    </div>
  </div>
  );
};

export default Banner;
