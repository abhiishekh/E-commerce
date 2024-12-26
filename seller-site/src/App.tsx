import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import UserPage from "./pages/UserPage";
import ProductPage from "./pages/ProductPage";
import SellerPage from "./pages/SellerPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <div className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/sellers" element={<SellerPage />} />


            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
