import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-green-800">
          Login to ElectroHub
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-5 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="you@example.com"
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-700">
          New here?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
