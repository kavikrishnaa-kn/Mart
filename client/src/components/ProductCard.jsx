import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white/10 p-4 rounded-2xl shadow hover:shadow-xl border border-white/20 backdrop-blur">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-3">{product.name}</h2>
      <p className="text-neonGreen font-bold">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full py-2 bg-neonGreen text-navy rounded-lg hover:bg-green-400 transition-all font-bold shadow-md"
      >
        Add to Cart
      </button>
    </div>
  );
}
