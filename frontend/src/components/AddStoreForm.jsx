import React, { useState } from "react";
import axios from "axios";

const AddStoreForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/add-store",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message || "Store added successfully!");
      setFormData({ name: "", email: "", address: "", ownerId: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Store</h2>

      {message && (
        <p className="text-green-600 text-center font-medium mb-4">
          {message}
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center font-medium mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
            Owner ID
          </label>
          <input
            id="ownerId"
            type="text"
            name="ownerId"
            value={formData.ownerId}
            onChange={handleChange}
            placeholder="Enter owner's user ID"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
        >
          {loading ? "Adding Store..." : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default AddStoreForm;
