import React from 'react';
import { url } from '@/constant';
const MediaBanner = (props) => {
  let bannerUrl=props.imageUrl ? props.imageUrl : "" ;
  let text=props.text ? props.text : "";
  let callFrom=props.callFrom ? props.callFrom : "";
  if(bannerUrl==''){
    bannerUrl=  `${url}uploads/video11.mp4`;
  }
 

  console.log("bannerUrl-----------------------------");
  console.log(bannerUrl)
  return (
    <div className="relative w-full h-[70vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center mb-8">
      <div className="absolute top-0 left-0 w-full h-full">
      {bannerUrl?.match(/\.(mp4|webm|ogg)$/) ? (
      <video
        src={bannerUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    ) : (
      <img
        src={bannerUrl}
        alt="Banner"
        className="w-full h-full object-cover"
      />
    )}
    {text !== "" && (
 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
 <h1 className="text-2xl md:text-4xl lg:text-6xl text-white font-bold text-center">{text}</h1>
</div>
    )}
       
      </div>
    </div>
  );
};

export default MediaBanner;
