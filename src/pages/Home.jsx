import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react"; // Optional: install via `npm i lucide-react`

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="text-center p-8 max-w-xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border dark:border-gray-700">
        <div className="flex justify-center mb-4">
          <CalendarCheck className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-300 mb-3">
          Welcome to QuickBook!
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Schedule your appointments with ease. Pick your time, enter details, and you're done.
        </p>

        <Link to="/book">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Book an Appointment
          </button>
        </Link>

        <div className="mt-6">
          <Link
            to="/my-appointments"
            className="text-sm text-green-600 dark:text-green-400 hover:underline transition"
          >
            View My Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
