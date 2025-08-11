



// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import Sidebar from "../components/slidebar/Sidebar";
// import OrdersPage from "./OrdersPage";
// import AddressPage from "./address";
// import ContactUs from "@/components/ContactUs";
// import AboutUs from "@/components/AboutUs";

// const CATEGORY_COMPONENTS = {
//   orders: OrdersPage,
//   customerCare: ContactUs,
//   aboutus: AboutUs,
//   address: AddressPage,
// };

// const Account = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState("address");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderContent = () => {
//     const SelectedComponent = CATEGORY_COMPONENTS[selectedCategory] || AddressPage;
//     return <SelectedComponent />;
//   };

//   return (
//     <div className="min-h-screen flex pt-12">
//       {/* Sidebar for larger screens */}
//       <div className="hidden md:block">
//         <Sidebar
//           isOpen={true}
//           onSelectCategory={setSelectedCategory}
//           isLargerDevice={true}
//         />
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 p-4 md:pl-64">
//         {/* Sidebar toggle button for mobile */}
//         <button
//           className="md:hidden"
//           onClick={toggleSidebar}
//           aria-label="Toggle Sidebar"
//         >
//           <FontAwesomeIcon icon={faBars} size="2x" />
//         </button>

//         {/* Sidebar Overlay (Mobile) */}
//         {isSidebarOpen && (
//           <div className="fixed inset-0 z-40 md:hidden">
//             <Sidebar
//               isOpen={isSidebarOpen}
//               toggleSidebar={toggleSidebar}
//               onSelectCategory={setSelectedCategory}
//               isLargerDevice={false}
//             />
//             {/* Overlay to close the sidebar when clicking outside */}
//             <div
//               className="fixed inset-0 bg-black opacity-50"
//               onClick={toggleSidebar}
//             />
//           </div>
//         )}

//         {/* Main content */}
//         <div className="flex-1">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default Account;




import { useState } from "react";
import OrdersPage from "./OrdersPage";
import AddressPage from "./address";
import ContactUs from "@/components/ContactUs";
import AboutUs from "@/components/AboutUs";
import AccountTabs from "../components/slidebar/AccountTabs"; // new tabs component

const CATEGORY_COMPONENTS = {
  orders: OrdersPage,
  address: AddressPage,
  customerCare: ContactUs,
  aboutus: AboutUs,
};

const Account = () => {
  const [selectedCategory, setSelectedCategory] = useState("address");

  const renderContent = () => {
    const SelectedComponent =
      CATEGORY_COMPONENTS[selectedCategory] || AddressPage;
    return <SelectedComponent />;
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 px-4 md:px-12 bg-white">
      {/* Account Tabs */}
      <div className="w-full border-b border-gray-200">
        <AccountTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Content */}
      <div className="flex-1 py-6">{renderContent()}</div>
    </div>
  );
};

export default Account;
