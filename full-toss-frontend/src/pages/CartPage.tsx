// import React from 'react'

import { useNavigate } from "react-router-dom"
import CartProduct from "../components/CartProduct"
import useFetch from "../hooks/useFetch"


interface itemType {
  _id: string | null | undefined;
  title:string;
  price:number;
  mrp:number;
  imageURL:string;
  stocks:number

}
const CartPage = () => {
  const navigation = useNavigate()
  const userId = localStorage.getItem('id')
  const {data, loading, Error} = useFetch({url:`http://localhost:3000/api/v1/user/${userId}`})
  const temp = data.items
  console.log(temp)

  if(loading)return <div className="w-full min-h-screen flex items-center justify-center">loading....</div>
  if(Error)return <div className="w-full min-h-screen flex items-center justify-center">Error: {Error}</div>
  return (
    <div className=" flex justify-center ">

    <div className="w-full min-h-screen  md:w-5/6 2xl:w-3/5">
    <div className=" m-2 flex gap-4">
      <h1 className=" font-semibold capitalize">subtotal</h1>
      <h1 className="font-bold">Total Cart Value</h1>
    </div>
    <div className="flex items-center justify-center sticky top-16 z-20">
        <button  className="bg-Rcb-red/80 backdrop-blur-md hover:bg-Rcb-red transform translate-all duration-300 px-20 py-2 rounded-full text-white font-semibold text-xl "
        onClick={()=>navigation('/checkout')}>Checkout</button>
      </div>
      <div className="h-auto w-full mt-5">
     {temp && temp.length > 0 ?(
      temp.map((items:itemType)=>(
        <CartProduct
        key={items._id}
        _id={items._id}
        title={items.title}
        price={items.price}
        mrp={items.mrp}
        imageURL={items.imageURL}
        stocks={items.stocks}
        />
      ))
     ):(
      <div>{loading?'loading':'No Product in Cart'}</div>
     )} 
      </div>

      {/* // bill  */}
      <div className=" w-full flex justify-center">
    <div className="w-full bg-white m-2 h-auto rounded-xl p-2 flex flex-col gap-3">
      <div className="flex items-center justify-between capitalize">
        <div className="flex gap-5">
          <p className="font-semibold">title</p>
          <p>quantity</p>
        </div>
        <p className="font-semibold">total</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Delivery Charger</p>
        <p>₹70</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">

        <p>Discount</p>
        <p className="text-red-500">-30%</p>
        </div>
        <p className="font-semibold">Total Discount</p>
      </div>
      <div className="flex justify-end">
        <p className="font-bold mb-5 text-lg">Subtotal</p>
      </div>
    </div>
      </div>

    </div>
    </div>
  )
}

export default CartPage