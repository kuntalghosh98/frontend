import { FaBox, FaMapMarkerAlt, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";

const tabs = [
  { id: "orders", label: "Orders", icon: <FaBox /> },
  { id: "address", label: "Address", icon: <FaMapMarkerAlt /> },
  { id: "customerCare", label: "Customer Care", icon: <FaPhoneAlt /> },
  { id: "aboutus", label: "About Us", icon: <FaInfoCircle /> },
];

export default function AccountTabs({ selected, onSelect }) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200
            ${
              selected === tab.id
                ? "border-yellow-500 text-yellow-600 font-semibold"
                : "border-transparent text-gray-600 hover:text-yellow-600 hover:border-yellow-300"
            }
          `}
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
