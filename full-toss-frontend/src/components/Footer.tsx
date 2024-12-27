// import React from 'react'

import { Link } from "react-router-dom";

// import newsletter from '../assets/images/newsletter-bg.jpeg'
const Footer = () => {
  return (
    <div
      className="h-auto w-full bg-black/90 left-0 bottom-0 text-white pt-4 flex flex-col items-center bg-cover bg-center">
      <div className="w-1/2  md:w-4/5 px-2  flex justify-center md:px-32 flex-col md:flex-row items-center sm:gap-20">
        
        {/* Teams Section */}
        <Link to='https://abhishekmaurya.in'>
        <div className="w-full">
          <h1 className="font-semibold mb-2">Contact</h1>
        </div>
        </Link>

        {/* Captain's Section */}
        <Link to='https://adminshop-orcin.vercel.app/'>
        <div className="w-full ">
          <h1 className="font-semibold mb-2">Become A Seller</h1>
         
        </div>
        </Link>

        

      </div>

      {/* Footer Copyright Section */}
      <div className="mt-5 w-full flex px-2 items-center justify-center sm:gap-10 font-regular text-sm bg-black/20 py-2 ">
        <h1 className="">@All Copyright reserved</h1>
        <h1 className=""> Designed & developed by Abhishek Maurya</h1>
      </div>
    </div>
  );
}

export default Footer;
