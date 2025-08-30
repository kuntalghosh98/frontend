

// import React from "react";
// import Router from "next/router";
// import { useDispatch } from "react-redux";
// import { addRecentlyViewed } from "../../store/slices/recentlyViewedSlice";
// import { cancelOrderItemApi, requestReturnApi } from "@/api/orderApi";

// const OrderdItem = ({ item, shipment,orderId }) => {
//   console.log("order items ---", item);
//   console.log("shipment info ---", shipment);
//   const dispatch = useDispatch();
//   const productId = item.productId._id;

//   const variant = item.productId.variants.find(
//     (variant) => variant.color === item.variantColor
//   );
//   const imageUrl = variant?.imageUrls?.[0] || "";

//   const handleClick = () => {
//     dispatch(addRecentlyViewed(productId));
//     Router.push(`/productDetailsCard?id=${productId}`);
//   };

//   const handleCancel = async () => {
//     if (!confirm("Are you sure you want to cancel this item?")) return;
//     try {
//       await cancelOrderItemApi({
//         orderId: orderId, // ✅ needs to be passed down from parent
//         itemId: item._id,
//       });
//       alert("Cancellation request submitted.");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to cancel item.");
//     }
//   };

//   const handleReturn = async () => {
//     if (!confirm("Do you want to request a return for this item?")) return;
//     try {
//       await requestReturnApi({
//         orderId: item.orderId,
//         productId: item.productId._id,
//         reason: "Not satisfied", // later can add popup for reason
//       });
//       alert("Return request submitted.");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to request return.");
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 shadow-sm mb-6 hover:shadow-md transition bg-white">
//       <div className="flex flex-row gap-4 items-start">
//         {/* Image (click navigates to product details) */}
//         <img
//           src={imageUrl}
//           alt={item.productId.name}
//           className="w-28 h-28 md:w-32 md:h-32 object-cover rounded border cursor-pointer"
//           onClick={handleClick}
//         />

//         {/* Details */}
//         <div className="flex flex-col justify-between w-full">
//           <h2
//             className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer"
//             onClick={handleClick}
//           >
//             {item.productId.name}
//           </h2>

//           <p className="text-sm text-gray-500 mb-2">
//             {item.category || "Jewelry"}
//           </p>

//           <div className="flex flex-wrap gap-8 text-sm text-gray-700 mb-2">
//             {item.size && <span>Size: {item.size}</span>}
//             <span>Quantity: {item.quantity}</span>
//           </div>

//           {/* Delivery Status */}
//           {shipment && (
//             <div className="text-sm text-gray-800 mb-2">
//               <span className="font-medium">Delivery Status: </span>
//               <span
//                 className={`${
//                   shipment.status === "delivered"
//                     ? "text-green-600"
//                     : shipment.status === "shipped"
//                     ? "text-blue-600"
//                     : shipment.status === "cancelled"
//                     ? "text-red-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {shipment.status}
//               </span>
//               {shipment.trackingUrl && (
//                 <a
//                   href={shipment.trackingUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="ml-3 text-blue-500 underline"
//                 >
//                   Track Package
//                 </a>
//               )}
//             </div>
//           )}

//           {/* Return Status */}
//           {item.return && item.return.initiated && (
//             <div className="text-sm mt-1">
//               <span className="font-medium">Return Status: </span>
//               <span
//                 className={`${
//                   item.return.status === "refunded"
//                     ? "text-green-600"
//                     : item.return.status === "rejected"
//                     ? "text-red-600"
//                     : "text-orange-600"
//                 }`}
//               >
//                 {item.return.status}
//               </span>
//             </div>
//           )}

//           {/* 🔹 Action Buttons */}
//           <div className="mt-3 flex gap-4">
//             {/* Cancel if still pending/shipped */}
//             {(["pending", "shipped" , ""].includes(shipment?.status) && !item.cancel) || !shipment  && (
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//               >
//                 Cancel
//               </button>
//             )}

//             {/* Return if delivered & not already returned */}
//             {shipment?.status === "delivered" && !item.return?.initiated && (
//               <button
//                 onClick={handleReturn}
//                 className="px-4 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
//               >
//                 Return
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderdItem;
 


import React from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../store/slices/recentlyViewedSlice";
import { cancelOrderItemApi, requestReturnApi } from "@/api/orderApi";

const OrderdItem = ({ item, shipment,orderId }) => {
  console.log("order items ---", item);
  console.log("shipment info ---", shipment);
  
  const dispatch = useDispatch();
  const productId = item.productId._id;

  const variant = item.productId.variants.find(
    (variant) => variant.color === item.variantColor
  );
  const imageUrl = variant?.imageUrls?.[0] || "";

  const handleClick = () => {
    dispatch(addRecentlyViewed(productId));
    Router.push(`/productDetailsCard?id=${productId}`);
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this item?")) return;
    try {
      await cancelOrderItemApi({
        orderId: orderId, // ✅ needs to be passed down from parent
        itemId: item._id,
      });
      alert("Cancellation request submitted.");
    } catch (error) {
      console.error(error);
      alert("Failed to cancel item.");
    }
  };

  const handleReturn = async () => {
    if (!confirm("Do you want to request a return for this item?")) return;
    try {
      await requestReturnApi({
        orderId: item.orderId,
        productId: item.productId._id,
        reason: "Not satisfied", // later add popup for reason
      });
      alert("Return request submitted.");
    } catch (error) {
      console.error(error);
      alert("Failed to request return.");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-6 hover:shadow-md transition bg-white">
      <div className="flex flex-row gap-4 items-start">
        {/* Image (click navigates to product details) */}
        <img
          src={imageUrl}
          alt={item.productId.name}
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded border cursor-pointer"
          onClick={handleClick}
        />

        {/* Details */}
        <div className="flex flex-col justify-between w-full">
          <h2
            className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer"
            onClick={handleClick}
          >
            {item.productId.name}
          </h2>

          <p className="text-sm text-gray-500 mb-2">
            {item.category || "Jewelry"}
          </p>

          <div className="flex flex-wrap gap-8 text-sm text-gray-700 mb-2">
            {item.size && <span>Size: {item.size}</span>}
            <span>Quantity: {item.quantity}</span>
          </div>

          {/* Delivery Status */}
          {shipment && (
            <div className="text-sm text-gray-800 mb-2">
              <span className="font-medium">Delivery Status: </span>
              <span
                className={`${
                  shipment.status === "delivered"
                    ? "text-green-600"
                    : shipment.status === "shipped"
                    ? "text-blue-600"
                    : shipment.status === "cancelled"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {shipment.status}
              </span>
              {shipment.trackingUrl && (
                <a
                  href={shipment.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 text-blue-500 underline"
                >
                  Track Package
                </a>
              )}
            </div>
          )}

          {/* Cancellation Status */}
          {item.cancellation && item.cancellation.initiated && (
            <div className="text-sm mt-1">
              <span className="font-medium">Cancellation Status: </span>
              <span
                className={`${
                  item.cancellation.status === "approved"
                    ? "text-green-600"
                    : item.cancellation.status === "rejected"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {item.cancellation.status}
              </span>
            </div>
          )}

          {/* Return Status */}
          {item.return && item.return.initiated && (
            <div className="text-sm mt-1">
              <span className="font-medium">Return Status: </span>
              <span
                className={`${
                  item.return.status === "refunded"
                    ? "text-green-600"
                    : item.return.status === "rejected"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {item.return.status}
              </span>
            </div>
          )}

          {/* 🔹 Action Buttons */}
          <div className="mt-3 flex gap-4">
            {/* Cancel only if not already cancelled */}
            {(["pending", "shipped" , ""].includes(shipment?.status) && !item.cancel) || !shipment &&
              !(item.cancellation && item.cancellation.initiated) && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              )}

            {/* Return if delivered & not already returned */}
            {shipment?.status === "delivered" &&
              !(item.return && item.return.initiated) && (
                <button
                  onClick={handleReturn}
                  className="px-4 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                >
                  Return
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderdItem;
