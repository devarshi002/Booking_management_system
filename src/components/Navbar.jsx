import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-green-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-wide hover:text-green-200">
              AppointmentApp
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-200 transition">Home</Link>
            {user && (
              <>
                <Link to="/book" className="hover:text-green-200 transition">Book</Link>
                <Link to="/my-appointments" className="hover:text-green-200 transition">My Appointments</Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="hover:text-green-200 transition">Admin</Link>
                )}
              </>
            )}
            {!user ? (
              <>
                <Link to="/login" className="hover:text-green-200 transition">Login</Link>
                <Link to="/signup" className="hover:text-green-200 transition">Signup</Link>
              </>
            ) : (
              <>
                <span className="text-sm">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-green-700">
          <Link to="/" className="block hover:text-green-200" onClick={toggleMenu}>Home</Link>
          {user && (
            <>
              <Link to="/book" className="block hover:text-green-200" onClick={toggleMenu}>Book</Link>
              <Link to="/my-appointments" className="block hover:text-green-200" onClick={toggleMenu}>My Appointments</Link>
              {user.role === "admin" && (
                <Link to="/admin" className="block hover:text-green-200" onClick={toggleMenu}>Admin</Link>
              )}
            </>
          )}
          {!user ? (
            <>
              <Link to="/login" className="block hover:text-green-200" onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="block hover:text-green-200" onClick={toggleMenu}>Signup</Link>
            </>
          ) : (
            <>
              <span className="block text-sm">Hi, {user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
