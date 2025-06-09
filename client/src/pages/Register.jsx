import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await API.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      // Auto-login after register
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to register. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-pink-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full mb-5 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Your username"
        />

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
          className="w-full mb-5 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="w-full mb-5 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your password"
        />

        <label className="block mb-2 font-semibold text-gray-700" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Confirm your password"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-md font-bold hover:bg-purple-700 transition"
        >
          Register
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
