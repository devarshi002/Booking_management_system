import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white">
      <div className="text-center p-6 max-w-xl bg-white rounded-2xl shadow-xl border">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Welcome to QuickBook!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Schedule your appointments quickly and easily. Choose your time, enter your details, and you're done!
        </p>
        <Link to="/book">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300">
            Book an Appointment
          </button>
        </Link>
        <div className="mt-4">
          <Link to="/my-appointments" className="text-sm text-green-500 hover:underline">
            View My Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
