import React from "react";

const ProductScrollSkeleton = () => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="flex space-x-4 px-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-60 bg-white rounded-md shadow-md overflow-hidden flex-shrink-0 animate-pulse"
          >
            {/* Image placeholder */}
            <div className="w-full h-60 bg-gray-300"></div>

            <div className="p-4 space-y-3">
              {/* Name placeholder */}
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>

              {/* Price placeholder */}
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductScrollSkeleton;

