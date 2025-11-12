// components/Banner/BannerSkeleton.js

import React from "react";

const BannerSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full animate-pulse">
      
      {/* Left Banner Image Skeleton */}
      <div className="w-full lg:w-1/2 flex justify-center bg-white p-4">
        <div className="w-full h-[300px] lg:h-[450px] bg-gray-200 rounded-lg"></div>
      </div>

      {/* Right Banner Products Skeleton */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-4">
        <div className="grid grid-cols-2 gap-4 w-full">

          {[1,2,3,4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden p-2 flex flex-col"
            >
              <div className="w-full h-[160px] bg-gray-200 rounded"></div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default BannerSkeleton;
