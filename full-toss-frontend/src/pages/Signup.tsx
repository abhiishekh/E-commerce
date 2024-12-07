import React from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
import { useAuth } from '../hooks/useAuth';

const teams = [
  'Royal Challengers Bangalore',
  'Chennai Super Kings',
  'Mumbai Indians',
  'Lucknow Super Giants',
  'Gujarat Titans',
  'Punjab Kings',
  'Rajasthan Royals',
  'Delhi Capitals',
  'Kolkata Knight Riders',
  'Sunrisers Hyderabad'
];

const Signup = () => {
  const navigate = useNavigate();
  const { 
    usernameError,
    emailError,
    phoneError,
    formData, 
    handleChange, 
    Signup, 
    loading, 
    error, 
    responsedata
   } = useAuth();
  React.useEffect(()=>{
    if(responsedata && responsedata.token){
      localStorage.setItem('token',responsedata.token)
      navigate('/')
    }
  },[responsedata,navigate])
  
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    Signup()
  }
  return (
    <div className="min-h-screen bg-Rcb-red/10 backdrop:blur-lg flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg mx-2 md:mx-0">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              required
            />
            {usernameError && <p className="text-sm text-red-500 mt-2">{usernameError}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              required
            />
            {emailError && <p className="text-sm text-red-500 mt-2">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              maxLength={10}
              required
            />
            {phoneError && <p className="text-sm text-red-500 mt-2">{phoneError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              required
            />
          </div>

          <div>
            <label htmlFor="iplTeam" className="block text-sm font-medium text-gray-700">Select IPL Team</label>
            <select
              id="iplTeam"
              name="iplTeam"
              value={formData.iplTeam}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              required
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-Rcb-red text-white rounded-md hover:bg-Rcb-darkred focus:outline-none"
              disabled={phoneError !== '' || usernameError !== '' || emailError !== '' || !formData.phone || !formData.iplTeam || !formData.username || !formData.email}
            >
              {loading ? 'loading...' : 'Signup'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
