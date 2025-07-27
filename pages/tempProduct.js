

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import OrderdItem from "../components/Order/OrderdItem";
// import AddressCard from "@/components/Address/AddressCard";
// import { fetchOrderApi } from "@/api/orderApi"; // Abstracted API call
// import Spinner from "@/components/Spinner";

// const OrderDetailPage = () => {
//   const router = useRouter();
//   const [orderdItem, setOrderdItem] = useState([]);
//   const [deliveryAddress, setDeliveryAddress] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchOrder = async (id) => {
//     try {
//       const response = await fetchOrderApi(id); // Use the abstracted API function
//       setOrderdItem(response.items);
//       setDeliveryAddress(response.address);
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const { id } = router.query;
//     if (id) {
//       fetchOrder(id);
//     }
//   }, [router.query.id]);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="mt-24">
//       {orderdItem.length > 0 ? (
//         orderdItem.map((item) => <OrderdItem key={item._id} item={item} />)
//       ) : (
//         <p className="text-center text-gray-500">No items found in this order.</p>
//       )}
//       <AddressCard address={deliveryAddress} />
//     </div>
//   );
// };

// export default OrderDetailPage;


import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderdItem from "../components/Order/OrderdItem";
import AddressCard from "@/components/Address/AddressCard";
import { fetchOrderApi } from "@/api/orderApi";
import Spinner from "@/components/Spinner";

const OrderDetailPage = () => {
  const router = useRouter();
  const [orderdItem, setOrderdItem] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = async (id) => {
    try {
      const response = await fetchOrderApi(id);
      setOrderdItem(response.items);
      setDeliveryAddress(response.address);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchOrder(id);
    }
  }, [router.query.id]);

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-24 mb-10">
      <h1 className="text-2xl font-serif text-gray-800 mb-6 border-b pb-2">Order Details</h1>

      {orderdItem.length > 0 ? (
        orderdItem.map((item) => <OrderdItem key={item._id} item={item} />)
      ) : (
        <p className="text-center text-gray-500">No items found in this order.</p>
      )}

      {/* Address Section */}
      <div className="mt-10">
        <h2 className="text-xl font-serif mb-3">Delivery Address</h2>
        <AddressCard address={deliveryAddress} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
