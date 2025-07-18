// src/pages/MyAppointments.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyAppointments = () => {
  const { authAxios } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await authAxios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      await authAxios.delete(`http://localhost:5000/api/appointments/${id}`);
      fetchAppointments(); // refresh list
    } catch {
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Service:</strong> {appt.service}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appt.time}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      appt.status === "booked" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {appt.status}
                  </span>
                </p>
              </div>
              {appt.status === "booked" && (
                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
