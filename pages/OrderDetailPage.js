import React, { useEffect, useState } from 'react';
import {useParams} from 'next/navigation';
import { useRouter } from 'next/router';
import OrderdItem from '../components/Order/OrderdItem';
import AddressCard from '@/components/Address/AddressCard';
import axios from 'axios';
import { url } from '@/constant';
const orderdetailpage=()=> {
    const router = useRouter();
   const [orderdItem,setOrderdItem]=useState([])
   const [deliveryAddress,setDeliveryAddress]=useState({})
   const [orderId,setOrderId]=useState()
    
   

    const fetchOrder= async (id)=>{
        const response = await axios.get(`${url}api/orders/${id}`);
        console.log("response----------------",response.data)
        setOrderdItem(response.data.items)
        setDeliveryAddress(response.data.address)
        setOrderId()

    }
    useEffect(()=>{
       
        const {id}=router.query;
        console.log("useeffect",id)
        console.log(id)
        fetchOrder(id);
        
    },[])

  return (
    <div style={{"margin-top":"100px"}}>
       {orderdItem.length>0 ? (
        orderdItem.map((item)=> <OrderdItem key={item._id} item={item}/> )
    ):""}
      <AddressCard 
            // key={address._id} 
            address={deliveryAddress} 
           
          />
    </div>
  )
}

export default orderdetailpage
