// // components/PriceBreakdown.js
// const PriceBreakdown = ({ items }) => {
//     const totalCartPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
//     const deliveryCharge = totalCartPrice > 100 ? 0 : 10; // Free delivery for orders above $100
//     const totalPrice = totalCartPrice + deliveryCharge;
  
//     return (
//       <div className="border p-4 rounded mb-6">
//         <h2 className="text-2xl font-bold mb-4">Price Breakdown</h2>
//         <p>Cart Price: ₹{totalCartPrice.toFixed(2)}</p>
//         <p>Delivery Charge: ₹{deliveryCharge.toFixed(2)}</p>
//         <p className="font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>
//       </div>
//     );
//   };
  
//   export default PriceBreakdown;
  

// components/PriceBreakdown.js
const PriceBreakdown = ({ items }) => {
  const cartSubtotal = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const deliveryCharge = cartSubtotal > 100 ? 0 : 10;
  const totalPrice = cartSubtotal + deliveryCharge;

  return (
    <div className="border p-4 rounded mb-6 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Price Breakdown</h2>
      <div className="space-y-1 text-gray-700">
        <p>Cart Price: ₹{cartSubtotal.toFixed(2)}</p>
        <p>
          Delivery Charge:{' '}
          <span className={deliveryCharge === 0 ? 'text-green-600' : 'text-red-600'}>
            ₹{deliveryCharge.toFixed(2)}
          </span>
        </p>
        <p className="font-bold text-lg text-black">
          Total Price: ₹{totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
