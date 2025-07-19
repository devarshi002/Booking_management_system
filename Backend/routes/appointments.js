const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getAppointments,
  createAppointment,
  cancelAppointment,
  updateAppointmentStatus,  // New controller function
} = require("../controllers/appointmentController");

router.use(authenticateToken);

router.get("/", getAppointments);
router.post("/", createAppointment);
router.delete("/:id", cancelAppointment);

// New route to update appointment status (accept/reject)
router.put("/:id/status", updateAppointmentStatus);

module.exports = router;
