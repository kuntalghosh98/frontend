

// // components/Sidebar.js
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { clearUser, logout } from '../../store/slices/userSlice';
// const Sidebar = ({ isOpen, toggleSidebar, onSelectCategory, isLargerDevice }) => {
//     const user = useSelector((state) => state.user.user); // Adjust based on your state structure
//     const dispatch = useDispatch();
//     const router = useRouter();
//   const handleClick = (category) => {
//     if (!isLargerDevice) toggleSidebar();
//     onSelectCategory(category);
//   };
//    const handleLogout = () => {
//       dispatch(clearUser());
//       localStorage.removeItem('token');
//       router.push('/');
//     };

//   return (
//     <div
//       className={`fixed inset-y-0 left-0 top-10 bg-white shadow-lg z-10 transition-all duration-300 overflow-hidden ${
//         isOpen ? 'w-64' : 'w-0'
//       }`}
//     >
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-bold text-lg">My Account</h2>
//           <FontAwesomeIcon
//             icon={faTimes}
//             className="cursor-pointer md:hidden"
//             onClick={toggleSidebar}
//             role="button"
//             tabIndex={0}
//           />
//         </div>

//         {/* Main Categories */}
//         <ul className="space-y-4">
//           <li
//             className="cursor-pointer hover:font-bold"
//             onClick={() => handleClick('orders')}
//           >
//             Orders
//           </li>
//           <li
//             className="cursor-pointer hover:font-bold"
//             onClick={() => handleClick('customerCare')}
//           >
//             Customer Care
//           </li>

//           {/* Subsection: Profile */}
//           <li className="font-bold">Profile</li>
//           <ul className="space-y-2 ml-4">
//             <li
//               className="cursor-pointer hover:font-bold"
//               onClick={() => handleClick('aboutus')}
//             >
//               About Us
//             </li>
//             <li
//               className="cursor-pointer hover:font-bold"
//               onClick={() => handleClick('address')}
//             >
//               Address Book
//             </li>
//             {/* Uncomment if Personal Info is added later */}
//             {/* <li
//               className="cursor-pointer hover:font-bold"
//               onClick={() => handleClick('personalInfo')}
//             >
//               Personal Information
//             </li> */}
//           </ul>
//         </ul>
//       </div>
//       <div className="p-4 cursor-pointer" onClick={handleLogout}>Logout</div>
//     </div>
//   );
// };

// export default Sidebar;


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { clearUser } from '../../store/slices/userSlice';

const Sidebar = ({ isOpen, toggleSidebar, onSelectCategory, isLargerDevice }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (category) => {
    if (!isLargerDevice) toggleSidebar();
    onSelectCategory(category);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">My Account</h2>
        <FontAwesomeIcon
          icon={faTimes}
          className="cursor-pointer text-gray-500 hover:text-black md:hidden"
          onClick={toggleSidebar}
          role="button"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between h-[calc(100%-8rem)]">
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Main Sections */}
          <div className="space-y-3">
            <button
              onClick={() => handleClick('orders')}
              className="w-full flex justify-between items-center text-left text-gray-700 hover:text-black font-medium"
            >
              Orders
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>

            <button
              onClick={() => handleClick('customerCare')}
              className="w-full flex justify-between items-center text-left text-gray-700 hover:text-black font-medium"
            >
              Customer Care
              <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
            </button>
          </div>

          {/* Profile Section */}
          <div>
            <h3 className="text-sm text-gray-500 uppercase mb-3">Profile</h3>
            <div className="space-y-2 pl-2">
              <button
                onClick={() => handleClick('aboutus')}
                className="w-full text-left text-gray-700 hover:text-black"
              >
                About Us
              </button>
              <button
                onClick={() => handleClick('address')}
                className="w-full text-left text-gray-700 hover:text-black"
              >
                Address Book
              </button>
              {/* Add more profile options here if needed */}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="borde border-gray-200 p-5">
          <button
            onClick={handleLogout}
            className=" w-full text-middle text-red-600 hover:text-red-800 font-medium"
            style={{border: '1px solid red', borderRadius: '120px', padding: '10px'}}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
