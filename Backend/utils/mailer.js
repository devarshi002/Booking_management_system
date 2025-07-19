const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendBookingEmail({ userName, userEmail, service, date, time }) {
  const mailOptions = {
    from: `"Appointment System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Appointment Booking",
    html: `
      <h2>New Appointment Booking</h2>
      <p><b>Name:</b> ${userName}</p>
      <p><b>Email:</b> ${userEmail}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Date:</b> ${date}</p>
      <p><b>Time:</b> ${time}</p>
      <p>Status: Pending Approval</p>
      <hr/>
      <p>Please visit your admin dashboard to accept or reject this booking.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendBookingEmail };
