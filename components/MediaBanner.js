import React from 'react';

const MediaBanner = (props) => {
  const bannerUrl=props.banner
  
  return (
    <div className="relative w-full h-[80vh] md:h-screen lg:h-screen bg-cover bg-center mb-8">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src={bannerUrl}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl text-white font-bold text-center">Welcome to Our Store</h1>
        </div>
      </div>
    </div>
  );
};

export default MediaBanner;
