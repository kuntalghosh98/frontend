import React,{ useEffect, useState } from "react";
import axios from 'axios';
import OrderMainCard from "@/components/Order/OrderMainCard";
import { url } from '@/constant';

// OrdersPage.js
const OrdersPage = () => {
  const userId = '66d223a317934303f16f1a51'
  let [orders, setOrder] = useState([])
  const fetchOrders = async () => {
    const response = await axios.get(`${url}api/orders/user/${userId}`);
    console.log("cart items order page component", response.data)
    setOrder(response.data)
    // console.log(orders.length>0)
  };
  console.log(orders)
  useEffect(() => {
    fetchOrders()
    
  }, [])
  return (
    <div className="mt-100px" style={{"margin-top":"100px"}}>
      {orders.length>0 ? (
        orders.map((items)=><OrderMainCard key={items._id} items={items}/>)
      ):"ghosh "}
      
      
    </div>


  )
};

export default OrdersPage;
