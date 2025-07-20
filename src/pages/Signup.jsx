import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordStrength(evaluatePasswordStrength(value));
    }
  };

  const evaluatePasswordStrength = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 4;

    const score = [hasUpper, hasLower, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    if (score === 5) return "Strong";
    return "";
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password);
      setSuccess("Signup successful! You can now login.");
      setError(null);
      setFormData({ name: "", email: "", password: "" });
      setPasswordStrength("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess(null);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    (passwordStrength === "Medium" || passwordStrength === "Strong");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded mb-3"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded mb-3"
        />

        {/* Password with Eye */}
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password Strength Bar + Text */}
        {formData.password && (
          <div className="mb-4">
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className={`
                  h-full transition-all duration-300
                  ${passwordStrength === "Weak" ? "bg-red-500 w-1/3" : ""}
                  ${passwordStrength === "Medium" ? "bg-yellow-500 w-2/3" : ""}
                  ${passwordStrength === "Strong" ? "bg-green-500 w-full" : ""}
                `}
              ></div>
            </div>
            <p
              className={`text-sm mt-1 ${
                passwordStrength === "Weak"
                  ? "text-red-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              Password strength: {passwordStrength}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full text-white p-3 rounded font-semibold transition ${
            isFormValid
              ? "bg-green-600 hover:bg-green-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Sign Up
        </button>

        {/* Link to login */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
