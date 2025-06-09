import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update cart in state and localStorage
  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        return {
          ...item,
          quantity: newQty > 0 ? newQty : 1,
        };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Redirecting to payment page...");
    navigate("/payment");
  };

  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-100 to-red-100 px-6">
        <h2 className="text-3xl font-bold mb-4 text-red-700">
          Your cart is empty
        </h2>
        <Link
          to="/store"
          className="text-red-600 font-semibold hover:underline"
        >
          Go to Store
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-tr from-yellow-50 to-red-50 rounded-lg shadow-lg min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-red-700 text-center">
        Your Shopping Cart
      </h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-lg shadow p-4"
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/150?text=No+Image"}
              alt={item.name}
              className="w-32 h-32 object-contain rounded-md mr-6 mb-4 sm:mb-0"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
              <p className="text-green-700 font-bold text-lg">${item.price.toFixed(2)}</p>
              <p className="text-gray-600 mt-2 line-clamp-3">{item.description}</p>

              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="ml-auto bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
                  title="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <p className="text-2xl font-bold text-gray-900 mb-4">
          Total: ${getTotalPrice().toFixed(2)}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-red-700 text-white py-3 px-8 rounded-md font-extrabold hover:bg-red-800 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
