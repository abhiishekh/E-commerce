// import React from 'react'

import { Link } from "react-router-dom";

// import newsletter from '../assets/images/newsletter-bg.jpeg'
const Footer = () => {
  return (
    <div
      className="h-auto w-full bg-black/90 left-0 bottom-0 text-white pt-4 flex flex-col items-center bg-cover bg-center"
      // style={{ backgroundImage: `url(${newsletter})` }} // Correctly apply the background image
    >
      <div className="w-full  md:w-4/5 px-2 md:px-32 flex justify-center flex-col md:flex-row items-center gap-10 ">
        
        {/* Teams Section */}
        <div className="w-1/3">
          <h1 className="font-semibold mb-2">Contact</h1>
         
        </div>

        {/* Captain's Section */}
        <Link to='https://adminshop-orcin.vercel.app/'>
        <div className="w-1/3">
          <h1 className="font-semibold mb-2">Become Seller</h1>
         
        </div>
        </Link>

        

      </div>

      {/* Footer Copyright Section */}
      <div className="mt-14 w-full flex px-2 items-center justify-center gap-10 font-regular text-sm bg-black/20 py-2 ">
        <h1>@All Copyright reserved</h1>
        <h1> Designed & developed by Abhishek Maurya</h1>
      </div>
    </div>
  );
}

export default Footer;
