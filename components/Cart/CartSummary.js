import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaShippingFast } from 'react-icons/fa';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';

const CartSummary = () => {
  const items = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [showLoginModal, setShowLoginModal] = React.useState(false);

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
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

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
      {showLoginModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
      <h2 className="text-xl font-semibold mb-4">Login Required</h2>
      <p className="mb-6 text-gray-600">Please login to proceed to shipping.</p>
      <button
        onClick={() => router.push(`/loginregister?redirect=${router.asPath}`)}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Login Now
      </button>
      <button
        onClick={() => setShowLoginModal(false)}
        className="block mt-4 text-sm text-gray-500 underline"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </div>

  );
};

export default CartSummary;
