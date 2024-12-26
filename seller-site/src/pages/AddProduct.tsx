import axios from "axios";
import React, { useState } from "react";

interface ProductType {
  title: string;
  imageUrl: string | null;
  price: number | string;
  mrp: number | string;
  stocks: number | string;
  description: string;
}

const AddProduct = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formdata, setFormData] = useState<ProductType>({
    title: "",
    imageUrl: null,
    price: '',
    mrp: '',
    stocks: '',
    description: "",
  });

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files && inputElement.files[0]) {
        const base64Image = await convertToBase64(inputElement.files[0]);
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: base64Image,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/product`, formdata)
      if (!response) {
        console.log("could not send the request")
        return
      }
      // console.log(response)
      setFormData({
        title: "",
        imageUrl: null,
        price: '',
        mrp: '',
        stocks: '',
        description: "",
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    // console.log(formdata)
  };

  return (
    <div className="p-2">
      <div className="w-full sm:w-[500px] h-auto bg-[#D9D9D9] rounded-md my-16 mx-auto">
        <h1 className="w-full font-bold text-3xl p-5 flex justify-center items-center">Add a product</h1>
        <div>
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="flex flex-col gap-1 p-2">
              <label htmlFor="title" className="font-medium text-xl">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="title"
                className="w-full p-2 text-lg font-medium rounded-md"
                value={formdata.title}
                onChange={handleChange}
              />
            </div>

            {/* Image Input */}
            <div className="flex flex-col gap-1 p-2">
              <label htmlFor="imageUrl" className="font-medium text-xl">Image</label>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                required
                className="p-2 text-lg font-medium rounded-md"
                onChange={handleChange}
              />
            </div>

            {/* Price and MRP Inputs */}
            <div className="flex flex-wrap justify-between">
              <div className="w-1/2 flex flex-col gap-1 p-2">
                <label htmlFor="price" className="font-medium text-xl">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  placeholder="price"
                  className="w-full text-lg font-medium p-2 rounded-md"
                  value={formdata.price}
                  onChange={handleChange}
                />
              </div>

              <div className="w-1/2 flex flex-col gap-1 p-2">
                <label htmlFor="mrp" className="font-medium text-xl">MRP</label>
                <input
                  type="number"
                  id="mrp"
                  name="mrp"
                  required
                  placeholder="mrp"
                  className="w-full text-lg font-medium p-2 rounded-md"
                  value={formdata.mrp}
                  onChange={handleChange}
                />
              </div>

              <div className="w-1/2 flex flex-col gap-1 p-2">
                <label htmlFor="stocks" className="font-medium text-xl">Stock</label>
                <input
                  type="number"
                  id="stocks"
                  name="stocks"
                  required
                  placeholder="stocks"
                  className="w-full text-lg font-medium p-2 rounded-md"
                  value={formdata.stocks}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1 p-2">
              <label htmlFor="description" className="font-medium text-xl">Description</label>
              <textarea
                id="description"
                name="description"
                required
                placeholder="product description"
                className="p-2 text-lg font-medium rounded-md"
                value={formdata.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <button type="submit" className="p-2 my-4 w-1/2 text-white font-medium text-xl bg-blue-600 rounded-lg">
                {loading? 'Adding..':'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
