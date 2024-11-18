// pages/cart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCartItems,selectCartCount } from '../store/slices/cartSlice';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import Router from 'next/router';
import { useRouter } from "next/router";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useSelector(selectCartCount);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
  const router = useRouter();
 
  // useEffect(()=>{
  //   if(!isDataAvailable){
  //     console.log("if isDataAvailable")
  //     router.push('/')
  //   }
  // },[])
  console.log("isDataAvailable",isDataAvailable)
   // Replace with actual user ID logic

  const user = useSelector((state) => state.user.user);
  
  if(isLoggedIn){
  const userId =user._id;
  

console.log("Kuntal cart")
console.log("Kuntal cart",isLoggedIn)
  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(`http://localhost:4000/api/cart/${userId}`);
      console.log("cart items cart component",response.data.items)
      dispatch(setCartItems(response.data.items));
    };
    fetchCart();
  }, [ ]);
}

const continueShoping=()=>{
  Router.push('/')
}


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className=' mt-20 flex justify-center font-bold'>
              <p className="text-gray-600 justify-center ">Your cart is empty</p>
            </div>
            
          )}
        </div>
        {
          cartItems.length > 0 ?
          (<CartSummary />)
          :
          (<div className=' flex justify-center'><button onClick={continueShoping} className=' bg-green-500 text-white px-4 py-2 rounded'>
            continue shoping
            </button></div>)

        }
       
        
      </div>
    </div>
  );
};

export default Cart;
