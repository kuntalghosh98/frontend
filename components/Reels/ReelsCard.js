

import React from 'react';
import Router from 'next/router';

const Reelscard = ({ reel }) => {
  console.log("")
  const handleClick = () => {
    Router.push(`./productDetailsCard?id=${product._id}`)
  };

  return (
    <div
      className="w-60 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer flex-shrink-0"
      onClick={handleClick}
    >
        <video
        src={reel}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-100 object-cover"
      />
    </div>
  );
};

export default Reelscard;
