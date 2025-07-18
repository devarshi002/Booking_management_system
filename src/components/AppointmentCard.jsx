import React from "react";

const AppointmentCard = ({ appointment, onCancel }) => {
  const { name, email, date, time, service, id } = appointment;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-green-700">{service}</h2>
      <p className="text-gray-600">
        <span className="font-medium">Name:</span> {name}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Email:</span> {email}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Date:</span> {date}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-medium">Time:</span> {time}
      </p>
      {onCancel && (
        <button
          onClick={() => onCancel(id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
