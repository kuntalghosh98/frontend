




import React, { useEffect, useState } from 'react';

import axios from 'axios';
import AddressForm from '../components/Address/AddressForm';
import AddressCard from '../components/Address/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { setAddresses,selectAddress } from '@/store/slices/addressSlice';
import { Router, useRouter } from 'next/router';
import { url } from '@/constant';
const AddressPage = () => {
  const router=useRouter()
  const { from } = router.query;
  const isDataAvailable = useSelector((state) => state.user.isDataAvailable);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log("from address page---",isDataAvailable)
  console.log("user",user)

  let userId = user ? user._id : null;
  
  
    
  
  console.log("user id at address component",userId)

  
  const addresses = useSelector((state) => state.address.addresses);
  // console.log("allAddress",allAddress)
  // const fetchAddress = async () => {
  //   const response = await axios.get(`${url}api/address/${user._id}`);
  //   console.log("cart items cart componentyy",response.data)
  //   dispatch(setAddresses(response.data));
  //   setAddresses1(response.data)
  //   console.log(addresses)
  // };
 
 
  const addAddress = async (address) => {
    const response = await axios.post(`${url}api/address/add`,
     {...address}
    );
    console.log("cart items cart componentxx",response.data)
    let addressList=[response.data.address,...addresses]
    

    const addressRes = await axios.get(`${url}api/address/${userId}`);
    dispatch(setAddresses(addressRes.data));
    console.log(addressList)
  };
  const editAddress = async (address,adderssId) => {
    const response = await axios.put(`${url}api/address/update/${adderssId}`,
        {...address}
    );
    const addressRes = await axios.get(`${url}api/address/${userId}`);
    dispatch(setAddresses(addressRes.data));
    console.log("address edit items cart componentyy",response.data)
  };
  const deleteAddress = async (adderssId) => {
    const response = await axios.delete(`${url}api/address/delete/${adderssId}`
    );
    console.log("address edit items cart componentyy",response.data)
  };



 
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddNew = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    console.log("address   handle edit------")
    
    setSelectedAddress(address);
    console.log(address)
    
    setIsModalOpen(true);
  };
  const handleSelect = (id) => {
    console.log("selected",id)
    dispatch(selectAddress(id));
   // Close the address list after selecting an address
 
    router.push('/shipping')
   
  };
  const handleDelete = (addressId) => {
    
 console.log("delete function call",addressId)
 deleteAddress(addressId);
    // setAddresses(addresses.filter((address) => address.userId !== userId));
  };

  const handleSave = (newAddress) => {

    if (selectedAddress) {
        console.log("edit address",newAddress)
        console.log("edit address",selectedAddress._id) 
        editAddress(newAddress,selectedAddress._id) 
    } else {
            console.log("new address",newAddress)
            addAddress(newAddress)
  
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Addresses</h1>

      <div className="mb-4">
        <button 
          onClick={handleAddNew} 
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <AddressCard 
            key={address._id} 
            address={address} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            handleSelect={handleSelect}
          />
        ))}
      </div>

      {isModalOpen && (
        <AddressForm
        userId={userId}
          address={selectedAddress}
          onSave={handleSave}
          onCancel={handleCancel}
          isOpen={isModalOpen}
          onClose={handleCancel}
        />
      )}
    </div>
  );
};

export default AddressPage;




