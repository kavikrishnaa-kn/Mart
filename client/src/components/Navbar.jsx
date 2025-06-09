import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Get user info from localStorage (if logged in)
  const profile = JSON.parse(localStorage.getItem("profile"));

  const handleLogout = () => {
    localStorage.removeItem("profile");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-navy to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight hover:text-yellow-300 transition">
          ElectroHub
        </Link>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-lg font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/store"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              Store
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-1"
                  : "hover:text-yellow-300 transition"
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="ml-6">
          {profile ? (
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-navy px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-navy px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
