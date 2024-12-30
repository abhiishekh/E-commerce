# Shopping-CHI-7 Website

![Shopping-CHI-7 Logo](https://github.com/user-attachments/assets/08aa03aa-2271-4f41-9389-eab811af1119)

A fully functional e-commerce website built with **React**, **TypeScript**, **Node.js**, **Express**, **MongoDB**, and **State Management**. The website includes an **Admin Panel** for managing products, orders, and user data.

Check out the live demo of the website: [Live Demo](https://shopping-chi-seven.vercel.app/)

A fully functional e-commerce website built with ** React **, ** TypeScript **,** Node.js **,** Express **,** MongoDB **, and State Management. The website includes an Admin Panel for managing products, orders, and user data.


# Technologies Used
 ### React:
 For building the user interface
### TypeScript:
Adds static typing to JavaScript for improved code quality
### Node.js: 
JavaScript runtime for building the backend server
### Express: 
A minimal and flexible Node.js web application framework
### MongoDB: 
NoSQL database for storing product, order, and user data
### JWT Authentication: 
For securing API routes and authenticating users
### Redux or Context API: 
For state management on the frontend
### Axios: 
For making API requests to the backend

## Features
- **User-side functionality**:
  - Product browsing
  - Cart functionality
  - User authentication (login, registration)
  - Checkout process
 
**Admin Panel**:
  - Manage products (add, edit, delete)
  - Manage user accounts

**Tech stack**:
  - **Frontend**: React, TypeScript, React Router, Axios
  - **Backend**: Node.js, Express, JWT Authentication
  - **Database**: MongoDB
  - **State Management**: Redux or Context API (for managing user state, cart items, etc.)

# Setup Instructions

### 1. Clone the repository

Clone the project to your local machine using the following command:

```bash
git clone https://github.com/yourusername/shopping-chi-7.git
cd shopping-chi-7
```

# Install Dependencies
First, install dependencies for both the frontend and backend:

Frontend (React)
Navigate to the frontend directory:
```
cd full-toss-frontend
```
install the reqired Dependencies
```
npm install
```
### Backedn (nodejs + Express)
Navigate to the backend directory:
```
cd full-toss-backend
```
install the required dependencied
```
npm install
```
# 3. Set Up Environment Variables
Create a .env file in the root of both the frontend and backend directories to store environment variables.
## Frontend
In the frontend/.env file, add the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```
## Backend
In the backend/.env file, add your MongoDB URI and JWT Secret:
```
MONGO_URI=mongodb://localhost:27017/shopping-chi-7
JWT_SECRET=your-jwt-secret
PORT=5000
```
Make sure MongoDB is running locally or replace the MONGO_URI with your cloud MongoDB connection string.
# Start the Development server
```
npm run dev
```

