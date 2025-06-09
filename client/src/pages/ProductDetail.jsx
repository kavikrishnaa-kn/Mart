import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product details.");
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const userData = localStorage.getItem("profile");
    if (!userData) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    setAddingToCart(true);

    // Get existing cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already in cart
    const index = cart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      // Increase quantity if exists
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddingToCart(false);
    alert("Product added to cart!");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-blue-700">Loading product...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-10 bg-white rounded-lg shadow-lg p-8">
        <img
          src={product.imageUrl || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-contain rounded-md bg-gray-100"
          loading="lazy"
        />

        <div className="flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-4xl font-extrabold mb-4 text-navy">{product.name}</h1>
            <p className="text-green-600 text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <h3 className="text-xl font-semibold mb-3 text-blue-800">Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <ul className="mb-6 max-h-48 overflow-y-auto">
                {product.reviews.map((rev, idx) => (
                  <li
                    key={idx}
                    className="border-b border-gray-200 py-2 last:border-none"
                  >
                    <p className="font-semibold">{rev.user}</p>
                    <p className="text-yellow-500">⭐ {rev.rating} / 5</p>
                    <p className="text-gray-600">{rev.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mb-6">No reviews yet.</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition"
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
