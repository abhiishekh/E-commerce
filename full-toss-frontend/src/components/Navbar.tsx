import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Navbar = () => {
  const navigation = useNavigate();
  const { isAuthenticated,cart, cartlength } = useAuth();
  const handlelogin = () => {
    navigation("/login");
  };

  console.log(cart)
 useEffect(()=>{
  cartlength()
 },[cart])


  return (
    <div
      className=" h-12 w-full bg-black text-white sticky top-0
     left-0 z-50 flex justify-between px-2 md:px-32 2xl:px-64 items-center"
    >
      <div>
        <h1
          className="hidden lg:block font-medium text-xl cursor-pointer heading"
          onClick={() => navigation("/")}
        >
          IPL Shopping
        </h1>
        <h1
          className=" lg:hidden text-2xl mr-2"
          onClick={() => navigation("/")}
        >
          <FaHome />
        </h1>
      </div>
      {/* inputbox */}
      <div className="mr-2">
        <input
          type="text"
          placeholder="Search items..."
          className=" px-5 py-2 w-full lg:w-[600px] rounded-md text-sm outline-none text-black font-medium cursor-pointer"
        />
      </div>
      {/* //login and cart */}
      <div className="flex gap-4 lg:gap-10 font-semibold text-lg items-center cursor-pointer">
        {isAuthenticated ? (
          <p className="capitalize" onClick={() => navigation("/profile")}>
            Profile
          </p>
        ) : (
          <p onClick={handlelogin}>Login</p>
        )}
        <div className="flex" onClick={() => navigation("/cart")}>
          <p>
            <FaCartPlus />
          </p>
          {cart ? (
          <p className="w-5 h-5 absolute top-[0.15rem] z-60 text-sm font-normal ml-1 md:ml-3 rounded-full bg-gray-400/50 backdrop-blur-md flex items-center justify-center">
            {cart}
          </p>

          ):('')}
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
