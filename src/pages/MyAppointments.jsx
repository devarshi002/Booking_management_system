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

  const renderStatus = (status) => {
    const baseStyle = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "accepted":
        return <span className={`${baseStyle} bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400`}>Accepted</span>;
      case "rejected":
        return <span className={`${baseStyle} bg-red-100 text-red-700 dark:bg-red-700/20 dark:text-red-400`}>Rejected</span>;
      default:
        return <span className={`${baseStyle} bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400`}>Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="text-lg animate-pulse">Loading appointments...</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        <p className="text-lg">You have no appointments.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-extrabold text-center text-green-700 dark:text-green-400 mb-8">
        My Appointments
      </h1>

      <div className="max-w-4xl mx-auto space-y-5">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-2">
              {appt.service}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Date:</strong> {appt.date}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Time:</strong> {appt.time}
            </p>
            <div className="mt-2">
              <strong>Status: </strong>
              {renderStatus(appt.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
