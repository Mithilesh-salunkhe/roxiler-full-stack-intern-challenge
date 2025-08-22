import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/login", formData);
      console.log("Login successful:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      switch (response.data.user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "store_owner":
          navigate("/storeowner/dashboard");
          break;
        default:
          navigate("/normaluser/dashboard");
          break;
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#FE4A49] via-[#FF6B6B] to-[#FFD93D]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01] duration-300">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500">Log in to continue 🚀</p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FE4A49] focus:border-[#FE4A49] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FE4A49] focus:border-[#FE4A49] outline-none transition"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#FE4A49] to-[#FF6B6B] hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#FE4A49] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
