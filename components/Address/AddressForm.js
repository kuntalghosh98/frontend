// import React, { useState } from 'react';
// import AddressModal from './AddressModal';

// const AddressForm = ({ userId, address = {}, onSave, onCancel, isOpen, onClose }) => {
//   const addressId = address?._id || '';

//   const [formData, setFormData] = useState({
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
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData, addressId);
//     onClose();
//   };

//   const inputFields = [
//     { name: 'name', placeholder: 'Full Name' },
//     { name: 'mobileNumber', placeholder: 'Mobile Number' },
//     { name: 'pincode', placeholder: 'Pincode' },
//     { name: 'locality', placeholder: 'Locality' },
//     { name: 'flatNumber', placeholder: 'Flat, House No, Building' },
//     { name: 'landmark', placeholder: 'Landmark' },
//     { name: 'district', placeholder: 'District' },
//     { name: 'state', placeholder: 'State' },
//   ];

//   return (
//     <AddressModal isOpen={isOpen} onClose={onClose}>
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-xl font-bold mb-4">{addressId ? 'Edit' : 'Add New'} Address</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {inputFields.map((field) => (
//             <input
//               key={field.name}
//               type="text"
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder}
//               className="border p-2"
//               required={['name', 'mobileNumber', 'pincode'].includes(field.name)}
//             />
//           ))}

//           <select
//             name="addressType"
//             value={formData.addressType}
//             onChange={handleChange}
//             className="border p-2"
//           >
//             <option value="Home">Home</option>
//             <option value="Work">Work</option>
//           </select>

//           <label className="flex items-center col-span-2">
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

  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits.';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits.';
    }

    ['locality', 'flatNumber', 'district', 'state'].forEach((field) => {
      if (!formData[field]?.trim()) newErrors[field] = `${field} is required.`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when input starts changing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData, addressId);
      onClose();
    }
  };

  return (
    <AddressModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">{addressId ? 'Edit' : 'Add New'} Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`border p-2 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[field.name] && (
                <span className="text-red-500 text-sm mt-1">{errors[field.name]}</span>
              )}
            </div>
          ))}

          <div className="flex flex-col">
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="border p-2"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </div>

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
