

// components/Cards/HorizontalScrollCard.js

import React, { useEffect, useRef, useState } from 'react';
import HorizontalScrollCardItem from './HorizontalScrollCardItem';
import { url } from '@/constant';
const HorizontalScrollCard = ({ cards }) => {
 
console.log("card--------------------------------",cards)
     

  return (
    <div className="relative">
      <div
        
        className="w-full flex  overflow-x-scroll no-scrollbar space-x-4 p-4"
       
      >
        {cards.map((card, index) => (
          <HorizontalScrollCardItem key={index} imageUrl={`${url}uploads/${card.image}`} insideimage={`${url}uploads/${card.insideimage}`} route={card.categoryName} />
        ))}
      </div>
   
    </div>
  );
};

export default HorizontalScrollCard;



