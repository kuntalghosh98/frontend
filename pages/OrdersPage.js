import React,{ useEffect, useState } from "react";
import axios from 'axios';
import OrderMainCard from "@/components/Order/OrderMainCard";
import { url } from '@/constant';
import { useDispatch, useSelector } from 'react-redux';
import { Router, useRouter } from 'next/router';

// OrdersPage.js
const OrdersPage = () => {
  const router=useRouter()
  const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!isDataAvailable) {
      router.push('/');
    }
  }, [isDataAvailable, router]);
 
  let [orders, setOrder] = useState([])
  const fetchOrders = async () => {
    const response = await axios.get(`${url}api/orders/user/${user._id}`);
    console.log("cart items order page component", response.data)
    setOrder(response.data)
    // console.log(orders.length>0)
  };
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchOrders();
    }
  }, [isLoggedIn, user]);
  
 
  console.log("orders",orders)
  // useEffect(() => {
  //   fetchOrders()
    
  // }, [])
  return (
    <div className="mt-100px" style={{"margin-top":"100px"}}>
      {orders.length>0 ? (
        orders.map((items)=><OrderMainCard key={items._id} items={items}/>)
      ):"ghosh "}
      
      
    </div>


  )
};

export default OrdersPage;
