// components/Cart/CartSummary.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const CartSummary = () => {
  const items = useSelector((state) => state.cart.items);
  console.log("CartSummary",items)
  const totalPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const router = useRouter();
  const proceedToShipping=()=>{
    router.push('/shipping');
  }

  return (
    <div className="border p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
      <p className="text-lg mb-2">Total Items: {items.length}</p>
      <p className="text-lg mb-4">Total Price: ${totalPrice.toFixed(2)}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={proceedToShipping}>Proced to shiping</button>
    </div>
  );
};

export default CartSummary;
