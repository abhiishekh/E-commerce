import React, { useState } from 'react';

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
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    theme: ''
  });

  const [phoneError, setPhoneError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Check phone number validity for exact 10 digits
    if (name === 'phone') {
      if (value.length !== 10) {
        setPhoneError('Phone number must be exactly 10 digits.');
      } else {
        setPhoneError('');
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-Rcb-red to-[#f8f8f8] flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
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
          </div>

          {/* Name */}
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

          {/* Email */}
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
          </div>

          {/* Phone Number */}
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
            {/* Error message for phone validation */}
            {phoneError && <p className="text-sm text-red-500 mt-2">{phoneError}</p>}
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Rcb-red"
              required
            />
          </div>

          {/* IPL Team Theme */}
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Select IPL Team Theme</label>
            <select
              id="theme"
              name="theme"
              value={formData.theme}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-Rcb-red text-white rounded-md hover:bg-Rcb-darkred focus:outline-none"
              disabled={phoneError !== '' || !formData.phone || !formData.theme}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
