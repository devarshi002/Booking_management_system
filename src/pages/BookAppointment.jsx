import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const { authAxios } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await authAxios.post("http://localhost:5000/api/appointments", formData);
      setSuccess("Appointment booked successfully!");
      setFormData({ service: "", date: "", time: "" });
      setTimeout(() => navigate("/my-appointments"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to book appointment. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <h2 className="text-3xl font-extrabold mb-6 text-green-700 dark:text-green-400 text-center">
          Book Appointment
        </h2>

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4 text-center font-semibold">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 dark:text-green-400 mb-4 text-center font-semibold">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="service"
            placeholder="Service (e.g. Consultation)"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-xl
                       bg-gray-50 dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
                       transition"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-xl
                       bg-gray-50 dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
                       transition"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-xl
                       bg-gray-50 dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400
                       transition"
          />

          <button
            type="submit"
            className="bg-green-600 text-white w-full py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
