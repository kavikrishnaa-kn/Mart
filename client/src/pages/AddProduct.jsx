import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddProduct() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("profile"));

  // Redirect if not logged in
  if (!userData) {
    navigate("/login");
  }

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !product.name.trim() ||
      !product.price ||
      !product.description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (isNaN(product.price) || Number(product.price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Add authorization header if your backend requires token
      const token = userData.token;

      await API.post(
        "/products",
        {
          ...product,
          price: Number(product.price),
          reviews: [], // empty reviews on creation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added successfully!");
      navigate("/store");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add product. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-tr from-green-100 to-white rounded-lg shadow-lg min-h-screen">
      <h1 className="text-4xl font-extrabold mb-10 text-green-700 text-center">
        Add New Product
      </h1>

      {error && (
        <div className="mb-6 p-3 bg-red-200 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block font-semibold mb-1 text-green-800"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block font-semibold mb-1 text-green-800"
          >
            Price (USD) *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-semibold mb-1 text-green-800"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block font-semibold mb-1 text-green-800"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full border border-green-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded font-extrabold hover:bg-green-800 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
