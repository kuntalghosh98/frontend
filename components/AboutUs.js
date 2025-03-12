import React from "react";
import Image from "next/image";
import Link from "next/link";
import aboutImage from "../Utility/icons/aboutus.jpg"; // Replace with actual image path

const AboutUs = () => {
  return (
    <div className="bg-cream text-gray-800 py-12 px-6 md:px-16 mt-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-300 uppercase leading-none">
            About Us
          </h1>
          <p className="text-lg">
            At <span className="font-semibold">Celestique</span>, we believe that jewelry is more than just an accessory; it’s a timeless expression of elegance and a celebration of life’s most precious moments.
          </p>
          <p className="text-lg">
            Our brand has become synonymous with exceptional craftsmanship and sophistication. Every design is meticulously crafted by skilled artisans, ensuring that each item is not only beautiful but built to last.
          </p>
          <p className="text-lg">
            Explore our collection and experience the celestial elegance that defines us.
          </p>
          {/* <Link href="/shop">
            <button className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition text-lg">
              More About Us →
            </button>
          </Link> */}
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image src={aboutImage} alt="Elegant Jewelry Models" width={500} height={500} className="object-cover"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
