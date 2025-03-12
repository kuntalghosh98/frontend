// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// const Sidebar = ({ isOpen, toggleSidebar, onSelectCategory }) => {
//   return (
//     <div className={`fixed inset-y-0 left-0 top-10 bg-white shadow-lg ${isOpen ? 'w-64' : 'w-0'} transition-width duration-300`}>
//       <div className="p-4">
//         <FontAwesomeIcon
//           icon={faTimes}
//           className="cursor-pointer"
//           onClick={toggleSidebar}
//         />
//         <h2 className="font-bold text-lg mb-4">My Account</h2>
//         <ul className="space-y-4">
//           <li onClick={() => onSelectCategory('orders')}>Orders</li>
//           <li onClick={() => onSelectCategory('customerCare')}>Customer Care</li>
//           <li className="font-bold">Profile</li>
//           <ul className="space-y-2 ml-4">
//             <li onClick={() => onSelectCategory('payments')}>Payments</li>
//             <li onClick={() => onSelectCategory('address')}>Address Book</li>
//             <li onClick={() => onSelectCategory('personalInfo')}>Personal Information</li>
//           </ul>
//         </ul>
//       </div>
//     </div>
//   );
// };



// // Sidebar.js
// // const Sidebar = () => {
// //     return <div>Sidebar Content</div>;
// //   };
  
//   export default Sidebar;
  

















import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon

const Sidebar = ({ isOpen, toggleSidebar, onSelectCategory,isLargerDevice }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 top-10 bg-white shadow-lg z-10 ${
        isOpen ? 'w-64' : 'w-0'
      } transition-all duration-300 overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">My Account</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer md:hidden" // Close button for mobile
            onClick={toggleSidebar}
          />
        </div>
        <ul className="space-y-4 ">
          <li  className="cursor-pointer hover:font-bold"  onClick={() =>{{!isLargerDevice ? toggleSidebar():""} onSelectCategory('orders')}}>Orders</li>
          <li className="cursor-pointer hover:font-bold"  onClick={() =>{{!isLargerDevice ? toggleSidebar():""} onSelectCategory('customerCare')}}>
            Customer Care
          </li>
          <li className="font-bold">Profile</li>
          <ul className="space-y-2 ml-4">
            <li className="cursor-pointer hover:font-bold"  onClick={() => {{!isLargerDevice ? toggleSidebar():""} onSelectCategory('aboutus')}}>About Us</li>
            <li className="cursor-pointer hover:font-bold"  onClick={() =>{{!isLargerDevice ? toggleSidebar():""}  onSelectCategory('address')}}>Address Book</li>
            {/* <li className="cursor-pointer hover:font-bold"  onClick={() => {{!isLargerDevice ? toggleSidebar():""} onSelectCategory('personalInfo')}}>
              Personal Information
            </li> */}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
