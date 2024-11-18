// components/SidePanel/SidePanel.js

import React from 'react';
import NavLink from './Navlink'; // Adjust the path according to your project structure

const SidePanel = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black opacity-10 z-30 cursor-pointer" onClick={onClose}></div>}
      <div
        className={`fixed top-16 right-0 h-[calc(100%-4rem)] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-40`}
        style={{ width: '80%', maxWidth: '500px' }}
      >
        <div className="p-4 flex flex-col space-y-4">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/cart">Cart</NavLink>
          <NavLink href="/profile">Profile</NavLink>
          <NavLink href="/login">Login</NavLink>
          <NavLink href="/register">Register</NavLink>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
