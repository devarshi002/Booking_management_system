import { useState } from "react";

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="date" name="date" required onChange={handleChange} />
      <input type="time" name="time" required onChange={handleChange} />
      <input type="text" name="service" placeholder="Service" required onChange={handleChange} />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
