import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    address: "",
    landmark: "",
    city: "",
    pincode: "",
  });
  const [isaddress, setIsAddress] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const userId = localStorage.getItem("id");
  const { data } = useFetch({ url: `${import.meta.env.VITE_BACKEND_URL}/user/${userId}` });

  const fetchdata = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/address/${userId}`,
        formdata
      );
      console.log("Backend response:", response);
    } catch (error) {
      console.log("Error occurred while adding address:", error);
    }
  };
  

  useEffect(() => {
    if (data && data.address && data.address.length > 0) {
      setIsAddress(true);
    } else {
      setIsAddress(false);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formdata.address || !formdata.landmark || !formdata.city || !formdata.pincode) {
      alert("Please fill in all the fields.");
      return;
    }
    fetchdata();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleAddressSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[var(--primary-color)]/10 backdrop-blur-md flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg mx-2 md:mx-0">
        <h2 className="text-2xl font-semibold text-center mb-6">CheckOut</h2>

        {/* If the user has address, show the select dropdown */}
        {isaddress ? (
          <div className="mb-4">
            <label htmlFor="addressSelect" className="block text-sm font-medium text-gray-700">
              Select Address
            </label>
            <select
              id="addressSelect"
              onChange={handleAddressSelect}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            >
              <option value="">Select an Address</option>
              {data.address.map((addr: any, index: number) => (
                <option key={index} value={JSON.stringify(addr)}>
                  {`${addr.address}, ${addr.city}, ${addr.pincode}`}
                </option>
              ))}
            </select>
          </div>
        ) : (
          // If no address exists, show the form to add a new address
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formdata.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                  LandMark
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formdata.landmark}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formdata.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                />
              </div>
              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                  Pin-Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pincode"
                  value={formdata.pincode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  required
                  maxLength={6}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white w-full px-5 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)] transform translate-all duration-300 rounded-full"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payment section */}
        <div className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="Upi">UPI I'D</label>
            <input
              type="text"
              placeholder="Upi Id"
              className="mt-1 mb-3 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-[var(--primary-color)] hover:bg-[var(--primary-color)] transform translate-all duration-300 w-full rounded-full text-white"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
