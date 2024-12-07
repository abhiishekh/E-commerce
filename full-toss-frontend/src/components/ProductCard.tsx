import { useState } from "react";
import axios from "axios";

interface List {
  title: string;
  price: string;
  mrp: string;
  imageURL: string;
  _id: string | null | undefined;
}

const ProductCard: React.FC<List> = ({ _id, title, price, mrp, imageURL }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const discount = Math.round((parseInt(mrp) - parseInt(price)) / parseInt(mrp) * 100);

  
  const handleCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("Token not available");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/v1/addtocart/${_id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("Product added to cart:", response.data);
    } catch (error: any) {
      console.error("Error adding product to cart:", error.message || error);
      // alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 sm:w-48 h-auto md:w-64 bg-white rounded-lg p-2">
      <div className="flex justify-center bg-[#F7F7F7] hover:scale-105 transform translate-all duration-300 ease-in-out ">
        <div className="w-44 md:w-48 h-64 flex justify-center rounded-lg">
          <img
            src={imageURL}
            alt={title}
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
        <button
          className="w-full rounded-md mt-2 py-1 px-2 bg-Rcb-red/80 text-white font-semibold hover:bg-Rcb-red transform transition-all duration-300 ease-in-out"
          onClick={handleCart}
         
        >
          {loading ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
