// import React from 'react'
// import { RiDeleteBin6Line } from "react-icons/ri";
import rcbjersey from '../assets/images/rcbjersey.png'

const CartProduct = () => {
  return (
    <div className=" bg-white m-2 rounded-lg p-2 flex justify-between items-center">
        <div className="flex gap-4">

        <div className="w-32 bg-gray-200 rounded-sm">
            <img src={rcbjersey} alt="" />
        </div>
        <div className=" flex flex-col ">
            <h1 className="font-semibold capitalize">title</h1>
            <h2 className="text-green-500 capitalize">In stock</h2>
            <h1 className="font-semibold">price</h1>
            <div className="flex items-center gap-4 bg-gray-300 rounded-md text-black  font-medium overflow-hidden mt-5 py-1">
                <p className="  w-7 h-full flex items-center justify-center  hover:cursor-pointer">-</p>
                <p className='text-Rcb-red'>2</p>
                <p className="  w-7 h-full flex items-center justify-center  hover:cursor-pointer">+</p>
            </div>
        </div>
        </div>
        <div className="">
            <button className="flex items-center gap-4 font-medium bg-Rcb-red/80 hover:bg-Rcb-red transform translate-all duration-300 py-1 px-2 text-white rounded-md justify-center">Remove</button>
        </div>

    </div>
  )
}

export default CartProduct