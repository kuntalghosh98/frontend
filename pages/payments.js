// // pages/payments.js

// import { useState } from 'react';
// import axios from 'axios';

// const PaymentsPage = () => {
//   const [amount, setAmount] = useState(500); // Example amount in INR
//   const [isPaymentLoading, setIsPaymentLoading] = useState(false);


//   const initiatePayment = async () => {
//     try {
//       setIsPaymentLoading(true);

//       // Step 1: Create an order by calling the backend API
//       const { data } = await axios.post('http://localhost:4000/api/payment/order', {
//         amount: amount , // Amount in paisa (for Razorpay)
//         currency: 'INR',
//       });

//       const { id: order_id, currency, amount: orderAmount } = data;
//       console.log("payment---------------")
//       console.log(data);

//       // Step 2: Initialize Razorpay
//       const options = {
//         key:"rzp_test_M3md2FfQumDPz2",
//         amount: amount,
//         currency: currency,
//         name: 'My E-commerce App',
//         description: 'Test Transaction',
//         order_id: order_id,
//         handler: async function (response) {
//           // Step 3: Handle the payment success
//           console.log("response")
//           console.log(response);
//           const paymentData = {
//             orderCreationId: order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           // Verify payment by calling the backend
//           const result = await axios.post('http://localhost:4000/api/payment/verify', response);
//           console.log(result)
//           if (result.data.success) {
//             alert('Payment Successful!');
//           } else {
//             alert('Payment Verification Failed!');
//           }
//         },
//         prefill: {
//           name: 'John Doe',
//           email: 'john.doe@example.com',
//           contact: '7001483553',
//         },
        
//         theme: {
//           color: '#3399cc',
//         },
//         modal: {
//             // Option to show a QR code for UPI payments
//             backdropclose: true, // Allows closing the modal by clicking outside
//           }
//       };

//       const rzp1 = new window.Razorpay(options);

//       rzp1.on('payment.failed', function (response) {
//         alert('Payment Failed: ' + response.error.description);
//       });

//       // Step 4: Open Razorpay checkout
//       rzp1.open();
//     } catch (error) {
//       console.error('Error during payment initialization', error);
//       alert('Something went wrong, please try again.');
//     } finally {
//       setIsPaymentLoading(false);
//     }
//   };

  

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-6 rounded shadow-md text-center">
//         <h2 className="text-2xl font-semibold mb-4">Pay Now</h2>
//         <p className="text-gray-600 mb-6">Amount: ₹{amount}</p>
//         <button
//           onClick={initiatePayment}
//           disabled={isPaymentLoading}
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           {isPaymentLoading ? 'Processing...' : 'Pay ₹' + amount}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentsPage;






























// pages/payments.js

import { useState } from 'react';
import axios from 'axios';
import PaymentSuccessModal from '../components/PaymentSuccessModal';

const Payments = () => {
  const [amount, setAmount] = useState(500); // Example amount in INR
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(true);

  const initiatePayment = async () => {
    try {
      setIsPaymentLoading(true);

      // Step 1: Create an order by calling the backend API
      const { data } = await axios.post('http://localhost:4000/api/payment/order', {
        amount: amount, // Convert to paisa (for Razorpay)
        currency: 'INR',
      });

      const { id: order_id, currency, amount: orderAmount } = data;
      console.log("Order created:", data);

      // Step 2: Initialize Razorpay options
      const options = {
        key: "rzp_test_M3md2FfQumDPz2", // Your Razorpay key
        amount: orderAmount,
        currency: currency,
        name: 'My E-commerce App',
        description: 'Payment for your order',
        order_id: order_id, // Order ID from backend
        handler: async function (response) {
          // Step 3: Handle the payment success
          console.log("Payment Success Response:", response);
          const paymentData = {
            orderCreationId: order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify the payment by calling the backend
          const result = await axios.post('http://localhost:4000/api/payment/verify', paymentData);
          console.log("Verification result:", result);

          if (result.data.success) {
            alert('Payment Successful!');
            // You can redirect the user to a success page here
            // window.location.href = '/paymentsuccess';
          } else {
            alert('Payment Verification Failed! Please try again.');
            // You can redirect to a failure page here
            // window.location.href = '/payment-failure';
          }
        },
        prefill: {
          name: 'John Doe', // Prefill name
          email: 'john.doe@example.com', // Prefill email
          contact: '7001483553', // Prefill phone number
        },
        notes: {
          address: 'Your address here',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          backdropclose: true, // Allow closing the modal by clicking outside
        },
         // Custom payment failure handler (Step 3: Handle payment failure)
         "callback_url": 'http://localhost:4000/api/payment/failure', // Optional: Custom failure handling on the backend
         "retry": {
           "enabled": false // Disable retry to avoid confusion in failure scenario
         },
         "payment_failed": function(response) {
           console.log("Payment Failed Response:", response);
           alert('Payment Failed: ' + response.error.description);
         }
      };

      // Step 3: Handle payment failure
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.log("Payment Failed Response:", response);
        alert('Payment Failed: ' + response.error.description);
        // window.location.href = '/payment-failure'; // Redirect to failure page
      });

      // Step 4: Open Razorpay checkout
      rzp1.open();
    } catch (error) {
      console.error('Error during payment initialization:', error);
      alert('Something went wrong, please try again.');
    } finally {
      setIsPaymentLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Pay Now</h2>
        <p className="text-gray-600 mb-6">Amount: ₹{amount}</p>
        <button
          onClick={initiatePayment}
          disabled={isPaymentLoading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {isPaymentLoading ? 'Processing...' : 'Pay ₹' + amount}
        </button>
      </div>
      {isPaymentSuccess && (
  <PaymentSuccessModal
    isVisible={isPaymentSuccess}
    onClose={() => setIsPaymentSuccess(false)}
  />
)}
    </div>
  );
};

export default Payments;
