import React from 'react';
import Image from 'next/image';
import imageUrl from "../Utility/icons/contactUs.png";
import image3 from "../Utility/icons/contactUs.png";
import MediaBanner from '@/components/MediaBanner';
function ContactUs() {
    
  return (
    <div>
         <Image className="mt-10" src={image3} alt="Image1"  />
    </div>
  )
}

export default ContactUs;