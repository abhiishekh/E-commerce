import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface List {
  title: string;
  price: number;
  mrp: number;
  imageUrl: string | null;
  _id: string | null | undefined;
}

const ProductCard: React.FC<List> = ({ _id, title, price, mrp, imageUrl }) => {
  const { cartlength } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const discount = Math.round(((mrp - price) / mrp) * 100);

  // Handle adding to cart
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
        `${import.meta.env.VITE_BACKEND_URL}/addtocart/${_id}`,
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

  // Navigate to product details page
  const handleClick = () => {
    navigate('/productdetails', { state: { id: _id } });
  };
  const fallback = 'https://google.com'

  return (
    <div  className='w-40 sm:w-60 flex flex-col gap-2'>
    <div onClick={handleClick} className='h-40 sm:h-64 w-full bg-neutral-300 p-1 rounded-md hover:scale-105 duration-300 transform transition-all'>
            <img src={imageUrl ? imageUrl : fallback} alt="image" className='h-full w-full object-contain' />
    </div>
    <div className='flex justify-between items-center'>
        <h1 className="overflow-hidden w-24 whitespace-nowrap text-ellipsis capitalize">  {title}</h1>
        <div className='flex gap-1 items-center flex-wrap '>
            <div className='flex gap-1 items-center'>
                <p className=" text-sm  font-medium">₹{price}</p>
                <p className=" text-sm font-medium text-gray-700 line-through">₹{mrp}</p>
            </div>
            <p className="text-red-500 text-sm">-{discount}%</p>
        </div>
    </div>
    <button onClick={handleCart} className='p-2 text-white bg-purple-700/80 hover:bg-purple-700 rounded-md'>
    {loading? ('Adding...'):('Add to cart')}</button>
</div>
  );
};

export default ProductCard;
