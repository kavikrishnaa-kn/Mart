import { Link } from "react-router-dom";

export default function Payment() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-700 via-purple-500 to-purple-300 flex flex-col items-center justify-center text-white p-10">
      <h1 className="text-5xl font-extrabold mb-6">Payment Page</h1>
      <p className="mb-6 text-lg max-w-xl text-center">
        Payment integration is not implemented yet. This is a placeholder page.
      </p>
      <Link
        to="/store"
        className="bg-white text-purple-700 px-6 py-3 rounded font-bold hover:bg-purple-100 transition"
      >
        Return to Store
      </Link>
    </div>
  );
}
