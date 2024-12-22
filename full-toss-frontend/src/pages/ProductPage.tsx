import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecomendedProducts from "../components/RecomendedProducts";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

interface LocationState {
  id: string | undefined;
}

const ProductPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { id }: LocationState = location.state || {};
  const [loading, setLoading] = useState<boolean>(false)
  const {cartlength} = useAuth()
  const { data } = useFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/product/${id}` })
    const handleCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Login to add to cart");
        navigate('/login');
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/addtocart/${id}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );
        console.log("Product added to cart:", response.data);
        await cartlength();
      } catch (error: any) {
        console.error("Error adding product to cart:", error.message || error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <>

      <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto mt-12 h-full flex flex-wrap gap-8 justify-center py-1 px-3">
        <div className="flex w-full h-full gap-2 md:gap-12">
          {/* img */}
          <div className="w-1/2 h-[260px] md:h-[500px] p-5 bg-white rounded-lg">
            <img src={data.imageURL} alt="" className="h-full w-full object-contain" />
          </div>
          {/* details  */}
          <div className="mt-0 md:mt-12 w-1/2 flex flex-col gap-2 md:gap-5">
            <h1 className="font-bold text-3xl">{data.title}</h1>
            <h1>{data.description}</h1>
            <div className="">
              <div className="flex gap-2 items-center">

                <h1>Price: </h1>
                <h1 className="text-sm">{data.price}</h1>
              </div>

              <div className="flex gap-2 items-center">

                <h1>MRP: </h1>
                <h1 className="line-through text-sm">{data.mrp}</h1>
              </div>
            </div>
            <div className="flex  w-full flex-wrap list-none gap-2">
              <li className="lala py-1 px-3 rounded-md bg-black text-white">XS</li>
              <li className="lala py-1 px-3 rounded-md bg-black text-white">S</li>
              <li className="lala py-1 px-3 rounded-md bg-black text-white">M</li>
              <li className="lala py-1 px-3 rounded-md bg-black text-white">L</li>
              <li className="lala py-1 px-3 rounded-md bg-black text-white">XL</li>
              <li className="lala py-1 px-3 rounded-md bg-black text-white">2XL</li>

            </div>
            <div className="flex flex-col gap-2">

            <button className="w-full md:w-1/2 p-2 bg-purple-700/80 hover:bg-purple-700 rounded-md text-white
            transform translate-all duration-300"
            onClick={handleCart}
            >
              {loading ?('Adding...'):('Add to cart')}</button>
            <button className="w-full md:w-1/2 p-2 bg-red-900/80 hover:bg-red-900 rounded-md text-white
            transform translate-all duration-300"
            onClick={()=>navigate('/cart')}
            >Buy Now</button>
            </div>
          </div>
        </div>

      </div>
      <div className=" w-full md:w-5/6 2xl:w-3/5 mx-auto flex flex-col gap-4 p-2 mt-12">
        <h1 className="font-bold text-3xl">Specifications</h1>
        <h1>{data.description}</h1>
      </div>
      {/* //RecomendedProducts */}

      <div className=" p-2 w-full md:w-5/6 2xl:w-3/5 mx-auto h-full flex flex-col  gap-10 my-4">
        <h1 className="font-bold text-3xl ">Similar Products</h1>
        <div className="flex flex-wrap gap-10 mx-auto justify-center" >

          <RecomendedProducts />
          <RecomendedProducts />
          <RecomendedProducts />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
