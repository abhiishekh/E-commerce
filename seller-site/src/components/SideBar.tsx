import { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate()
  const [isToggled, setIsToggled] = useState<boolean>(false);

  return (
    <>
      <div
        className="block md:hidden absolute text-3xl top-4 left-5 z-10 bg-white rounded-full p-2"
        onClick={() => setIsToggled(!isToggled)}
      >
        <IoMenu />
      </div>
      
      {isToggled && (
        <div
          className="block md:hidden fixed top-0 left-0 w-64 min-h-screen backdrop-blur-md bg-[#D9D9D9]/90 transition-all duration-300 ease-in-out transform"
          style={{ transform: isToggled ? 'translateX(0)' : 'translateX(-100%)', opacity: isToggled ? 1 : 0 }}
        >
          <h1 className="font-bold text-3xl flex justify-center py-5 mt-16"
          onClick={()=>navigate('/') }>Shoppi!</h1>
          <div className="w-full flex justify-center">
            <div className="flex flex-col items-start gap-4">
              <h2 className="font-semibold text-xl capitalize hover:cursor-pointer px-2"
              onClick={()=>navigate('/sellers') }>Sellers</h2>
              <h2 className="font-semibold text-xl capitalize hover:cursor-pointer px-2"
              onClick={()=>navigate('/products') }>Products</h2>
              <h2 className="font-semibold text-xl capitalize hover:cursor-pointer px-2"
              onClick={()=>navigate('/users') }>Users</h2>
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:block top-0 left-0 w-64 min-h-screen bg-[#D9D9D9]">
        <h1 className="font-bold text-3xl flex justify-center py-5 mt-16"
        onClick={()=>navigate('/') }>Shoppi!</h1>
        <div className="w-full flex justify-center">
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-semibold text-xl capitalize hover:cursor-pointer px-2"
            onClick={()=>navigate('/sellers') }>Sellers</h2>
            <h2 className="font-semibold text-xl capitalize hover:cursor-pointer px-2"
            onClick={()=>navigate('/products') }>Products</h2>
            <h2 className="font-semibold text-xl capitalize hover:cursor-pointer px-2"
            onClick={()=>navigate('/users') }>Users</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
