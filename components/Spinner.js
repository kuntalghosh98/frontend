
import React from "react";
import {OrbitProgress,ThreeDot} from "react-loading-indicators";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      
      {/* <OrbitProgress color="#000000" size="medium" text="" textColor="" /> */}
      <ThreeDot color="#000000" size="medium" text="" textColor="" />
    </div>
  );
};

export default Spinner;
