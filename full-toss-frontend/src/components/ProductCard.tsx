import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface List {
  title: string;
  price: string;
  mrp: string;
  imageURL: string;
  _id: string | null | undefined;
}

const ProductCard: React.FC<List> = ({ _id, title, price, mrp, imageURL }) => {
  const { cartlength } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const discount = Math.round((parseInt(mrp) - parseInt(price)) / parseInt(mrp) * 100);

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
    navigate('/productdetails', { state: { id: _id } }); // Pass the actual _id here
  };

  return (
    <div onClick={handleClick} className="w-80 sm:w-64 h-auto md:w-80 rounded-lg p-2">
      <div className="w-full bg-white rounded-sm hover:scale-105 transform translate-all duration-300 ease-in-out">
        <div className="flex justify-center">
          <div className="w-44 md:w-48 h-64 flex justify-center rounded-lg">
            <img
              src={imageURL}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="my-2 flex justify-between">
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
        <button
          className="w-full rounded-md py-2 px-2 bg-[#4D03DF]/80 text-white font-semibold hover:bg-[#4D03DF] transform transition-all duration-300 ease-in-out"
          onClick={handleCart}
        >
          {loading ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
