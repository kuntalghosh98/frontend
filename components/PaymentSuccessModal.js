import React from 'react';
import { useRouter } from 'next/router';
import { Player } from 'lottie-react'; // Import from lottie-react
import successAnimation from './Assets/success.png'; // Path to your JSON animation file
import successGif from './Assets/icons8-success.gif'
import animation from './Assets/Animation.gif'
import Image from 'next/image';


const PaymentSuccessModal = ({ isVisible, onClose }) => {
  const router = useRouter();

  // Function to redirect to Orders page
  const handleCheckOrders = () => {
    router.push('/OrdersPage');
  };

  return (
    isVisible && (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>

        {/* Success Modal */}
        <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 animate__animated animate__fadeInUp animate__faster h-500px">
          <div className="text-center">
            {/* Lottie Animation */}
            <div className="mb-4">
              
               <Image src={successGif} className="mx-auto" style={{ height: '150px', width: '150px' }}/>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md shadow-lg animate__animated animate__bounceIn"
              onClick={handleCheckOrders}
            >
              Check Order Items
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PaymentSuccessModal;
