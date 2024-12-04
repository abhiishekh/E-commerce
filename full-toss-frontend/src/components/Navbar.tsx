import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const navigation = useNavigate()

  const handlelogin = ()=>{
      navigation('/login')
  }
  return (
    <div className=" h-12 w-full bg-Rcb-red text-white sticky top-0
     left-0 z-50 flex justify-between px-2 md:px-32 items-center">
      <div>
        <h1 className="hidden lg:block font-medium text-xl" onClick={()=>navigation('/')}>IPL Shopping</h1>
        <h1 className=" lg:hidden text-2xl mr-2" onClick={()=>navigation('/')}><FaHome/></h1>
      </div>
      {/* inputbox */}
      <div className="mr-2">
        <input type="text"placeholder="Search items..."
         className=" px-5 py-1 w-full lg:w-[600px] rounded-md text-sm outline-none text-black font-medium"/>
      </div>
      {/* //login and cart */}
      <div className="flex gap-4 lg:gap-10 font-semibold text-lg items-center">
        <p onClick={handlelogin}>Login</p>
        <p onClick={()=>navigation('/cart')}><FaCartPlus/></p>
      </div>
    </div>
  )
}

export default Navbar