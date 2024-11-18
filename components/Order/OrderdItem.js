import React from 'react'

const OrderdItem=({item})=> {
     let imageUrl=""
     let veriant=item.productId.variants;
     if(veriant){
     veriant.forEach(element => {
       if(element.color==item.variantColor){
        console.log("inside")
         imageUrl=element.imageUrls[0]   
       }
     });
     }

  return (
    <div className="flex justify-between items-center m-8 border-t py-4">
    <div className="flex items-center">
      <img src={imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
      <div className="ml-4">
        <h2 className="text-lg font-bold">{item.productId.name}</h2>
        <p className="text-black-600">{item.category}</p>
        
      </div>
      <div className="ml-4 w-16 text-center border rounded">
        <h2 className="text-lg font-bold"  >{item.quantity}</h2>
      </div>
      <div className="ml-4 w-16 text-center border rounded">
        <h2 className="text-lg font-bold"  >{item.size}</h2>
      </div>
    </div>
    <div className="flex items-center">

      
    </div>
  </div>
  )
}

export default OrderdItem
