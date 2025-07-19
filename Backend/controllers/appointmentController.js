const pool = require("../config");
const { sendBookingEmail } = require("../utils/mailer");

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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { service, date, time } = req.body;
    if (!(service && date && time))
      return res.status(400).json({ message: "All fields required" });

    const userId = req.user.id;
    const userName = req.user.name;
    const userEmail = req.user.email;

    // Check if slot already booked
    const [conflicts] = await pool.execute(
      "SELECT * FROM appointments WHERE date = ? AND time = ? AND status = 'booked'",
      [date, time]
    );
    if (conflicts.length > 0)
      return res.status(409).json({ message: "Appointment slot already booked" });

    // Insert appointment with status 'pending'
    await pool.execute(
      "INSERT INTO appointments (user_id, service, date, time, status) VALUES (?, ?, ?, ?, 'pending')",
      [userId, service, date, time]
    );

    // Send email notification to admin
    await sendBookingEmail({ userName, userEmail, service, date, time });

    res.status(201).json({ message: "Appointment created and email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const user = req.user;

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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Updated function to update appointment status (accept/reject) with admin check
// const updateAppointmentStatus = async (req, res) => {
//   try {
//     const appointmentId = req.params.id;
//     const { status } = req.body;
//     const user = req.user;

//     // Only admin allowed to update status
//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     if (!["accepted", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const [appointments] = await pool.execute("SELECT * FROM appointments WHERE id = ?", [appointmentId]);
//     if (appointments.length === 0) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     await pool.execute("UPDATE appointments SET status = ? WHERE id = ?", [status, appointmentId]);

//     res.json({ message: `Appointment ${status} successfully` });
//   } catch (error) {
//     console.error("Update status error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;
    const user = req.user;

    console.log("🔍 Incoming Status Update Request");
    console.log("→ appointmentId:", appointmentId);
    console.log("→ status:", status);
    console.log("→ user:", user);

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const [appointments] = await pool.execute("SELECT * FROM appointments WHERE id = ?", [appointmentId]);
    if (appointments.length === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await pool.execute("UPDATE appointments SET status = ? WHERE id = ?", [status, appointmentId]);

    res.json({ message: `Appointment ${status} successfully` });
  } catch (error) {
    console.error("❌ Update status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getAppointments, createAppointment, cancelAppointment, updateAppointmentStatus };
