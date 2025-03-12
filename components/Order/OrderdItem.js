import React from 'react';
import Router from "next/router";
import { urlImg } from "@/constant";
import { useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../store/slices/recentlyViewedSlice";

const OrderdItem=({item})=> {
  const dispatch = useDispatch();
     let imageUrl=""
     let productId='';
     productId=item.productId._id;
     let veriant=item.productId.variants;
     console.log("inside",productId)
     if(veriant){
     veriant.forEach(element => {
       if(element.color==item.variantColor){
        console.log("inside",element)
         imageUrl=element.imageUrls[0]   
       }
     });
     }
     const handleClick = () => {
      dispatch(addRecentlyViewed(productId));
      Router.push(`./productDetailsCard?id=${productId}`);
    };
  return (
    <div className="flex justify-between items-center m-8 border-t py-4">
    <div className="flex items-center" onClick={handleClick}>
      <img src={`${urlImg}${imageUrl}`} alt={item.name} className="w-20 h-20 object-cover" />
      <div className="ml-4">
        <h2 className="text-lg font-bold">{item.productId.name}</h2>
        <p className="text-black-600">{item.category}</p>
        
      </div>

        <div className="ml-2 flex flex-col items-start">
          <h2>Quantity</h2>
          <div className="ml-0 mt-2 w-16 text-center border rounded">
            <h2 className="text-lg font-bold">{item.quantity}</h2>
          </div>
        </div>
        {item.size && (<div className="ml-2 flex flex-col items-start">
          <h2>Size</h2>
          <div className="ml-0 mt-2 w-16 text-center border rounded">
            <h2 className="text-lg font-bold">{item.size}</h2>
          </div>
        </div>)}
        
      
        
    </div>
    <div className="flex items-center">

      
    </div>
  </div>
  )
}

export default OrderdItem
