import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import AddressForm from '../components/Address/AddressForm';
import AddressCard from '../components/Address/AddressCard';
import AddressList from '../components/Address/AddressList';
import PriceBreakdown from '../components/PriceBreakdown';
import PaymentSuccessModal from '../components/PaymentSuccessModal';

import { setCartItems } from '@/store/slices/cartSlice';
import { fetchCartApi, clearCartApi } from '@/api/cartApi';
import { createOrderApi,createRazorpayOrderApi, verifyRazorpayPaymentApi } from '@/api/orderApi';
// import { createRazorpayOrderAPI, verifyRazorpayPaymentAPI } from '@/api/paymentApi';

const ShippingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;

  const selectAddress = useSelector((state) => state.address.selectedAddress);
  const addresses = useSelector((state) => state.address.addresses);
  const cartItems = useSelector((state) => state.cart.items);

  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  useEffect(() => {
    if (!isDataAvailable) router.push('/');
  }, [isDataAvailable]);

  const totalCartPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const deliveryCharge = totalCartPrice > 100 ? 0 : 10;
  const totalPrice = (totalCartPrice + deliveryCharge).toFixed(2);

  const buildOrderItems = (cartItems) => {
    return cartItems.map((item) => ({
      productId: item.productId._id,
      size: item.size,
      variantColor: item.veriantColor,
      quantity: item.quantity,
      price: item.productId.price,
      appliedDiscount: 0
    }));
  };

  const buildDeliveryAddress = (address) => {
    return {
      name: address.name,
      mobileNumber: address.mobileNumber,
      pincode: address.pincode,
      locality: address.locality,
      flatNumber: address.flatNumber,
      landmark: address.landmark,
      district: address.district,
      state: address.state,
      addressType: address.addressType
    };
  };

  const handlePaymentSuccess = async (paymentData, orderDetails) => {
    try {
      await createOrderApi({
        userId,
        items: orderDetails.items,
        address: orderDetails.address,
        paymentResponse: orderDetails.paymentResponse
      });

      await clearCartApi(userId);
      const freshCart = await fetchCartApi(userId);
      dispatch(setCartItems(freshCart.items));

      setIsPaymentSuccess(true);
    } catch (error) {
      console.error('Error in success handler:', error);
    }
  };

  const handlePaymentFailed = async (paymentResponse, items, address) => {
    try {
      await createOrderApi({
        userId,
        items,
        address,
        paymentResponse
      });
    } catch (error) {
      console.error('Error logging failed payment:', error);
    }
  };

  // const initiatePayment = async () => {
  //   if (!selectAddress) {
  //     alert('Please select or add an address.');
  //     return;
  //   }

  //   const orderItems = buildOrderItems(cartItems);
  //   const deliveryAddress = buildDeliveryAddress(selectAddress);
  //   try {
  //     setIsPaymentLoading(true);

  //     const data = await createRazorpayOrderApi({ amount: totalPrice });

  //     const options = {
  //       key: 'rzp_test_M3md2FfQumDPz2',
  //       amount: totalPrice,
  //       currency: data.currency,
  //       name: 'My E-commerce App',
  //       description: 'Test Transaction',
  //       order_id: data.id,
  //       handler: async (response) => {
  //         const paymentData = {
  //           userId,
  //           amount: data.amount,
  //           orderCreationId: data.id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_signature: response.razorpay_signature
  //         };

  //         const verify = await verifyRazorpayPaymentApi(paymentData);
  //         if (verify.success) {
  //           const paymentResponse = {
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //             amount: data.amount,
  //             createdAt: data.created_at,
  //             currency: data.currency,
  //             receipt: data.receipt,
  //             status: 'completed'
  //           };

  //           await handlePaymentSuccess(paymentData, {
  //             items: orderItems,
  //             address: deliveryAddress,
  //             paymentResponse
  //           });
  //         }
  //       },
  //       prefill: {
  //         name: user?.name || '',
  //         email: user?.email || '',
  //         contact: '7001483553'
  //       },
  //       theme: { color: '#3399cc' },
  //       retry: { enabled: false },
  //       modal: { backdropclose: true }
  //     };

  //     const razorpay = new window.Razorpay(options);
  //     razorpay.on('payment.failed', function (response) {
  //       const paymentResponse = {
  //         razorpayPaymentId: response.error.metadata.payment_id,
  //         razorpayOrderId: response.error.metadata.order_id,
  //         razorpaySignature: '',
  //         amount: data.amount,
  //         createdAt: data.created_at,
  //         currency: data.currency,
  //         receipt: data.receipt,
  //         status: 'failed'
  //       };

  //       handlePaymentFailed(paymentResponse, orderItems, deliveryAddress);
  //     });

  //     razorpay.open();
  //   } catch (error) {
  //     console.error('Payment initiation error:', error);
  //     alert('Something went wrong during payment.');
  //   } finally {
  //     setIsPaymentLoading(false);
  //   }
  // };


  const initiatePayment = async () => {
    if (!selectAddress) {
      alert('Please select or add an address.');
      return;
    }
  
    try {
      setIsPaymentLoading(true);
      const token = localStorage.getItem('token');
      
      // 🔄 1. Refetch cart from backend
      const freshCart = await fetchCartApi(userId, token);
  
      // 🔁 2. Compare fresh cart with Redux cart
      const hasMismatch = JSON.stringify(freshCart.items) !== JSON.stringify(cartItems);
      if (hasMismatch) {
        dispatch(setCartItems(freshCart.items));
        alert('Your cart has been updated. Please review it before proceeding to payment.');
        return;
      }
  
      // ✅ Proceed with Razorpay if no mismatch
      const data = await createRazorpayOrderApi(token);
  
      const options = {
        key: 'rzp_test_M3md2FfQumDPz2',
        amount: data.amount,
        currency: data.currency,
        name: 'Aurius',
        description: 'Order Payment',
        order_id: data.id,
        handler: async (response) => {
          const paymentData = {
            amount: data.amount,
            currency: data.currency,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpayOrderId:response.razorpay_order_id,
          };
  
          const verify = await verifyRazorpayPaymentApi(paymentData, token);
          if (verify.success) {
            const paymentResponse = {
              ...paymentData,
              status: 'completed',
              receipt: data.receipt,
              createdAt: data.created_at,
            };
  
            await handlePaymentSuccess(paymentData, {
              items: buildOrderItems(freshCart.items),
              address: buildDeliveryAddress(selectAddress),
              paymentResponse,
            });
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: '7001483553',
        },
        theme: { color: '#bca88e' },
        retry: { enabled: false },
        modal: { backdropclose: true },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', async (response) => {
        const paymentResponse = {
          razorpayPaymentId: response.error.metadata.payment_id,
          razorpayOrderId: response.error.metadata.order_id,
          razorpaySignature: '',
          amount: data.amount,
          currency: data.currency,
          status: 'failed',
          createdAt: data.created_at,
          receipt: data.receipt,
        };
  
        await handlePaymentFailed(paymentResponse, buildOrderItems(freshCart.items), buildDeliveryAddress(selectAddress));
      });
  
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsPaymentLoading(false);
    }
  };
  
  
  const pushToAddress = () => {
    router.push({ pathname: '/address', query: { from: 'shipping' } });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>

      <div className="mb-6">
        {selectAddress ? (
          <AddressCard key={selectAddress._id} address={selectAddress} />
        ) : (
          <>
            <p>Please add one/Choose one</p>
            <AddressForm />
          </>
        )}
        {addresses.length > 0 && <AddressList />}
      </div>

      {addresses.length > 0 && (
        <div className="mb-6">
          <p className="text-lg">Expected Delivery Date: {deliveryDate}</p>
        </div>
      )}

      <PriceBreakdown items={cartItems} />

      {selectAddress ? (
        <button
          onClick={initiatePayment}
          disabled={isPaymentLoading}
          className="bg-black text-white px-4 py-2 rounded mt-6"
        >
          {isPaymentLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      ) : (
        <button
          onClick={pushToAddress}
          className="bg-black text-white px-4 py-2 rounded mt-6"
        >
          Add Address / Select Address
        </button>
      )}

      {isPaymentSuccess && (
        <PaymentSuccessModal
          isVisible={isPaymentSuccess}
          onClose={() => setIsPaymentSuccess(false)}
        />
      )}
    </div>
  );
};

export default ShippingPage;
