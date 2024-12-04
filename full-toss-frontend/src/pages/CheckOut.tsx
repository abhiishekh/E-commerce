import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const CheckOut = () => {
    const navigate = useNavigate()
  const [formdata, setFormData] = useState({
    address: "",
    landmark: "",
    city: "",
    pinCode: "",
  });
  const isaddress = false;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formdata);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formdata,
      [name]: value,
    }));
  };
  return (
    <div className="min-h-screen bg-Rcb-red/10 backdrop-blur-md flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg mx-2 md:mx-0">
        <h2 className="text-2xl font-semibold text-center mb-6">CheckOut</h2>
        {/* // add a address  */}
        <div className={isaddress ? "hidden" : "block"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="Address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formdata.address}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
                     focus:ring-Rcb-red"
                required
              />
            </div>
            <div>
              <label
                htmlFor="landmark"
                className="block text-sm font-medium text-gray-700"
              >
                LandMark
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formdata.landmark}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
                     focus:ring-Rcb-red"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formdata.city}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
                     focus:ring-Rcb-red"
                required
              />
            </div>
            <div>
              <label
                htmlFor="pinCode"
                className="block text-sm font-medium text-gray-700"
              >
                Pin-Code
              </label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formdata.pinCode}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2
         focus:ring-Rcb-red"
                required
                maxLength={6}
              />
            </div>

            <div className="flex justify-center">
              <button className="text-white w-full px-5 py-2 bg-Rcb-red/90 hover:bg-Rcb-red transform translate-all duration-300 rounded-full">
                Add Address
              </button>
            </div>
          </form>
        </div>

        {/* //accept the payment */}
        <div>
            <div className="flex flex-col">
                <label htmlFor="Upi">UPI I'D</label>
                <input type="text" placeholder="Upi Id"
              className="mt-1 mb-3 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
                required
                />
            </div>
            <div className="flex justify-center">
                <button onClick={()=>navigate('/')}
                className="py-2 px-4 bg-Rcb-red/90 hover:bg-Rcb-red transform translate-all duration-300 w-full rounded-full text-white">Place Order</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
