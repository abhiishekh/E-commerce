import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
const Login = () => {
  const navigate = useNavigate()
  const {
    handleChange,
    Signin,
    responsedata,
    error,
    loading,
    formData
  } = useAuth()

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    Signin()

  }

  React.useEffect(()=>{
    if(responsedata && responsedata.token){
      navigate('/')
    }
  },[responsedata,navigate])

  return (
    <div className="min-h-screen bg-[var(--primary-color)]/10 backdrop-blur-lg flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg mx-2 md:mx-0">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[var(--primary-color)] text-white rounded-md hover:bg-Rcb-darkred focus:outline-none"
            >
              {loading ? 'loading...':'Login'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          {/* <a href="#" className="text-sm text-Rcb-red hover:text-Rcb-darkred">Forgot Password?</a> */}
          <p>Don't have an Account <Link to='/signup' className=' text-Rcb-red'>Signup Now</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
