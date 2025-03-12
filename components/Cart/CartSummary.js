// components/Cart/CartSummary.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';

// const CartSummary = () => {
//   const items = useSelector((state) => state.cart.items);
//   console.log("CartSummary",items)
//   const totalPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
//   const router = useRouter();
//   const proceedToShipping=()=>{
//     router.push('/shipping');
//   }

//   return (
//     <div className="border p-4 rounded">
//       <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
//       <p className="text-lg mb-2">Total Items: {items.length}</p>
//       <p className="text-lg mb-4">Total Price: ₹{totalPrice.toFixed(2)}</p>
//       <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={proceedToShipping}>Proced to shiping</button>
//     </div>
//   );
// };

// export default CartSummary;






import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaShippingFast } from 'react-icons/fa'; // Import shipping icon
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'; // Remove cart icon

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
    <div className=" w-full bg-white  rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaShippingFast className="text-green-300 mr-2" /> Cart Summary
      </h2>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <MdOutlineRemoveShoppingCart className="text-6xl mx-auto mb-2" />
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* Itemized List */}
            <div className="border rounded-lg p-2 mb-4 bg-gray-50">
              {items.map((item, index) => {
                const discountedPrice = calculateDiscountedPrice(item);
                return (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b last:border-none text-sm md:text-base"
                  >
                    <span className="text-gray-700 font-medium mr
                    2">{item.productId.name}</span>
                    <div className="text-right whitespace-nowrap">
                      <p className="font-semibold text-gray-800">
                        ₹{discountedPrice.toFixed(2)} × {item.quantity}..... {' '}
                        <span className="text-black font-bold">
                          ₹{(discountedPrice * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>


          {/* Summary Section */}
          <div className="text-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Delivery:</span>
              <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-red-500'}`}>
                {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}
              </span>
            </div>
            <hr className="border-t my-2" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total Amount:</span>
              <span className="text-blue-600">₹{finalAmount.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500">* All taxes included</p>
          </div>

          {/* Proceed to Shipping Button */}
          <button
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            onClick={proceedToShipping}
          >
            Proceed to Shipping
          </button>
        </>
      )}
    </div>
  );
};

export default CartSummary;
