// // pages/address.js
// import React, { useState } from 'react';
// import AddressForm from '../components/Address/AddressForm'; // Create this form component
// import AddressCard from '../components/Address/AddressCard'; // Create this card component

// const AddressPage = () => {
//   const [addresses, setAddresses] = useState([
//     {
//       userId: "66d223a317934303f16f1a51",
//       name: "John Doe",
//       mobileNumber: "9876543210",
//       pincode: "123456",
//       locality: "Locality Name",
//       flatNumber: "Flat 101, Building A",
//       landmark: "Near Park",
//       district: "City Name",
//       state: "State Name",
//       addressType: "Home",
//       isDefault: true,
//     },
//   ]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentAddress, setCurrentAddress] = useState(null);
//   const [userId,setUserId]=useState("")

//   const handleEdit = (address) => {
//     setCurrentAddress(address);
//     setIsEditing(true);
//   };

//   const handleSave = (updatedAddress) => {
//     const updatedAddresses = addresses.map((addr) =>
//       addr.userId === updatedAddress.userId ? updatedAddress : addr
//     );
//     setAddresses(updatedAddresses);
//     setIsEditing(false);
//   };

//   const handleAddNew = (address) => {
//     setUserId(address.userId)
//     setIsEditing(true);
//     setCurrentAddress(null);
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
//       <div className="mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleAddNew}
//         >
//           Add New Address
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {addresses.map((address) => (
//           <AddressCard
//             key={address.userId}
//             address={address}
//             onEdit={() => handleEdit(address)}
//           />
//         ))}
//       </div>
//       {isEditing && (
//         <AddressForm
//           userId={userId}
//           address={currentAddress}
//           onSave={handleSave}
//           onCancel={() => setIsEditing(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AddressPage;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressForm from '../components/Address/AddressForm';
import AddressCard from '../components/Address/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { setAddresses } from '@/store/slices/addressSlice';
import { url } from '@/constant';
const AddressPage = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const [userId,setUserId]=useState("")
    
    if(isLoggedIn){
      setUserId(user._id);
    
    }
 

  const [addresses, setAddresses1] = useState([]);

  const fetchAddress = async () => {
    const response = await axios.get(`${url}api/address/${userId}`);
    console.log("cart items cart componentyy",response.data)
    dispatch(setAddresses(response.data));
    setAddresses1(response.data)
    console.log(addresses)
  };
  const addAddress = async (address) => {
    const response = await axios.post(`${url}api/address/add/`,
     {...address}
    );
    console.log("cart items cart componentxx",response.data)
    let addressList=[response.data.address,...addresses]
    
    setAddresses1(addressList)
    
    console.log(addressList)
  };
  const editAddress = async (address,adderssId) => {
    const response = await axios.put(`${url}api/address/update/${adderssId}`,
        {...address}
    );
    console.log("address edit items cart componentyy",response.data)
    // dispatch(setCartItems(response.data.items));
    // setAddresses(response.data)
    // console.log(addresses)
  };
  const deleteAddress = async (adderssId) => {
    const response = await axios.delete(`${url}api/address/delete/${adderssId}`
    );
    console.log("address edit items cart componentyy",response.data)
    // dispatch(setCartItems(response.data.items));
    // setAddresses(response.data)
    // console.log(addresses)
  };



  useEffect(()=>{
      fetchAddress()
  },[])
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddNew = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    console.log("address")
    
    setSelectedAddress(address);
    console.log(address)
    
    setIsModalOpen(true);
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
      // Update address logic
    //   setAddresses(addresses.map(addr => addr.userId === newAddress.userId ? newAddress : addr))
    } else {
        if(addressId){
            console.log("edit address",newAddress)
            // console.log("edit address",newAddress._id)
        }else{

            console.log("new address",newAddress)
            addAddress(newAddress)
        }
        
      // Add new address
    //   setAddresses([...addresses, newAddress]);
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
