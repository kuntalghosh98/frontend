import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="relative">
      <div className="w-full flex overflow-x-scroll no-scrollbar space-x-4 p-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="relative w-full sm:w-full md:w-2/3 lg:w-1/2 md:h-80 lg:h-96 bg-gray-300 animate-pulse rounded-lg flex-shrink-0"
          >
            {/* Title placeholder */}
            <div className="absolute bottom-4 left-4 h-7 w-32 bg-gray-400/70 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
