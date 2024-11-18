// components/Cart/CartItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCart, removeFromCart,setCartItems } from '../../store/slices/cartSlice';
import {useSelector } from 'react-redux';
import ItemUpdateModal from './ItemUpdateModal';
import { url } from '@/constant';
// if(item.veriantId.)
// forEach(item.variants as veriant){if(veriant._id==item.veriantId){console.log(veriant.color)}}


const CartItem = ( {item}) => {
  
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;
  const [color1,setColor]=useState("");
  var color="";
  const dispatch = useDispatch();
  var imageUrl=""
  console.log("Cart Item --Item component",item);
  console.log("Cart Item --Item component details",item.productId.variants);
  
  
  
  const availableSizes = ['S', 'M', 'L', 'XL']; // Example sizes, replace with real ones
  const [isModalOpen, setIsModalOpen] = useState(false);
const [isSizeAvailable,setIsSizeAvailable]=useState(true)

  var veriant=item.productId.variants;
  // if(item.size==""){
  //   setIsSizeAvailable(false)
  // }
  if(veriant){
  veriant.forEach(element => {
    console.log("veriantid ",element._id)
    if(element.color==item.veriantColor){
      imageUrl=element.imageUrls[0]
      console.log("item-id",item.veriantId)
    // console.log("imageUrl ",imageUrl)
    }
    console.log("item-element.color",element.color)
  });
  }
  const handleUpdate = async (updatedItem) => {
    // Close modal
    if(item.quantity==updatedItem.quantity && item.size==updatedItem.size){
      setIsModalOpen(false);
    }else{
    console.log("update click",userId,updatedItem._id,updatedItem.productId._id,updatedItem.size,updatedItem.quantity,updatedItem.veriantColor,)
   
    

    // Dispatch the updated item to the Redux store
    // const response = await axios.put(`https://your-backend-url/api/cart/${item.id}`, updatedItem);
    // dispatch(updateCart(updatedItem));
    
    try{
 console.log("try block")
      const response = await axios.put(`${url}api/cart/update`, {
        userId,
        cartItemId:updatedItem._id,
        productId: updatedItem.productId._id,
        size:updatedItem.size,
        quantity:updatedItem.quantity,
        veriantColor:updatedItem.veriantColor
      })
      if (response.status === 200) {
        fetchCart();}
      

      
    }
    catch(e){

    }
  
    setIsModalOpen(false);
  }
  };
  

  const handleQuantityChange = async (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    const updatedItem = { ...item, quantity: newQuantity };
    await axios.put(`https://your-backend-url/api/cart/${item.id}`, updatedItem);
    dispatch(updateCart(updatedItem));
  };

  const handleRemove = async () => {
    console.log("Cart Item remove",userId)
    console.log("Cart Item remove",item._id);
    try {
      const response = await axios.delete(`${url}api/cart/remove/`, {
        data: { userId, cartItemId: item._id },
      });
  
      if (response.status === 200) {
        fetchCart();
        console.log("Cart Item remove",item._id);
        // Update the Redux store immediately after successful removal
        dispatch(removeFromCart(item._id));
        
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Handle the error if needed
    }
  };
  const fetchCart = async () => {
    const response = await axios.get(`${url}api/cart/${userId}`);
    console.log("cart items component-------------",response.data.items)
    dispatch(setCartItems(response.data.items));
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        <img src={imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
        <div className="ml-4">
          <h2 className="text-lg font-bold">{item.productId.name}</h2>
          <p className="text-black-600">{item.category}</p>
          
        </div>
        <div className="ml-4 w-16 text-center border rounded">
          <h2 className="text-lg font-bold"  onClick={() => setIsModalOpen(true)}>{item.quantity}</h2>
        </div>
        {
          item.size!=""?
          (
            <div className="ml-4 w-16 text-center border rounded">
            <h2 className="text-lg font-bold"  onClick={() => setIsModalOpen(true)}>{item.size}</h2>
          </div>
          ):(
            <div></div>
          )
        }
       
      </div>
      <div className="flex items-center">
       <button
          onClick={handleRemove}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded" 
        >
          Remove
        </button>
        
      </div>
      
      <ItemUpdateModal
        isOpen={isModalOpen }
        onClose={() => setIsModalOpen(false)}
        item={item}
        availableSizes={availableSizes}
        onUpdate={handleUpdate}
        isSizeAvailable={item.size==""?false:true}
      />
    </div>
  );
};

export default CartItem;
