


// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { FaShippingFast } from 'react-icons/fa'; // Import shipping icon
// import { MdOutlineRemoveShoppingCart } from 'react-icons/md'; // Remove cart icon

// const CartSummary = () => {
//   const items = useSelector((state) => state.cart.items);
//   const router = useRouter();

//   const calculateDiscountedPrice = (item) => {
//     const price = item.productId.price;
//     const discount = item.productId.discount || 0;
//     return discount > 0 ? price - (price * discount) / 100 : price;
//   };

//   const totalPrice = items.reduce(
//     (sum, item) => sum + calculateDiscountedPrice(item) * item.quantity,
//     0
//   );

//   const deliveryCharge = totalPrice < 500 ? 100 : 0;
//   const finalAmount = totalPrice + deliveryCharge;

//   const proceedToShipping = () => {
//     router.push('/shipping');
//   };

//   return (
//     <div className=" w-full bg-white  rounded-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//         <FaShippingFast className="text-green-300 mr-2" /> Cart Summary
//       </h2>

//       {items.length === 0 ? (
//         <div className="text-center text-gray-500">
//           <MdOutlineRemoveShoppingCart className="text-6xl mx-auto mb-2" />
//           Your cart is empty.
//         </div>
//       ) : (
//         <>
//           {/* Itemized List */}
//             <div className="border rounded-lg p-2 mb-4 bg-gray-50">
//               {items.map((item, index) => {
//                 const discountedPrice = calculateDiscountedPrice(item);
//                 return (
//                   <div
//                     key={index}
//                     className="flex justify-between py-2 border-b last:border-none text-sm md:text-base"
//                   >
//                     <span className="text-gray-700 font-medium mr
//                     2">{item.productId.name}</span>
//                     <div className="text-right whitespace-nowrap">
//                       <p className="font-semibold text-gray-800">
//                         ₹{discountedPrice.toFixed(2)} × {item.quantity}..... {' '}
//                         <span className="text-black font-bold">
//                           ₹{(discountedPrice * item.quantity).toFixed(2)}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>


//           {/* Summary Section */}
//           <div className="text-lg space-y-2">
//             <div className="flex justify-between">
//               <span className="text-gray-700">Subtotal:</span>
//               <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-700">Delivery:</span>
//               <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-red-500'}`}>
//                 {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
//               </span>
//             </div>
//             <hr className="border-t my-2" />
//             <div className="flex justify-between text-xl font-bold">
//               <span>Total Amount:</span>
//               <span className="text-blue-600">₹{finalAmount.toFixed(2)}</span>
//             </div>
//             <p className="text-sm text-gray-500">* All taxes included</p>
//           </div>

//           {/* Proceed to Shipping Button */}
//           <button
//             className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
//             onClick={proceedToShipping}
//           >
//             Proceed to Shipping
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartSummary;








import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

const CartSummary = () => {
  const items = useSelector((state) => state.cart.items);
  const router = useRouter();

  const calculateDiscountedPrice = (item) => {
    const price = item.productId.price;
    const discount = item.productId.discount || 0;
    return discount > 0 ? price - (price * discount) / 100 : price;
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + calculateDiscountedPrice(item) * item.quantity,
    0
  );

  const deliveryCharge = totalPrice < 500 ? 100 : 0;
  const finalAmount = totalPrice + deliveryCharge;

  const proceedToShipping = () => {
    router.push('/shipping');
  };

  return (
    <div className="bg-[#f9f7f3] p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-[#1e1e1e]">
  {/* Heading */}
  <div className="flex items-center mb-6">
    <svg className="w-5 h-5 mr-2 text-[#bca88e]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 3h14a1 1 0 011 1v3H2V4a1 1 0 011-1zm15 5v2H2V8h16zm0 3v2H2v-2h16zm0 3v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2h16z" />
    </svg>
    <h2 className="text-xl font-semibold font-serif tracking-wide">Cart Summary</h2>
  </div>

  {/* Cart Items Overview */}
  {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <MdOutlineRemoveShoppingCart className="text-6xl mx-auto mb-2" />
          Your cart is empty.
        </div>
      ) : (
  <div className="bg-white rounded-md p-4 border mb-4 text-sm">
     
     {items.map((item, index) => {
  const discountedPrice = calculateDiscountedPrice(item);
  return (
    <div className="flex justify-between" key={item._id || index}>
      <span className="text-gray-700">{item.productId.name}</span>
      <span className="text-black font-medium">
        <strong>₹ {discountedPrice * item.quantity}</strong>
      </span>
    </div>
  );
})}

  </div>
      )}
  {/* Breakdown */}
  <div className="space-y-2 text-sm mb-4">
    <div className="flex justify-between">
      <span>Subtotal</span>
      <span>₹ {totalPrice}</span>
    </div>
    <div className="flex justify-between">
      <span>Delivery</span>
      <span className="text-green-600 font-medium">Free</span>
    </div>
  </div>

  {/* Divider */}
  <div className="border-t my-4" />

  {/* Total */}
  <div className="flex justify-between items-center mb-2">
    <span className="font-bold text-base">Total Amount:</span>
    <span className="text-black font-bold text-lg">₹ {finalAmount}</span>
  </div>
  <p className="text-xs text-gray-500 mb-6">* All taxes included</p>

  {/* CTA */}
  <button
    className="w-full bg-[#1e1e1e] text-white py-3 rounded-full font-semibold hover:bg-[#333] transition"
    onClick={proceedToShipping}
  >
    Proceed to Shipping
  </button>
</div>

  );
};

export default CartSummary;
