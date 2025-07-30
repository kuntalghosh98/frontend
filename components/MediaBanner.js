


// components/MediaBanner.js
import React from 'react';
import { url } from '@/constant';

const MediaBanner = ({ imageUrl, text = '', callFrom = '' }) => {
  const bannerUrl = imageUrl || `${url}uploads/video11.mp4`;
  const optimizedurl= "https://res.cloudinary.com/dkhhjhpbc/video/upload/w_1000,q_auto,f_auto/v1753728547/video11_jzj1qq.mp4";

  const isVideo = /\.(mp4|webm|ogg)$/i.test(bannerUrl);


  return (
    <div className="relative w-full h-[70vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center mb-8">
      <div className="absolute top-0 left-0 w-full h-full">
        {isVideo ? (
          <video
            src={optimizedurl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={bannerUrl}
            alt="Media Banner"
            className="w-full h-full object-cover"
          />
        )}

        {/* Optional overlay text */}
        {text && (
  <div className="absolute inset-0 bg-black bg-opacity-40">
    <h1
      className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl lg:text-4xl text-white 
      md:top-3/4 lg:top-[48vh] top-[45vh]
      "
      style={{ 
        // top: '45vh',
        fontFamily: "'Brush Script MT', cursive" }}
    >
      {text}
    </h1>
  </div>
)}

      </div>
    </div>
  );
};

export default MediaBanner;
