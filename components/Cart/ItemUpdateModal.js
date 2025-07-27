// // components/Cart/ItemUpdateModal.js
// import React, { useState } from 'react';

// const ItemUpdateModal = ({ isOpen, onClose, item, availableSizes, onUpdate,isSizeAvailable=true }) => {
//   console.log("isSizeAvailable",isSizeAvailable)
//   console.log(availableSizes)
//   const [selectedSize, setSelectedSize] = useState(item.size);
//   const [quantity, setQuantity] = useState(item.quantity);
// const [stock,setStock]=useState(12);
//   if (!isOpen) return null; // Don't render the modal if it's not open

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"  >
//       <div className="fixed inset-1 bg-red bg-opacity-10 flex " onClick={onClose}></div>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
//         <h2 className="text-xl font-bold mb-4">Update Item</h2>

//         {/* Size Selection */}
//         {isSizeAvailable ? (
//   <div className="mb-4">
//     <h3 className="font-semibold mb-2">Select Size</h3>
//     <div className="flex space-x-2">
//       {availableSizes.map((sizeObj) => (
//         <button
//           key={sizeObj._id} // Use a unique key (like _id)
//           className={`px-4 py-2 border rounded ${selectedSize === sizeObj.size ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => { setSelectedSize(sizeObj.size);
//              setStock(sizeObj.stock);}
//           } // Set size, not the whole object
//         >
//           {sizeObj.size} {/* Display only the size */}
//         </button>
//       ))}
//     </div>
//   </div>
// ) : (
//   <div></div>
// )}

       

//         {/* Quantity Selection */}
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">Quantity</h3>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               className="px-4 py-2 bg-gray-200 border rounded"
//             >
//               -
//             </button>
//             <span>{quantity}</span>
//             <button
//               onClick={() => setQuantity((prevQuantity) => 
//                 prevQuantity < stock ? prevQuantity + 1 : prevQuantity
//               )}
//               className="px-4 py-2 bg-gray-200 border rounded"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* Update Button */}
//         <button
//           onClick={() => onUpdate({ ...item, size: selectedSize, quantity, })}
//           className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
//         >
//           Update
//         </button>

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-20 right-10 text-black z-50"
//         >
//           X
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ItemUpdateModal;





import React, { useState } from 'react';

const ItemUpdateModal = ({
  isOpen,
  onClose,
  item,
  availableSizes,
  onUpdate,
  isSizeAvailable = true,
}) => {
  const [selectedSize, setSelectedSize] = useState(item.size);
  const [quantity, setQuantity] = useState(item.quantity);
  const [stock, setStock] = useState(12); // Default max stock

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Background click to close */}
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
        <h2 className="text-xl font-bold mb-4">Update Item</h2>

        {/* Size Selection */}
        {isSizeAvailable && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((sizeObj) => (
                <button
                  key={sizeObj._id}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === sizeObj.size
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedSize(sizeObj.size);
                    setStock(sizeObj.stock);
                  }}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selection */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Quantity</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-gray-200 border rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() =>
                setQuantity((prev) => (prev < stock ? prev + 1 : prev))
              }
              className="px-4 py-2 bg-gray-200 border rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={() =>
            onUpdate({ ...item, size: selectedSize, quantity })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Update
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ItemUpdateModal;
