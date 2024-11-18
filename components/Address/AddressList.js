import { useDispatch, useSelector } from 'react-redux';
import { selectAddress } from '../../store/slices/addressSlice';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddressList = () => {
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Track the visibility of the address list

  const handleSelect = (id) => {
    console.log("selected",id)
    dispatch(selectAddress(id));
    setIsOpen(false); // Close the address list after selecting an address
  };

  const toggleAddressList = () => {
    setIsOpen(!isOpen); // Toggle the address list visibility
  };

  return (
    <>
      {/* Button to open the address list */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={toggleAddressList}
      >
        Choose Address
      </button>

      {/* Address List Window */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-64`}
      >
        <div className="p-4">
          {/* Close Button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Select Address</h3>
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer"
              onClick={toggleAddressList}
            />
          </div>

          {/* Address List */}
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address._id} className="border p-2 rounded">
                <p>{address.flatNumber}, {address.locality}</p>
                <p>{address.city}, {address.state}</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => handleSelect(address._id)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay to close the address list when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleAddressList}
        />
      )}
    </>
  );
};

export default AddressList;
