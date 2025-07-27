// //components\Spinner.js
// import React from "react";
// import {OrbitProgress,ThreeDot} from "react-loading-indicators";
// const Spinner = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
      
//       {/* <OrbitProgress color="#000000" size="medium" text="" textColor="" /> */}
//       <ThreeDot color="#000000" size="medium" text="" textColor="" />
//     </div>
//   );
// };

// export default Spinner;



// components/Spinner.js
import React from 'react';
import { ThreeDot } from 'react-loading-indicators';

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <ThreeDot color="#000000" size="medium" />
  </div>
);

export default Spinner;
