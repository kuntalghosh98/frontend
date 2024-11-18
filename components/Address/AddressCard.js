// // components/Address/AddressCard.js
// import React from 'react';

// const AddressCard = ({ address, onEdit }) => {
//   return (
//     <div className="bg-white p-4 rounded shadow-md">
//       <h2 className="text-lg font-bold">{address.name}</h2>
//       <p>{address.flatNumber}, {address.locality}</p>
//       <p>{address.landmark}, {address.district}, {address.state}, {address.pincode}</p>
//       <p>{address.mobileNumber}</p>
//       <p className="italic">{address.addressType}</p>
//       <div className="mt-4 flex justify-end">
//         <button
//           onClick={onEdit}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddressCard;



// components/Address/AddressCard.js
import React from 'react';
import { useRouter } from 'next/router';

const AddressCard = ({ address, onEdit, onDelete }) => {
    const router = useRouter();
    const isroute= router.pathname === '/Account';
  return (
    <div className="border p-4 rounded shadow-lg">
      <h3 className="text-lg font-bold">{address.name}</h3>
      <p>{address.flatNumber}, {address.locality}</p>
      <p>{address.landmark}</p>
      <p>{address.district}, {address.state} - {address.pincode}</p>
      <p>Mobile: {address.mobileNumber}</p>
      <p>Type: {address.addressType}</p>


      {/* {address.isDefault && (
        <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm">Default</span>
      )} */}
      <span className="text-green-700 px-1 py-1 rounded-full text-sm font-bold">{address.isDefault ? "Default":""}</span>
      {isroute?
      <div className="flex justify-end mt-4 space-x-2">
        <button 
          onClick={() => onEdit(address)} 
          className="bg-black text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(address._id)} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
      :""}
    </div>
  );
};

export default AddressCard;

