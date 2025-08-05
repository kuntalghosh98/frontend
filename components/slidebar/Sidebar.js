


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon

// const Sidebar = ({ isOpen, toggleSidebar, onSelectCategory,isLargerDevice }) => {
//   return (
//     <div
//       className={`fixed inset-y-0 left-0 top-10 bg-white shadow-lg z-10 ${
//         isOpen ? 'w-64' : 'w-0'
//       } transition-all duration-300 overflow-hidden`}
//     >
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-bold text-lg">My Account</h2>
//           <FontAwesomeIcon
//             icon={faTimes}
//             className="cursor-pointer md:hidden" // Close button for mobile
//             onClick={toggleSidebar}
//           />
//         </div>
//         <ul className="space-y-4 ">
//           <li  className="cursor-pointer hover:font-bold"  onClick={() =>{{!isLargerDevice ? toggleSidebar():""} onSelectCategory('orders')}}>Orders</li>
//           <li className="cursor-pointer hover:font-bold"  onClick={() =>{{!isLargerDevice ? toggleSidebar():""} onSelectCategory('customerCare')}}>
//             Customer Care
//           </li>
//           <li className="font-bold">Profile</li>
//           <ul className="space-y-2 ml-4">
//             <li className="cursor-pointer hover:font-bold"  onClick={() => {{!isLargerDevice ? toggleSidebar():""} onSelectCategory('aboutus')}}>About Us</li>
//             <li className="cursor-pointer hover:font-bold"  onClick={() =>{{!isLargerDevice ? toggleSidebar():""}  onSelectCategory('address')}}>Address Book</li>
//             {/* <li className="cursor-pointer hover:font-bold"  onClick={() => {{!isLargerDevice ? toggleSidebar():""} onSelectCategory('personalInfo')}}>
//               Personal Information
//             </li> */}
//           </ul>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




// components/Sidebar.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { clearUser, logout } from '../../store/slices/userSlice';
const Sidebar = ({ isOpen, toggleSidebar, onSelectCategory, isLargerDevice }) => {
    const user = useSelector((state) => state.user.user); // Adjust based on your state structure
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
      className={`fixed inset-y-0 left-0 top-10 bg-white shadow-lg z-10 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-0'
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">My Account</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="cursor-pointer md:hidden"
            onClick={toggleSidebar}
            role="button"
            tabIndex={0}
          />
        </div>

        {/* Main Categories */}
        <ul className="space-y-4">
          <li
            className="cursor-pointer hover:font-bold"
            onClick={() => handleClick('orders')}
          >
            Orders
          </li>
          <li
            className="cursor-pointer hover:font-bold"
            onClick={() => handleClick('customerCare')}
          >
            Customer Care
          </li>

          {/* Subsection: Profile */}
          <li className="font-bold">Profile</li>
          <ul className="space-y-2 ml-4">
            <li
              className="cursor-pointer hover:font-bold"
              onClick={() => handleClick('aboutus')}
            >
              About Us
            </li>
            <li
              className="cursor-pointer hover:font-bold"
              onClick={() => handleClick('address')}
            >
              Address Book
            </li>
            {/* Uncomment if Personal Info is added later */}
            {/* <li
              className="cursor-pointer hover:font-bold"
              onClick={() => handleClick('personalInfo')}
            >
              Personal Information
            </li> */}
          </ul>
        </ul>
      </div>
      <div className="p-4 cursor-pointer" onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default Sidebar;
