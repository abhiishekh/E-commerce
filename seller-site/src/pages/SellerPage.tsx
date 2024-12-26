import React from 'react'
import UserDetails from '../components/Details'

const SellerPage = () => {
  return (
    <div className='mx-2 md:mx-12 my-12'>
       <div className=' flex justify-center gap-2 md:gap-12 mt-16 mx-2 sm:m-4 xl:m-12'>
        <div className=' bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col justify-center items-center'>
          <h1 className='font-bold text-3xl'>23 +</h1>
        <h1 className='font-semibold text-2xl'>Users</h1>
        </div>
        <div className='bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>23 +</h1>
        <h1 className='font-semibold text-2xl'>Sellers</h1>

        </div>
        <div className='bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>23 +</h1>
        <h1 className='font-semibold text-2xl'>Products</h1>

        </div>
      </div>
      <div className='mt-5'>

        <h1 className='font-bold text-3xl mb-8 '>All Sellers</h1>
        <div className='flex flex-col gap-10'>

        <UserDetails/>
        <UserDetails/>
        <UserDetails/>
        <UserDetails/>
          
        </div>
      </div>
        </div>
  )
}

export default SellerPage