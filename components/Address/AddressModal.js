// components/Address/AddressModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // For accessibility

const AddressModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-500"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 "
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg md:max-w-md lg:max-w-2xl mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default AddressModal;
