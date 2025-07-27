// import { useDispatch, useSelector } from 'react-redux';
// import { selectAddress } from '../../store/slices/addressSlice';
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// const AddressList = () => {
//   const addresses = useSelector((state) => state.address.addresses);
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false); // Track the visibility of the address list

//   const handleSelect = (id) => {
//     console.log("selected",id)
//     dispatch(selectAddress(id));
//     setIsOpen(false); // Close the address list after selecting an address
//   };

//   const toggleAddressList = () => {
//     setIsOpen(!isOpen); // Toggle the address list visibility
//   };

//   return (
//     <>
//       {/* Button to open the address list */}
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={toggleAddressList}
//       >
//         Choose Address
//       </button>

//       {/* Address List Window */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         } transition-transform duration-300 ease-in-out w-64 horizontal-scroll-container`}
//       >
//         <div className="p-4">
//           {/* Close Button */}
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-lg">Select Address</h3>
//             <FontAwesomeIcon
//               icon={faTimes}
//               className="cursor-pointer"
//               onClick={toggleAddressList}
//             />
//           </div>

//           {/* Address List */}
//           <div className="space-y-4">
//             {addresses.map((address) => (
//               <div key={address._id} className="border p-2 rounded">
//                 <p>{address.flatNumber}, {address.locality}</p>
//                 <p>{address.city}, {address.state}</p>
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                   onClick={() => handleSelect(address._id)}
//                 >
//                   Select
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Overlay to close the address list when clicking outside */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 z-40"
//           onClick={toggleAddressList}
//         />
//       )}
//     </>
//   );
// };

// export default AddressList;




import { useDispatch, useSelector } from 'react-redux';
import { selectAddress } from '../../store/slices/addressSlice';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddressList = () => {
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleSelect = useCallback((id) => {
    dispatch(selectAddress(id));
    setIsOpen(false);
  }, [dispatch]);

  const toggleAddressList = () => {
    setIsOpen((prev) => !prev);
  };

  // Allow ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus trap on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        className="bg-black text-white px-4 py-2 rounded mb-4 hover:bg-blue-700 transition"
        onClick={toggleAddressList}
        aria-label="Choose Address"
      >
        Choose Address
      </button>

      {/* Slide-in Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-full bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="p-4 h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Select Address</h3>
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer text-gray-700 hover:text-black"
              onClick={toggleAddressList}
              aria-label="Close"
            />
          </div>

          {/* Scrollable Address List */}
          <div className="space-y-4 overflow-y-auto pr-2 flex-1">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div
                  key={address._id}
                  className="border border-gray-300 rounded p-3 shadow-sm"
                >
                  <p className="text-sm font-medium truncate">
                    {address.flatNumber}, {address.locality}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {address.district}, {address.state} - {address.pincode}
                  </p>
                  <button
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    onClick={() => handleSelect(address._id)}
                  >
                    Select
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No addresses available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleAddressList}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AddressList;
