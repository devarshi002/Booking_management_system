const pool = require("../config");

const getAppointments = async (req, res) => {
  try {
    const user = req.user;

    let query = "SELECT a.*, u.name, u.email FROM appointments a JOIN users u ON a.user_id = u.id";
    let params = [];

    if (user.role !== "admin") {
      query += " WHERE a.user_id = ?";
      params.push(user.id);
    }

    query += " ORDER BY a.date ASC, a.time ASC";

    const [appointments] = await pool.execute(query, params);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { service, date, time } = req.body;
    if (!(service && date && time)) return res.status(400).json({ message: "All fields required" });

    const userId = req.user.id;

    // Optional: Check for overlapping appointments (same date/time)
    const [conflicts] = await pool.execute(
      "SELECT * FROM appointments WHERE date = ? AND time = ? AND status = 'booked'",
      [date, time]
    );
    if (conflicts.length > 0) return res.status(409).json({ message: "Appointment slot already booked" });

    await pool.execute(
      "INSERT INTO appointments (user_id, service, date, time) VALUES (?, ?, ?, ?)",
      [userId, service, date, time]
    );

    res.status(201).json({ message: "Appointment created" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const user = req.user;

    // Check appointment ownership or admin
    const [appointments] = await pool.execute("SELECT * FROM appointments WHERE id = ?", [appointmentId]);
    if (appointments.length === 0) return res.status(404).json({ message: "Appointment not found" });

    const appointment = appointments[0];

    if (user.role !== "admin" && appointment.user_id !== user.id) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    await pool.execute(
      "UPDATE appointments SET status = 'cancelled' WHERE id = ?",
      [appointmentId]
    );

    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAppointments, createAppointment, cancelAppointment };
