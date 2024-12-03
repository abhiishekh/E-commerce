// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        <Footer /> 
    </BrowserRouter>
  );
};

export default App;
