import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Payment from "./pages/Payment";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-50 via-white to-gray-100">
      <Navbar />
      <main className="flex-grow  container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
