// components/Cart/CartItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateCart, removeFromCart,setCartItems } from '../../store/slices/cartSlice';
import {useSelector } from 'react-redux';
import ItemUpdateModal from './ItemUpdateModal';
import { url,urlImg } from '@/constant';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/router';
// if(item.veriantId.)
// forEach(item.variants as veriant){if(veriant._id==item.veriantId){console.log(veriant.color)}}


const CartItem = ( {item}) => {
  const router=useRouter();
  const user = useSelector((state) => state.user.user);
  const userId = user ? user._id : null;
  const [color1,setColor]=useState("");
  var color="";
  const dispatch = useDispatch();
  var imageUrl=""
  console.log("Cart Item --Item component",item);
  console.log("Cart Item --Item component details",item.productId.variants);
  
  
  
  let availableSizes ; // Example sizes, replace with real ones
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
      availableSizes=element.sizeStock;
      console.log("item-id                 element",element);
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
   
    if (updatedItem.quantity > 12) {
      updatedItem.quantity = 12;
    }

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
  const productClick=()=>{
    
    router.push(`./productDetailsCard?id=${item.productId._id}`)
  }
  return (
    <div >
      <div className=" flex flex-row w-full  items-center border-b py-4 p-2">
        <div className='w-1/7'>
          <img src={`${urlImg}${imageUrl}`} alt={item.name} className="w-20 h-20 object-cover" onClick={productClick}/>
        </div>
        <div className=" flex flex-col md:flex-row grid md:grid-cols-3 lg:grid-col-3">


          {/* name */}
          <div className="flex items-center md:w-50 lg:w-70 ml-4 pl-4 font-semibold ">
              <h2 className="">{item.productId.name}</h2>
              {/* <p className="text-black-600">{item.category}</p> */} 
          </div>


          <div className='flex pl-4 ml-2 '>
            <did className="w-40 flex flex-row">
            <div className="ml-2 flex flex-col items-start ">
              <h1>Quantity</h1>
              <div className="ml-0 mt-2 w-16 text-center border rounded">
                <h2 className=" font-bold" onClick={() => setIsModalOpen(true)}>{item.quantity}</h2>
              </div>
            </div>


            {
              item.size != "" ?
                (
                  <div className="ml-2 flex flex-col items-start">
                    <h1>Size</h1>
                    <div className="ml-0 mt-2 w-16 text-center border rounded">
                      <h2 className=" font-bold" onClick={() => setIsModalOpen(true)}>{item.size}</h2>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
            }
            </did>
            <button
              onClick={handleRemove}
              className="ml-1 mt-8 text-black px-3 py-1 rounded"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>



            {/* price */}
          <div className="ml-4 pl-4  justify-end ">
            <p className="text-gray-800 mt-2">
              {item.productId?.discount && item.productId.discount > 0 ? (
                <span className="flex md:flex-col items-center ">
                  {/* Original Price with Strikethrough */}
                  <span className="line-through text-gray-500">₹{item.productId.price}</span>

                  {/* Discounted Price */}
                  <span className="text-black font-semibold">
                    ₹{(item.productId.price - (item.productId.price * item.productId.discount) / 100).toFixed(2)}
                  </span>

                  {/* Discount Percentage */}
                  {/* <span className="text-green-600 font-semibold">
          {item.productId.discount}% off
        </span> */}
                </span>
              ) : (
                // Normal Price if no discount is available
                <span className="flex md:flex-col items-center ">₹${item.productId.price}</span>
                
              )}
            </p>
          </div>

        </div>

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
