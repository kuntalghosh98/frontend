import { useState } from 'react';

const paymentsuccess = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-4">Thank you for your purchase. Your order has been confirmed.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.href = '/orders'} // Redirect to orders page or homepage
        >
          View Orders
        </button>
      </div>
    );
  };
  
  export default paymentsuccess;
  






