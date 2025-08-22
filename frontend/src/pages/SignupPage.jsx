import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "normal",
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

    if (!formData.name || !formData.email || !formData.password || !formData.address) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/signup", formData);
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#FE4A49] via-[#FF6B6B] to-[#FFD93D]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01] duration-300">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500">
          Join us and explore honest store reviews 🚀
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FE4A49] focus:border-[#FE4A49] outline-none transition"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FE4A49] focus:border-[#FE4A49] outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#FE4A49] focus:border-[#FE4A49] outline-none transition"
            >
              <option value="normal">Normal User</option>
              <option value="store_owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#FE4A49] to-[#FF6B6B] hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#FE4A49] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
