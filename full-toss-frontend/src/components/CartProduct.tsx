import { useState } from "react";
import axios from "axios";

interface List {
  title: string;
  price: number;
  mrp: number;
  imageURL: string;
  _id: string | null | undefined;
  stocks: number;
  quantity: number;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartProduct: React.FC<List> = ({ _id, title, price, mrp, imageURL, stocks, quantity, onQuantityChange, onRemove }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const updatedPrice = price * quantity;
  const updatedMrp = mrp * quantity;

  const handleRemove = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/removefromcart/${_id}`, {
        headers: {
          token: token,
        },
      });
      console.log(response);

      if (_id) {
        // Trigger the parent component's onRemove function
        onRemove(_id); 
      }

      alert("Item removed from cart");

      // Update the quantities in localStorage to reflect the removal
      const storedQuantities = localStorage.getItem('quantities');
      if (storedQuantities) {
        const updatedQuantities = JSON.parse(storedQuantities);
        delete updatedQuantities[_id || '']; // Remove the item from quantities
        localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      }

    } catch (error) {
      alert("Something went wrong while removing the item.");
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = () => {
    if (_id) {
      if (quantity < 5) {
        onQuantityChange(_id, quantity + 1);
      } else {
        alert("Cannot buy more than 5 of this item.");
      }
    }
  };

  const handleDecrease = () => {
    if (_id) {
      if (quantity > 1) {
        onQuantityChange(_id, quantity - 1);
      } else {
        handleRemove();  // Remove item when quantity is 0
      }
    }
  };

  return (
    <div className="bg-white m-2 rounded-lg p-3 lg:p-5 flex justify-between items-center">
      <div className="flex gap-4">
        <div className="w-32 h-32 bg-gray-200 rounded-sm">
          <img src={imageURL} alt={title} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold capitalize">{title}</h1>
          <h2 className="text-green-500 capitalize">{stocks ? "In stock" : "Unavailable"}</h2>
          <div className="flex gap-2 items-center">
            <h1 className="font-semibold">₹{updatedPrice}</h1>
            <h1 className="font-semibold line-through text-gray-400 text-sm">₹{updatedMrp}</h1>
          </div>
          <div className="flex items-center gap-4 bg-gray-300 rounded-md text-black font-medium overflow-hidden mt-5 py-1">
            <p className="w-7 h-full flex items-center justify-center hover:cursor-pointer" onClick={handleDecrease}>-</p>
            <p className="text-Rcb-red">{quantity}</p>
            <p className="w-7 h-full flex items-center justify-center hover:cursor-pointer" onClick={handleIncrease}>+</p>
          </div>
        </div>
      </div>
      <div>
        <button
          className="flex items-center gap-4 font-medium bg-Rcb-red/80 hover:bg-Rcb-red transform translate-all duration-300 py-1 px-2 text-white rounded-md justify-center"
          onClick={handleRemove}
          disabled={loading}
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
