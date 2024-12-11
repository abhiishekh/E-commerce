import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import useFetch from "../hooks/useFetch";
import { RxCross2 } from "react-icons/rx";
import Image from '../assets/images/image.png';


interface ItemType {
  _id: string | null | undefined;
  title: string;
  price: number;
  mrp: number;
  imageURL: string;
  stocks: number;
}

const CartPage = () => {
  const navigate = useNavigate();
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemMrp, setItemMrp] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number | string>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(70);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { data, loading, fetchdata } = useFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/cartitems` });

  useEffect(() => {
    const storedQuantities = localStorage.getItem('quantities');
    if (storedQuantities) {
      setQuantities(JSON.parse(storedQuantities));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      let totalItemPrice = 0;
      let totalItemMrp = 0;
      let totalDiscount = 0;

      data.forEach((item: ItemType) => {
        const quantity = quantities[item._id || ''] || 1;
        totalItemPrice += item.price * quantity;
        totalItemMrp += item.mrp * quantity;
        totalDiscount += (item.mrp * quantity) - (item.price * quantity);
      });

      const percentage = ((totalItemMrp - totalItemPrice) / totalItemMrp * 100).toFixed(2);

      if (data.length > 0) {
        setDiscountPercentage(percentage);
        setItemMrp(totalItemMrp);
        setDiscount(totalDiscount);
      } else {
        setDiscount(0);
        setDiscountPercentage(0);
      }

      let calculatedDeliveryCharge = itemPrice >= 1000 ? 0 : deliveryCharge;
      setDeliveryCharge(calculatedDeliveryCharge);
      const finalItemPrice = totalItemPrice + calculatedDeliveryCharge;
      setItemPrice(finalItemPrice);
    }
  }, [data, quantities, itemPrice, deliveryCharge]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities, [itemId]: newQuantity };
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
  };

  const handleRemove = (itemId: string) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId]; 
      localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });

    fetchdata();

  };
  // if(loading) return <div className=' w-full min-h-screen flex items-center justify-center'>loading....</div>
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-spinner h-spinner border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin-fast"></div>
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    data && data.length > 0 ?(
      <div className="flex justify-center">
        <div className="w-full min-h-screen md:w-5/6 2xl:w-3/5">
          <div className="m-2 flex gap-4 items-center pt-5">
            <h1 className="font-semibold capitalize text-xl lg:text-3xl">Subtotal</h1>
            <h1 className="font-bold text-xl">₹{itemPrice}.00</h1>
          </div>
          <div className="flex items-center justify-center sticky top-16 z-20">
            <button
              className="bg-[var(--primary-color)] backdrop-blur-md hover:bg-[var(--primary-color)] transform translate-all duration-300 px-20 py-2 rounded-full text-white font-semibold text-xl"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>
          </div>
          <div className="h-auto w-full mt-5">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">Loading...</div>
            ) : data && data.length > 0 ? (
              data.map((item: ItemType) => (
                <CartProduct
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  price={item.price}
                  mrp={item.mrp}
                  imageURL={item.imageURL}
                  stocks={item.stocks}
                  quantity={quantities[item._id || ''] || 1}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <div className="w-full h-full flex items-center justify-center">No Products in Cart</div>
            )}
          </div>
          {/* Bill Section */}
          <div className="w-full flex justify-center">
            <div className="w-full bg-white m-2 h-auto rounded-xl p-3 lg:p-5 flex flex-col gap-3">
              <div>
                {data && data.length > 0 ? (
                  data.map((item: ItemType) => (
                    <div key={item._id} className="flex items-center justify-between capitalize">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold">{item.title}</p>
                        <p><RxCross2 /></p>
                        <p>{quantities[item._id || ''] || 1}</p>
                      </div>
                      <p className="font-semibold">₹{(item.mrp * (quantities[item._id || ''] || 1))}</p>
                    </div>
                  ))
                ) : (
                  <div>No items</div>
                )}
              </div>
              <div className="flex justify-end">
                <p className="font-bold mb-5 text-lg">₹{itemMrp}.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Delivery Charge</p>
                {deliveryCharge > 0 ? <p>₹70</p> : <p>-₹70</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <p>Discount</p>
                  <p className="text-red-500">-{discountPercentage}%</p>
                </div>
                <p className="font-semibold">-₹{discount}</p>
              </div>
              <div className="flex justify-end">
                <p className="font-bold mb-5 text-lg">₹{itemPrice}.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className=' w-full md:w-1/2 min-h-screen mx-auto'>
        <div className='flex justify-center'>
          <h1 className='mt-12'>No items in cart</h1>
        </div>
        <div>
          <img src={Image} alt="" className=' mx-auto'/>
        </div>
      </div>
    )
  );
};

export default CartPage;
