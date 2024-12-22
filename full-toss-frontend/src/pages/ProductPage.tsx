import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

interface LocationState {
  id: string | undefined;
}

const ProductPage: React.FC = () => {
  const location = useLocation();
  const { id }: LocationState = location.state || {};

  const {data} = useFetch({url:`${import.meta.env.VITE_BACKEND_URL}/product/${id}`})
  return (
    <div className="w-full md:w-5/6 2xl:w-3/5 mx-auto min-h-screen flex flex-wrap gap-8 justify-center py-1 px-3">
      <div className="flex w-full h-full">
        {/* img */}
        <div className="w-1/2 h-[500px]">

     <img src={data.imageURL} alt="" className="h-full w-full object-contain"/>
        </div>
        {/* details  */}
        <div className="mt-12 w-1/2 flex flex-col gap-5">
          <h1 className="font-bold">{data.title}</h1>
        <div className="">
        <h1>Price: {data.price}</h1>
        <div className="flex gap-2">

        <h1>MRP: </h1>
        <h1 className="line-through">{data.mrp}</h1>
        </div>
        </div>
        <div className="flex list-none gap-4">
          <li className="lala py-1 px-3 rounded-md bg-black text-white">XS</li>
          <li className="lala py-1 px-3 rounded-md bg-black text-white">S</li>
          <li className="lala py-1 px-3 rounded-md bg-black text-white">M</li>
          <li className="lala py-1 px-3 rounded-md bg-black text-white">L</li>
          <li className="lala py-1 px-3 rounded-md bg-black text-white">XL</li>
          <li className="lala py-1 px-3 rounded-md bg-black text-white">2XL</li>

        </div>
        </div>
      </div>

     <h1>{data.description}</h1>

     
    </div>
  );
};

export default ProductPage;
