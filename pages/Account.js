

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import the bars icon
import Sidebar from '../components/slidebar/Sidebar';
import OrdersPage from './OrdersPage';
import CustomerCarePage from './CustomerCarePage';
import PaymentsPage from './PaymentsPage';
import PersonalInfoPage from './PersonalInfoPage';
import AddressPage from './address';

const Account = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('address');

  const toggleSidebar = () => {
    console.log("close")
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    
    switch (selectedCategory) {
      case 'orders':
        return <OrdersPage />;
      case 'customerCare':
        return <CustomerCarePage />;
      case 'payments':
        return <PaymentsPage />;
      case 'personalInfo':
        return <PersonalInfoPage />;
      case 'address':
        return <AddressPage />;
      default:
        return <AddressPage />;
    }
   
  };

  return (

    <div className=" min-h-screen flex  pt-12 ">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar isOpen={true} onSelectCategory={setSelectedCategory} isLargerDevice={true} />
      </div>
      {/* Sidebar for mobile view */}
      <div className="flex-1 p-4 md:pl-64" >
        <button className="md:hidden " onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="2x" /> {/* Three-line icon */}
        </button>
        {/* Sidebar Overlay (Mobile) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <Sidebar
              isOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              onSelectCategory={setSelectedCategory}
              isLargerDevice={false}
            />
            {/* Overlay to close the sidebar when clicking outside */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={toggleSidebar}
            />
          </div>
        )}
        {/* Main content */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Account;
