

// // components/AboutUs.js
// import React from "react";
// import Image from "next/image";
// import Head from "next/head";
// import aboutImage from "../Utility/icons/aboutus.jpg"; // Centralized asset import

// const AboutUs = () => {
//   return (
//     <>
//       {/* SEO Meta Tags */}
//       <Head>
//         <title>About Us - Celestique Jewelry</title>
//         <meta
//           name="description"
//           content="Discover the story behind Celestique Jewelry. Exceptional craftsmanship, timeless elegance, and a celebration of life's precious moments."
//         />
//       </Head>

//       <main className="bg-cream text-gray-800 py-12 px-6 md:px-16 mt-4">
//         <section className="container mx-auto flex flex-col md:flex-row items-center">
//           {/* Text Block */}
//           <div className="md:w-1/2 space-y-6">
//             <h1 className="text-6xl md:text-8xl font-bold text-gray-300 uppercase leading-none">
//               About Us
//             </h1>
//             <p className="text-lg">
//               At <strong>Celestique</strong>, we believe jewelry is more than just an accessory;
//               it’s a timeless expression of elegance and a celebration of life’s most precious moments.
//             </p>
//             <p className="text-lg">
//               Our brand is synonymous with exceptional craftsmanship and sophistication.
//               Every piece is meticulously created by skilled artisans to ensure lasting beauty.
//             </p>
//             <p className="text-lg">
//               Explore our collection and experience the celestial elegance that defines us.
//             </p>
//           </div>

//           {/* Image Block */}
//           <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
//             <div className="rounded-lg overflow-hidden shadow-lg w-full max-w-md">
//               <Image
//                 src={aboutImage}
//                 alt="Jewelry artisan crafting Celestique design"
//                 width={500}
//                 height={500}
//                 priority
//                 className="object-cover w-full h-auto"
//               />
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// };

// export default AboutUs;



import React from 'react';
import Image from 'next/image';
import aboutImage from "../Utility/icons/aboutus.jpg"; // Replace with your brand image

const AboutUs = () => {
  return (
    <div className="bg-[#f9f5f0] text-[#3d3d3d]">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src={aboutImage}
          alt="Aurius - Crafting Elegance"
          layout="fill"
          objectFit="cover"
          // className="opacity-90"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-300 uppercase leading-none">
             About Us
           </h1>
        </div> */}
      </section>

      {/* Our Story */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#1e1e1e] mb-6">Our Story</h2>
        <p className="text-lg leading-8 tracking-wide text-gray-700">
          At <span className="font-semibold text-black">Aurius</span>, we believe luxury is a story told through elegance,
          precision, and timeless design. Born from a passion for craftsmanship and a devotion to modern sophistication,
          Aurius brings to life jewelry that is both a statement and a legacy. <br /><br />
          Every piece we create is a journey — from sketch to sparkle — crafted by skilled artisans using ethically
          sourced materials and premium metals. Whether it’s a cherished heirloom or a bold expression of identity,
          Aurius jewelry is made to elevate every moment.
        </p>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: 'Craftsmanship', text: 'Meticulous artistry defines every creation, ensuring precision and luxury in every detail.' },
            { title: 'Sustainability', text: 'We use ethically sourced gemstones and recycled metals for a more beautiful future.' },
            { title: 'Timeless Design', text: 'Our collections blend heritage with contemporary design to remain elegant for decades.' },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className=" py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-8">
            To redefine modern luxury through timeless jewelry that resonates with elegance, purpose, and personal identity.
            We envision a world where every jewel tells a story — of love, heritage, and individuality.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
