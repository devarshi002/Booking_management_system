const pool = require("../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    console.log("Signup error: Missing fields");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existing] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      console.log("Signup error: User already exists");
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    console.log("Signup successful:", email);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup server error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt for:", email);

  if (!(email && password)) {
    console.log("Login error: Missing email or password");
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      console.log("Login error: User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    console.log("User found:", user.email);

    const validPassword = await bcrypt.compare(password, user.password_hash);
    console.log("Password match:", validPassword);

    if (!validPassword) {
      console.log("Login error: Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET || "default_dev_secret";
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "1d" }
    );

    console.log("Login success for:", user.email);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error("Login server error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup, login };
