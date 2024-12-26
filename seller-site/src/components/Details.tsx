import React from 'react'

interface List {
  title: string;
  price: number;
  mrp: number;
  imageUrl: string | null;
  _id: string | null | undefined;
}
const Details: React.FC<List> = ({ title, price, mrp, imageUrl}) => {
  const fallbackImage = 'https://via.placeholder.com/150'; 
  
  return (
    <div className='w-full h-auto bg-[#D9D9D9] rounded-lg flex justify-between items-center px-2 md:px-8 py-2'>
          {/* //image  */}
          <div className='w-32 h-32 bg-white rounded-lg overflow-hidden mr-5 sm:mr-0'>
            <img  src={imageUrl ? imageUrl : fallbackImage}
             alt="title" 
             className='w-full h-full object-contain'
             />
          </div> 
          {/* //details  */}
          <div className='flex flex-col justify-start'>
            <h1 className='font-bold text-lg'>{title}</h1>
            <h1 className='font-medium text-sm'>Price: {price}</h1>
            <h1 className='font-medium text-sm'>Mrp: {mrp}</h1>
          </div>
          {/* //remove button  */}
          <button className='p-2 bg-white rounded-lg'> Remove</button>
        </div>
  )
}

export default Details