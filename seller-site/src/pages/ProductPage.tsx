import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Details from '../components/Details';

interface itemType {
  _id: string | null | undefined;
  title: string;
  price: number;
  mrp: number;
  imageUrl: string | null;
}

const ProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<number | string>('');
  const [product, setProduct] = useState<number | string>('');
  const [allProduct, setAllProduct] = useState<itemType[]>([]);

  const handleNavigation = () => {
    navigate('/addProduct');
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
      if (!res) {
        console.log('No data found');
        return;
      }
      setUser(res.data.response.length);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/v1/product');
      console.log(response.data.response)
      if (response.data.response) {
        const userData = response.data.response;
        setProduct(response.data.response.length)
        
        if (Array.isArray(userData)) {
          setAllProduct(userData);
        } else {
          setAllProduct([userData]);
        }
      } else {
        console.log("No response");
      }
      setLoading(false);
    }  catch (error) {
      console.log('Error fetching product data:', error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProductData();
  }, []);

  return (
    <>
    {
      loading ? (
        <div> <h1>loading...</h1></div>
      ): (
        <div className="my-12 mx-2 md:mx-12">
      <div className="flex justify-center gap-2 md:gap-12 mt-16 mx-2 sm:m-4 xl:m-12">
        <div className="bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">{user}+</h1>
          <h1 className="font-semibold text-2xl">Users</h1>
        </div>
        <div className="bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col items-center">
          <h1 className="font-bold text-3xl">23 +</h1>
          <h1 className="font-semibold text-2xl">Sellers</h1>
        </div>
        <div className="bg-[#D9D9D9] rounded-md py-2 px-3 w-36 md:w-64 flex flex-col items-center">
          <h1 className="font-bold text-3xl">{product}+</h1>
          <h1 className="font-semibold text-2xl">Products</h1>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <h1 className="font-bold text-3xl mb-8">All Products</h1>
        <button
          className="h-12 font-medium px-2 bg-blue-600/80 rounded-lg text-white hover:bg-blue-600 transform translate-all duration-300"
          onClick={handleNavigation}
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-col gap-10">
        {allProduct.length > 0 ? (
          allProduct.map((item: itemType) => (
            <Details
              key={item._id}
              _id={item._id}
              title={item.title}
              price={item.price}
              mrp={item.mrp}
              imageUrl={item.imageUrl}
            />
          ))
        ) : (
          <p>No products available</p> 
        )}
      </div>
    </div>
      )
    }
    </>
    
  );
};

export default ProductPage;
