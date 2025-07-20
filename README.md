# 📅 Appointment Booking System

A full-stack appointment booking platform built with **React**, **Node.js**, **Express**, and **MySQL**, featuring role-based access, email notifications, and an intuitive admin dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-blue)
![Node.js](https://img.shields.io/badge/backend-Node.js-green)
![MySQL](https://img.shields.io/badge/database-MySQL-lightgrey)

---

## 🚀 Live Preview (if deployed)
Coming soon...

## 🔗 GitHub Repository  
[👉 View the Source Code](https://github.com/yourusername/appointment-booking-app)

---

## 🛠️ Features

- 🔐 **JWT Authentication** (User & Admin roles)
- 📅 **Book Appointments** by selecting service, date & time
- 📨 **Email Notification to Admin** on new booking
- 🧑‍💻 **Admin Dashboard** to:
  - View all appointments
  - Accept / Reject / Cancel
  - Track user and status
- ✅ **Real-time UI Feedback** using `react-toastify`
- 🌐 **Responsive Design** using Tailwind CSS

---

## 📸 Screenshots

### 🧍 User Booking Page
![Booking Page Screenshot](./screenshots/user-booking.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard Screenshot](./screenshots/admin-dashboard.png)

---

## 🧩 Tech Stack

| Layer        | Tech                      |
| ------------ | ------------------------- |
| Frontend     | React.js, Tailwind CSS    |
| Backend      | Node.js, Express.js       |
| Database     | MySQL                     |
| Auth         | JWT                       |
| Email        | Nodemailer (SMTP based)   |
| Toast Alerts | react-toastify            |

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/appointment-booking-app
cd appointment-booking-app

# 2. Install backend dependencies
cd server
npm install

# 3. Set up .env for backend
cp .env.example .env
# Add your DB, JWT, SMTP credentials

# 4. Run backend
npm start

# 5. Install frontend dependencies
cd ../client
npm install

# 6. Run frontend
npm run dev
