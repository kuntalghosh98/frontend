// import React from "react";
// import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../Utility/icons/logo1.png"; // Update with your actual logo path


// const Footer = () => {
//     return (
//       <footer className="bg-red-100 text-black py-8 px-4">
//         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//           {/* Left: Logo & Name */}
//           <div className="flex items-center space-x-3 ">
//             {/* <Image src={logo} alt="Brand Logo" width={280} height={280} /> */}
//             <h2 className="text-lg font-semibold uppercase">Classic Aura</h2>
//           </div>

//           {/* Center: Navigation Links */}
//           <nav className="flex space-x-6 text-sm mt-4 md:mt-0">
//             <Link href="/" className="hover:text-gray-400">Home</Link>
//             <Link href="/Products" className="hover:text-gray-400">Shop</Link>
//             <Link href="/aboutus" className="hover:text-gray-400">About Us</Link>
//             <Link href="/contactus" className="hover:text-gray-400">Contact</Link>
//           </nav>

//           {/* Right: Social Media Icons */}
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//               <FaFacebookF className="w-5 h-5 hover:text-gray-400" />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//               <FaInstagram className="w-5 h-5 hover:text-gray-400" />
//             </a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//               <FaTwitter className="w-5 h-5 hover:text-gray-400" />
//             </a>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="text-center text-xs mt-6 text-gray-500">
//           <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
//           <div className="mt-2 space-x-4">
//             <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
//             <span>|</span>
//             <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
//           </div>
//         </div>
//       </footer>
//     );
//   };

//   export default Footer;
// http://localhost:3000/Products?category=women+jewellery+bracelets




















import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#d7c9bb] text-white p-6 md:p-10 font-serif">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left - Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm tracking-widest uppercase">
          <Link href="/Products?category=women+jewellery+rings" className="hover:opacity-80">Rings</Link>
          <Link href="/Products?category=women+jewellery+earrings" className="hover:opacity-80">Earrings</Link>
          <Link href="/Products?category=women+jewellery+necklaces" className="hover:opacity-80">Necklaces</Link>
          <Link href="/Products?category=women+jewellery+bracelets" className="hover:opacity-80">Bracelets</Link>
          <Link href="/Products?category=women+jewellery+bangles" className="hover:opacity-80">Bangles</Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex mt-4 md:mt-0 space-x-4 md:space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80" />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterestP className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto border-t border-white opacity-50 my-3"></div>

      {/* Logo */}
      <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-center font-bold tracking-wide aequitas-font leading-none m-0 p-0">
        Classic Aura
      </h1>

      {/* Divider */}
      <div className="mx-auto border-t border-white opacity-50 mt-3"></div>

      {/* Secondary Links */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs tracking-wide uppercase">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <Link href="/Products" className="hover:opacity-80">Shop</Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs tracking-wide uppercase mt-4 md:mt-0">
          <Link href="/aboutus" className="hover:opacity-80">About Us</Link>
          <Link href="/contactus" className="hover:opacity-80">Contact Us</Link>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs opacity-80 mt-4">
        © {new Date().getFullYear()} Celestique Jewelry. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
