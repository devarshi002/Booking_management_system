import React, { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  // Simulated API or localStorage fetch
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const handleCancel = (id) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Admin Dashboard
      </h1>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
