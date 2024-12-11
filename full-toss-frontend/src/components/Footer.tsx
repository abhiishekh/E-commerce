// import React from 'react'

const Footer = () => {
  return (
    <div className="h-auto w-full bg-[var(--primary-color)] left-0 bottom-0 text-white pt-4 flex flex-col items-center ">
      <div className="w-full md:w-4/5 px-2 md:px-32 flex justify-center flex-col md:flex-row items-center gap-10 ">
        
        {/* Teams Section */}
        <div className="w-1/3">
          <h1 className="font-semibold mb-2">Teams</h1>
          <div className="text-sm font-regular">
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Royal Challenger’s Bangalore</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Chennai Super King’s</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Mumbai Indian’s</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Lucknow Super Giants</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Gujarat Titans</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Punjab Kings</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Rajasthan Royals</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Delhi Capitals</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Kolkata Knight Riders</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Sunrisers Hyderabad</p>
          </div>
        </div>

        {/* Captain's Section */}
        <div className="w-1/3">
          <h1 className="font-semibold mb-2">Capton's</h1>
          <div className="text-sm font-regular">
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Faf du Plessis</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">MS Dhoni</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Rohit Sharma</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">KL Rahul</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Hardik Pandya</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Shikhar Dhawan</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Sanju Samson</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">David Warner</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Shreyas Iyer</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">Aiden Markram</p>
          </div>
        </div>

        {/* Official Pages Section */}
        <div className="w-1/3">
          <h1 className="font-semibold mb-2">Official Pages</h1>
          <div className="text-sm font-regular">
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@royalchallengersbangalore</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@chennaiipl</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@mumbaiindians</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@lucknowsupergiants</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@gujarat_titans</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@punjabkingsipl</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@rajasthanroyals</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@delhicapitals</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@kkriders</p>
            <p className="hover:scale-110 transform transition-all duration-300 ease-in-out">@sunrisershyderabad</p>
          </div>
        </div>

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
