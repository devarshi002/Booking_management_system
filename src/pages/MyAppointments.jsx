import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyAppointments = () => {
  const { authAxios } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await authAxios.get("http://localhost:5000/api/appointments");
        setAppointments(res.data);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [authAxios]);

  if (loading) {
    return <p className="text-center mt-10">Loading appointments...</p>;
  }

  if (appointments.length === 0) {
    return <p className="text-center mt-10">You have no appointments.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        My Appointments
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {appointments.map((appt) => (
          <div key={appt.id} className="bg-white rounded shadow p-5 border">
            <h2 className="text-xl font-semibold text-green-700">{appt.service}</h2>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <p>
              <strong>Status: </strong>
              <span
                className={
                  appt.status === "accepted"
                    ? "text-green-600 font-semibold"
                    : appt.status === "rejected"
                    ? "text-red-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
