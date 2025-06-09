import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api";

export default function Store() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


    console.log("Store component rendered", products);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();  // call the imported API function
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-blue-700">Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Electronic Components Store
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">
          No products found. Be the first to{" "}
          <Link
            to="/add-product"
            className="text-blue-600 font-semibold hover:underline"
          >
            add a product
          </Link>
          !
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition relative"
            >
              <img
                src={product.imageUrl || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={product.name}
                className="w-full h-48 object-contain bg-gray-100"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 text-gray-900">{product.name}</h3>
                <p className="text-green-600 font-semibold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 text-sm truncate">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
