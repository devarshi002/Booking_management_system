const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { getAppointments, createAppointment, cancelAppointment } = require("../controllers/appointmentController");

router.use(authenticateToken);

router.get("/", getAppointments);
router.post("/", createAppointment);
router.delete("/:id", cancelAppointment);

module.exports = router;
