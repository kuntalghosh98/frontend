

import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import AuriusLogoGold from '../public/AuriusLogoGold.png';
import AuriusLogoWhite from '../public/AuriusLogoWhite.png';
import AuriusLogoBlack from '../public/AuriusLogoBlack.png';


const Footer = () => {
  return (
    <footer className="bg-[#d7c9bb] text-white p-6 md:p-10 font-serif">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left - Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-sm tracking-widest uppercase">
          <Link href="/products?category=women+jewellery+rings" className="hover:opacity-80">Rings</Link>
          <Link href="/products?category=women+jewellery+earrings" className="hover:opacity-80">Earrings</Link>
          <Link href="/products?category=women+jewellery+necklaces" className="hover:opacity-80">Necklaces</Link>
          <Link href="/products?category=women+jewellery+bracelets" className="hover:opacity-80">Bracelets</Link>
          <Link href="/products?category=women+jewellery+bangles" className="hover:opacity-80">Bangles</Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex mt-4 md:mt-0 space-x-4 md:space-x-6">
          <a href="https://www.facebook.com/share/19n2bv36tC/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80" />
          </a>
          <a href="https://www.instagram.com/aurius_luxury?igsh=NThkOTFsdTE4emls" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80" />
          </a>
          {/* <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterestP className="w-4 h-4 md:w-5 md:h-5 hover:opacity-80" />
          </a> */}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto border-t border-white opacity-50 my-3"></div>

      {/* Logo */}
      {/* <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-center font-bold tracking-wide aequitas-font leading-none m-0 p-0">
        Classic Aura
      </h1> */}
      <div className="flex justify-center ">
      <Image src={AuriusLogoWhite}
      className="w-[40vw] "

      />
      </div>
      

      {/* Divider */}
      <div className="mx-auto border-t border-white opacity-50 mt-3"></div>

      {/* Secondary Links */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs tracking-wide uppercase">
          <Link href="/" className="hover:opacity-80">Home</Link>
          <Link href="/products" className="hover:opacity-80">Shop</Link>
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
