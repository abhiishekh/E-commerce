// import React from 'react'
import rcbjersey from "../assets/images/rcbjersey.png";
interface list{
  title: string;
  price: string;
  mrp: string;
  // imageUrl: string;
  // id: number;
}
const ProductCard:React.FC<list> = ({title, price, mrp }) => {
  const discount = Math.round((parseInt(mrp)- parseInt(price))/parseInt(mrp)*100 )
  return (
    <div className="w-full sm:w-48 h-auto md:w-64 bg-white rounded-lg p-2 shadow-lg shadow-red-100">
      <div className="flex justify-center bg-[#F7F7F7] hover:scale-105 transform translate-all duration-300 ease-in-out ">
        <div className="w-32 md:w-48 flex justify-center">
          <img
            src={rcbjersey}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="my-3 flex justify-between">
        <h1 className="font-medium text-sm capitalize">{title}</h1>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex gap-1">
            <h3 className="font-semibold text-sm">₹{price}</h3>
            <h3 className="text-gray-400 line-through text-sm">₹{mrp}</h3>
          </div>
          <h3 className="text-Rcb-red">-{discount}%</h3>
        </div>
      </div>
      <div className="w-full ">
        <button className="w-full rounded-md mt-2 py-1 px-2 bg-Rcb-red text-white font-semibold
        hover:bg-red-700 transform transition-all duration-300 ease-in-out">
          Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
