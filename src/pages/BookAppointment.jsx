// src/pages/BookAppointment.jsx
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
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Book Appointment</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="service"
          placeholder="Service (e.g. Consultation)"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
