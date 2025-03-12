import React from 'react';
import Reelscard from './ReelsCard';
import { url } from '@/constant';
const ReelsBanner = ({ products }) => {
    const reels=[
        `${url}uploads/reels1.mp4`,
        `${url}uploads/reels2.mp4`,
        `${url}uploads/reels3.mp4`,
        `${url}uploads/reels4.mp4`,
        `${url}uploads/reels5.mp4`,
        `${url}uploads/reels6.mp4`,
        `${url}uploads/reels7.mp4`
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