import React, { useEffect, useState, useContext } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
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
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [authAxios]);

  const handleCancel = async (id) => {
    try {
      await authAxios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      toast.success("Appointment cancelled successfully");
    } catch (err) {
      console.error("Cancel failed:", err);
      toast.error("Failed to cancel appointment");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await authAxios.put(`http://localhost:5000/api/appointments/${id}/status`, { status });

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === id ? { ...appt, status } : appt
        )
      );

      toast.success(`Appointment ${status} successfully`);
    } catch (err) {
      console.error(`Failed to update status to ${status}:`, err);
      toast.error(`Failed to ${status} appointment`);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading appointments...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-right" autoClose={2000} />
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
              onCancel={() => handleCancel(appt.id)}
              onAccept={() => updateStatus(appt.id, "accepted")}
              onReject={() => updateStatus(appt.id, "rejected")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
