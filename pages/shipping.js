// pages/shipping.js
import React, { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from '../components/Address/AddressForm';
import AddressCard from '../components/Address/AddressCard';
import PriceBreakdown from '../components/PriceBreakdown';
import { Router, useRouter } from 'next/router';
import AddressList from '../components/Address/AddressList';
import axios from 'axios';
import { setCartItems,selectCartCount } from '../store/slices/cartSlice';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import { setAddresses } from '@/store/slices/addressSlice';
import { url } from '@/constant';

const ShippingPage = () => {
  const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  useEffect(()=>{
    if(!isDataAvailable){
      console.log("if isDataAvailable")
      router.push('/')
    }
    
  },[])

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
//   const [selectedAddress, setSelectedAddress] = useState(null); // Track selected address
  const addresses = useSelector((state) => state.address.addresses); // Assuming address data is stored in Redux
  const selectAddress=useSelector((state) => state.address.selectedAddress);


  const [isAddressListOpen,setAddressListOpen]=useState(true)
  let paymentResponse={}
  const orderItems=[]
  let deliveryAddress
  console.log("add shipping",selectAddress)
  let userId="";
  const user = useSelector((state) => state.user.user);
  if(isLoggedIn){
    
   userId =user._id;
  }
  
  let count=1
  const cartItems = useSelector((state) => state.cart.items);
  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(); // Expected delivery in 5 days

  const handleProceedToPayment = () => {
    if (selectedAddress !=null) {
      router.push('/payment'); // Navigate to payment page
    } else {
      alert('Please select or add an address.');
    }
  };
  const selectAddressHanddler=()=>{

  }
  const fetchCart = async () => {
    const response = await axios.get(`${url}api/cart/${userId}`);
    console.log("cart items shiping component",response.data.items)
    // dispatch(setCartItems(response.data.items));
    let arr=response.data.items
    if(arr.length>=1){
      arr.forEach(element => {
        let itemObj={
          productId:element.productId._id ,
          size:element.size,
          variantColor:element.veriantColor,
          quantity:element.quantity,
          price:element.productId.price,
          appliedDiscount:0
        }
        console.log(itemObj)
        orderItems.push(itemObj)
      });
    }
    console.log("oredritem  ",orderItems)
  };

  useEffect(() => {
   
   
   
  }, []);
  
useEffect(()=>{
if(selectAddress){
deliveryAddress={
  name: selectAddress.name,
  mobileNumber: selectAddress.mobileNumber,
  pincode: selectAddress.pincode,
  locality: selectAddress.locality,
  flatNumber: selectAddress.flatNumber,
  landmark: selectAddress.landmark,
  district: selectAddress.district,
  state: selectAddress.state,
  addressType: selectAddress.addressType,
}
console.log("devivery address",deliveryAddress)
}
},
[selectAddress])



  //---------------------------------------------------------------------------------------------------------------------------------------------
//   const [amount, setAmount] = useState(199.99); // Example amount in INR
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  //----------
  const items = useSelector((state) => state.cart.items);
  const totalCartPrice = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const deliveryCharge = totalCartPrice > 100 ? 0 : 10; // Free delivery for orders above $100
  const totalPrice = totalCartPrice + deliveryCharge;
  const totalPrice1=totalPrice.toFixed(2)
  const amount=totalPrice1
    //------
    console.log("TOTAL",typeof(totalPrice1))
   

const initiatePayment = async () => {
  if (selectAddress){
    try {
      setIsPaymentLoading(true);

      // Step 1: Create an order by calling the backend API
      const { data } = await axios.post(`${url}api/payment/order`, {
        amount: amount , // Amount in paisa (for Razorpay)
        currency: 'INR',
      });
       
      const { id: order_id, currency, amount: orderAmount } = data;
      console.log("payment---------------")
      let createOrderData=data
      console.log(data);

      // Step 2: Initialize Razorpay
      const options = {
        key:"rzp_test_M3md2FfQumDPz2",
        amount: amount,
        currency: currency,
        name: 'My E-commerce App',
        description: 'Test Transaction',
        order_id: order_id,
        handler: async function (response) {
          // Step 3: Handle the payment success
          console.log("response")
          console.log(response);
          const paymentData = {
            orderCreationId: order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment by calling the backend
          const result = await axios.post(`${url}api/payment/verify`, paymentData);
          console.log("result",result.data)
          if (result.data.success) {
            if(createOrderData && paymentData){
              paymentResponse={
                razorpayPaymentId: paymentData.razorpay_payment_id,
                razorpayOrderId: paymentData.razorpay_order_id,
                razorpaySignature:paymentData.razorpay_signature,
                amount:createOrderData.amount,
                createdAt:createOrderData.created_at,
                currency:createOrderData.currency,
                receipt:createOrderData.receipt,
                status:"completed"
              }
              
              const order=await axios.post(`${url}api/orders/create`, {
                userId:userId,
                address:deliveryAddress,
                paymentResponse:paymentResponse
              })
              console.log("successful payment done",userId)
              const removeCart=await axios.delete(`${url}api/cart/clear`,
                {data:{
                userId
              }})
              // console.log("successful payment cleare cart done",removeCart)

              const response = await axios.get(`${url}api/cart/${userId}`);
              
              dispatch(setCartItems(response.data.items));
              setIsPaymentSuccess(true);
            }
           
          } else {
           console.log("data-------------------")
           
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '7001483553',
        },
        
        theme: {
          color: '#3399cc',
        },
        modal: {
            // Option to show a QR code for UPI payments
            backdropclose: true, // Allows closing the modal by clicking outside
          },
          "retry": {
           "enabled": false // Disable retry to avoid confusion in failure scenario
         }
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', function (response) {

        // console.log("payment failed")
        // console.log(createOrderData)
        // console.log("respons------------")
        // console.log(orderItems)
        // console.log("respons------------")
        // console.log(deliveryAddress)
        // console.log("respons------------")
        // console.log(response.error.metadata)


        paymentResponse={
          razorpayPaymentId: response.error.metadata.payment_id,
          razorpayOrderId: response.error.metadata.order_id,
          razorpaySignature:"",
          amount:createOrderData.amount,
          createdAt:createOrderData.created_at,
          currency:createOrderData.currency,
          receipt:createOrderData.receipt,
          status:"failed"
        }
        paymentFailed(userId,orderItems,paymentResponse,deliveryAddress,count)
        count+=1
        // console.log("payment data",paymentResponse)

      });

    

      // Step 4: Open Razorpay checkout
      rzp1.open();
    } catch (error) {
      console.error('Error during payment initialization', error);
      alert('Something went wrong, please try again.');
    } finally {
      setIsPaymentLoading(false);
    }
  }else(console.log("select address any111"))
  };
  const paymentFailed=async (userId,orderItems,paymentResponse,deliveryAddress,count)=>{
    console.log("userId",userId)
    console.log("orderItems",orderItems)
    console.log("paymentResponse",paymentResponse)
    console.log("deliveryAddress",deliveryAddress)
   if(count==1){
     const order=await axios.post(`${url}api/orders/create`, {
       userId:userId,
        items:orderItems,
         address:deliveryAddress,
          paymentResponse:paymentResponse
     })
     console.log("payment failed",count)
   }
 }
 const pushToAddress=()=>{
  router.push({
    pathname: '/address',
    query: {
      from: 'shipping',
     
    },
  });
 }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
      {/* Address Selection Section */}
      <div className="mb-6">
        {selectAddress ? (
          <div>

            <AddressCard 
             key={selectAddress._id}
             address={selectAddress}
             />

               
          </div>
        ) : (
          <div>
            <p> Please add one.</p>
            <AddressForm />
          </div>
        )}
        {addresses.length>0 ?
        (<AddressList/>):
      (<div></div>)
    }
  
      </div>

      {/* Expected Delivery Date */}
      <div className="mb-6">
        {addresses?
        <p className="text-lg">Expected Delivery Date:</p>
        :""}
      </div>

      {/* Price Breakdown */}
      <PriceBreakdown items={cartItems} />

      {/* Proceed to Payment Button */}
      {selectAddress==null ? (
        <button
        onClick={pushToAddress}
       
         className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
       >
         Add address / Select Address
       </button>
      ):
      (<button
       onClick={initiatePayment}
       disabled={isPaymentLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
      >
        {isPaymentLoading ? 'Processing...' : 'Proceed to Payment'}
      </button>
      )
}
      <div>
      {isPaymentSuccess && (
  <PaymentSuccessModal
    isVisible={isPaymentSuccess}
    onClose={() => setIsPaymentSuccess(false)}
  />
)}
      </div>
    </div>
  );
};

export default ShippingPage;
