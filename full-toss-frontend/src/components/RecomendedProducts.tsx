import { useState } from 'react';
import speaker from '../assets/images/speaker-prod-1.webp'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecomendedProducts = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
    // const handleCart = async () => {
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     alert("Login to add to cart");
    //     navigate('/login');
    //     return;
    //   }
  
    //   try {
    //     setLoading(true);
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_BACKEND_URL}/addtocart/${_id}`,
    //       {},
    //       {
    //         headers: {
    //           token: token,
    //         },
    //       }
    //     );
    //     console.log("Product added to cart:", response.data);
    //     await cartlength();
    //   } catch (error: any) {
    //     console.error("Error adding product to cart:", error.message || error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
  
  return (
    <div className='w-40 sm:w-60 flex flex-col gap-2'>
        <div className='h-full w-full bg-white rounded-md hover:scale-105 duration-300 transform transition-all'>
                <img src={speaker} alt="speaker" className='h-full w-full object-contain' />
        </div>
        <div className='flex justify-between items-center'>
            <h1>title</h1>
            <div className='flex gap-2 items-center'>
                <div className='flex gap-1 items-center'>
                    <p>price</p>
                    <p>mrp</p>
                </div>
                <p>discount</p>
            </div>
        </div>
        <button className='p-2 text-white bg-purple-700/80 hover:bg-purple-700 rounded-md'>
        {loading? ('Adding...'):('Add to cart')}</button>
    </div>

  )
}

export default RecomendedProducts