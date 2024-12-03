// import React from 'react'
import rcbjersey from '../assets/images/rcbjersey.png'


const HeroCard = () => {
  return (
    <div className='w-44 h-full md:w-64 bg-white rounded-lg p-2'>
      <h1 className='font-medium text-md capitalize'>Jersey</h1>
      <div className='flex justify-center'>

      <div className='w-48 flex justify-center '>
        <img src={rcbjersey} alt="" className='w-full h-full object-contain' />
      </div>
      </div>
      <h3 className='font-medium text-sm capitalize'>show more</h3>
  </div>
  )
}

export default HeroCard