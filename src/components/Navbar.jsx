// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-lg hover:text-green-300">
          AppointmentApp
        </Link>
      </div>

      <div className="space-x-4">
        <Link to="/" className="hover:text-green-300">
          Home
        </Link>

        {user && (
          <>
            <Link to="/book" className="hover:text-green-300">
              Book Appointment
            </Link>
            <Link to="/my-appointments" className="hover:text-green-300">
              My Appointments
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-green-300">
                Admin Dashboard
              </Link>
            )}
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="hover:text-green-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-green-300">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-3">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
