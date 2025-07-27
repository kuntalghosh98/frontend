// import React,{ useEffect, useState } from "react";
// import axios from 'axios';
// import Image from "next/image";
// import OrderMainCard from "@/components/Order/OrderMainCard";
// import { url } from '@/constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { Router, useRouter } from 'next/router';
// import emptyOrder from '../Utility/icons/emptyOrder.png';
// // OrdersPage.js
// const OrdersPage = () => {
//   const router=useRouter()
//   const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const user = useSelector((state) => state.user.user);
//   useEffect(() => {
//     if (!isDataAvailable) {
//       router.push('/');
//     }
//   }, [isDataAvailable, router]);
 
//   let [orders, setOrder] = useState([])
//   const fetchOrders = async () => {
//     const response = await axios.get(`${url}api/orders/user/${user._id}`);
//     console.log("cart items order page component", response.data)
//     setOrder(response.data)
//     // console.log(orders.length>0)
//   };
//   useEffect(() => {
//     if (isLoggedIn && user) {
//       fetchOrders();
//     }
//   }, [isLoggedIn, user]);
  
 
//   console.log("orders",orders)
//   // useEffect(() => {
//   //   fetchOrders()
    
//   // }, [])
//   return (
//     <div className="mt-100px" style={{"margin-top":"100px"}}>
//       {orders.length>0 ? (
//         orders.map((items)=><OrderMainCard key={items._id} items={items}/>)
//       ): (
//         <div className="flex flex-col justify-center items-center min-h-screen">
//           <Image
//             src={emptyOrder}
//             alt="Empty order"
//             className="mb-4 max-w-xs md:max-w-sm lg:max-w-md h-auto"
//           />
//           <button
//             onClick={() => window.history.back()}
//             className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
//           >
//             Back to Shopping
//           </button>
//         </div>
//       )}
      
      
//     </div>


//   )
// };

// export default OrdersPage;





import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import OrderMainCard from "@/components/Order/OrderMainCard";
import { fetchUserOrdersApi } from "@/api/orderApi"; // Abstracted API call
import Spinner from "@/components/Spinner";
import emptyOrder from "../Utility/icons/emptyOrder.png";

const OrdersPage = () => {
  const router = useRouter();
  const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetchUserOrdersApi(user._id); // Use the abstracted API function
      setOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isDataAvailable) {
      router.push("/");
    }
  }, [isDataAvailable, router]);

  useEffect(() => {
    if (isLoggedIn && user?._id) {
      fetchOrders();
    }
  }, [isLoggedIn, user?._id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-24">
      {orders.length > 0 ? (
        orders.map((items) => <OrderMainCard key={items._id} items={items} />)
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Image
            src={emptyOrder}
            alt="Empty order"
            className="mb-4 max-w-xs md:max-w-sm lg:max-w-md h-auto"
          />
          <p className="text-gray-500 mb-4">You have no orders yet. Start shopping now!</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Back to Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;