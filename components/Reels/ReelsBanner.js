import React from 'react';
import Reelscard from './ReelsCard';
import { url } from '@/constant';
const ReelsBanner = ({ products }) => {
    const reels=[
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/w_1000,q_auto,f_auto/v1753817145/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_7_jcqlbn.mp4`,
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/v1753982713/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_21_ecke86.mp4`,
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/v1753983759/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_51_npgpr6.mp4`,
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/v1753983760/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_31_jkwhxz.mp4`,
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/v1753983761/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_61_hy43lg.mp4`,
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/v1753983761/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_11_uux4it.mp4`,
        `https://res.cloudinary.com/dkhhjhpbc/video/upload/v1753983762/Brown_White_Simple_Jewellery_Sale_Sale_Your_Story_owizr7.mp4`
    ]
  return (
    <div className="w-full overflow-x-auto no-scrollbar p-4">
      <div className="flex space-x-4">
        {reels.map((reel, index) => (
          <Reelscard key={index} reel={reel} />
        ))}
      </div>




    </div>
  );
};

export default ReelsBanner;