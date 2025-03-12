
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import CartItem from '../Cart/CartItem';
import OrderdItem from './OrderdItem';
import OrderSubCard from './OrderSubCard';
import plus from '../Assets/plus.png'
import Image from 'next/image';
import { url,urlImg } from '@/constant';
const OrderMainCard=({items})=> {
    console.log("order main card",items)
    // const [more,setMore]=useState(false)
    var more
    const router=useRouter();
    // const [orderdItem,setOrderdItem]=useState({})
    const orderdItems=items.items;
    let imageUrl=[]
   if(orderdItems){

    orderdItems.forEach(item => {
        // console.log("element",item)
         
        let veriant=item.productId.variants;
        if(veriant){
        veriant.forEach(element => {
          if(element.color==item.variantColor){
           console.log("inside")
            imageUrl.push(element.imageUrls[0])
          }
        });
        }

    });
   }
    console.log("imageUrl",imageUrl)
    
    if(imageUrl && imageUrl.length>3){
        imageUrl = imageUrl.slice(0, 3);
        more=true
    }
    console.log("imageUrlXXXXX",imageUrl)
    const OrderClick=()=>{
        router.push(`./OrderDetailPage?id=${items._id}`)
      }

  return (
    <div>
    <div className='border m-4 p-4 flex flex-row'onClick={OrderClick}>
        <div className="flex items-center">
            {imageUrl ?(
                imageUrl.map((url)=><img key={url.index} src={`${urlImg}${url}`} alt="item.name" className="w-20 h-20 object-cover pr-1" />)
            ):"k"}
          {/* {more?(<Image src={plus} alt="itemname" className="w-5 h-5 object-cover" />):""} */}
        </div>
        <div className='w-full flex justify-end '>
          <div>
          {/* <p>{items._id}</p> */}
          <p>{`Order date : ${items.createdAt.slice(0, 10)}`}</p>
          <p>{`Total Amount : ${items.payment.amount/100}`}</p>
          <p>{`Order Id : ${items._id}`}</p>
          </div>
           
        </div>
       
    {/* {orderdItems.length>0 ? (
        orderdItems.map((item)=> <OrderdItem item={item}/> )
    ):""} */}

{/* {orderdItems.length>0 ? (
        orderdItems.map((item)=> <OrderSubCard/> )
    ):""} */}
    </div>
    
    </div>
  )
}

export default OrderMainCard

