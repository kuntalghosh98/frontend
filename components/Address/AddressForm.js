
// // components/Address/AddressForm.js
// import React, { useState } from 'react';
// import AddressModal from './AddressModal';

// const AddressForm = ({userId, address = {}, onSave, onCancel, isOpen, onClose }) => {
//     console.log('address form',address)
//     let addressId="";
//     if(address){
//         addressId=address._id;
//         console.log("editing address",address._id);
//     }
//   const initialFormData = {
//     userId: address?.userId || userId,
//     name: address?.name || '',
//     mobileNumber: address?.mobileNumber || '',
//     pincode: address?.pincode || '',
//     locality: address?.locality || '',
//     flatNumber: address?.flatNumber || '',
//     landmark: address?.landmark || '',
//     district: address?.district || '',
//     state: address?.state || '',
//     addressType: address?.addressType || 'Home',
//     isDefault: address?.isDefault || false,
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData,addressId);
//     onClose(); // Close the modal after saving
//   };

//   return (
//     <AddressModal isOpen={isOpen} onClose={onClose}>
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold mb-4">{address?.userId ? 'Edit' : 'Add New'} Address</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-500">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             placeholder="Mobile Number"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             placeholder="Pincode"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="locality"
//             value={formData.locality}
//             onChange={handleChange}
//             placeholder="Locality"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="flatNumber"
//             value={formData.flatNumber}
//             onChange={handleChange}
//             placeholder="Flat, House No, Building"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="landmark"
//             value={formData.landmark}
//             onChange={handleChange}
//             placeholder="Landmark"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={handleChange}
//             placeholder="District"
//             className="border p-2"
//           />
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             placeholder="State"
//             className="border p-2"
//           />
//           <select
//             name="addressType"
//             value={formData.addressType}
//             onChange={handleChange}
//             className="border p-2"
//           >
//             <option value="Home">Home</option>
//             <option value="Work">Work</option>
//           </select>
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               name="isDefault"
//               checked={formData.isDefault}
//               onChange={handleChange}
//             />
//             <span className="ml-2">Set as Default Address</span>
//           </label>
//         </div>
//         <div className="mt-4 flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-400 text-white rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-black text-white rounded"
//           >
//             Save Address
//           </button>
//         </div>
//       </form>
//     </AddressModal>
//   );
// };

// export default AddressForm;


import React, { useState } from 'react';
import AddressModal from './AddressModal';

const AddressForm = ({ userId, address = {}, onSave, onCancel, isOpen, onClose }) => {
  const addressId = address?._id || '';

  const [formData, setFormData] = useState({
    userId: address?.userId || userId,
    name: address?.name || '',
    mobileNumber: address?.mobileNumber || '',
    pincode: address?.pincode || '',
    locality: address?.locality || '',
    flatNumber: address?.flatNumber || '',
    landmark: address?.landmark || '',
    district: address?.district || '',
    state: address?.state || '',
    addressType: address?.addressType || 'Home',
    isDefault: address?.isDefault || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData, addressId);
    onClose();
  };

  const inputFields = [
    { name: 'name', placeholder: 'Full Name' },
    { name: 'mobileNumber', placeholder: 'Mobile Number' },
    { name: 'pincode', placeholder: 'Pincode' },
    { name: 'locality', placeholder: 'Locality' },
    { name: 'flatNumber', placeholder: 'Flat, House No, Building' },
    { name: 'landmark', placeholder: 'Landmark' },
    { name: 'district', placeholder: 'District' },
    { name: 'state', placeholder: 'State' },
  ];

  return (
    <AddressModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">{addressId ? 'Edit' : 'Add New'} Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="border p-2"
              required={['name', 'mobileNumber', 'pincode'].includes(field.name)}
            />
          ))}

          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="border p-2"
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
          </select>

          <label className="flex items-center col-span-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <span className="ml-2">Set as Default Address</span>
          </label>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Save Address
          </button>
        </div>
      </form>
    </AddressModal>
  );
};

export default AddressForm;
