
import React from 'react';
import Image from "next/image";
import ContactUs from '@/components/ContactUs';
import { url } from '@/constant';
function contactus() {
    const imageUrl = `${url}uploads/contactUs.png`;
  return (
    <div className=''>
         {/* <Image className="h-6 w-6 " src={imageUrl} alt="Image1" width={128} height={128} /> */}
      <ContactUs/>
    </div>
  )
}

export default contactus;
