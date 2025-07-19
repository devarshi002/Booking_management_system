import React, { useState } from "react";

const AppointmentCard = ({ appointment, onCancel, onAccept, onReject }) => {
  const { name, email, date, time, service, id, status } = appointment;
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    await onAccept(id);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    await onReject(id);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-green-700">{service}</h2>
      <p className="text-gray-600"><span className="font-medium">Name:</span> {name}</p>
      <p className="text-gray-600"><span className="font-medium">Email:</span> {email}</p>
      <p className="text-gray-600"><span className="font-medium">Date:</span> {date}</p>
      <p className="text-gray-600 mb-4"><span className="font-medium">Time:</span> {time}</p>

      <p className="mb-4">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={
            status === "accepted"
              ? "text-green-600 font-semibold"
              : status === "rejected"
              ? "text-red-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </p>

      {onCancel && (
        <button
          onClick={() => onCancel(id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mr-2"
          disabled={loading}
        >
          Cancel
        </button>
      )}

      {/* Show Accept/Reject buttons only if those handlers are passed */}
      {onAccept && onReject && status === "pending" && (
        <>
          <button
            onClick={handleAccept}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mr-2"
            disabled={loading}
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            disabled={loading}
          >
            Reject
          </button>
        </>
      )}
    </div>
  );
};

export default AppointmentCard;
