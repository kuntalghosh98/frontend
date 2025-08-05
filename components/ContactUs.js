// import React from 'react';
// import Image from 'next/image';
// import imageUrl from "../Utility/icons/contactUs.png";
// import image3 from "../Utility/icons/contactUs.png";
// import MediaBanner from '@/components/MediaBanner';
// function ContactUs() {
    
//   return (
//     <div>
//          {/* <Image className="mt-10" src={image3} alt="Image1"  /> */}
         
//     </div>
//   )
// }

// export default ContactUs;


// components/ContactUs.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

const contactMethods = [
  {
    icon: faPhone,
    title: 'Call Us',
    subtitle: '+91 91042 63912',
    // link: 'tel:+919104263912',
  },
  {
    icon: faWhatsapp,
    title: 'WhatsApp Support',
    subtitle: '+91 91042 63912',
    // link: 'https://wa.me/911234567890',
  },
  {
    icon: faEnvelope,
    title: 'Customer Support',
    subtitle: 'support@aurius.in',
    // link: 'mailto:support@aurius.in',
  },
  {
    icon: faEnvelope,
    title: 'Business Inquiries',
    subtitle: 'business@aurius.in',
    // link: 'mailto:business@aurius.in',
  },
  {
    icon: faInstagram,
    title: 'Instagram',
    subtitle: '@aurius_luxury',
    link: 'https://www.instagram.com/aurius_luxury?igsh=NThkOTFsdTE4emls',
  },
  {
    icon: faFacebook,
    title: 'Facebook',
    subtitle: 'aurius',
    link: 'https://www.facebook.com/share/19n2bv36tC/?mibextid=LQQJ4d',
  },
];

const ContactUs = () => {
  return (
    <div className="bg-[#f9f5f0] text-[#1e1e1e] font-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#d7c9bb] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif tracking-wide text-white">Contact Us</h1>
        <p className="mt-4 text-white text-lg">We’d love to hear from you</p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex items-center space-x-4"
          >
            <div className="text-[#bca88e] text-3xl min-w-[40px]">
              <FontAwesomeIcon icon={method.icon} />
            </div>
            <div>
              <h3 className="text-lg font-medium font-serif">{method.title}</h3>
              <p className="text-sm text-gray-600">{method.subtitle}</p>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};

export default ContactUs;
