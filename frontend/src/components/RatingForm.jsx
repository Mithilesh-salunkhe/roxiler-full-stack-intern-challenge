import React, { useState, useEffect } from "react";
import axios from "axios";

const RatingForm = ({ storeId, initialRating, onRatingSubmitted }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This effect ensures the form updates if the initialRating prop changes
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to submit a rating.");
      setLoading(false);
      return;
    }

    try {
      if (initialRating) {
        // PUT request for modifying an existing rating
        const response = await axios.put(
          `http://localhost:5000/ratings/store/${storeId}/modify`, // Use a specific update route
          { rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage(response.data.message || "Rating updated!");
      } else {
        // POST request for a new rating
        const response = await axios.post(
          "http://localhost:5000/ratings/submit",
          { storeId, rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage(response.data.message || "Rating submitted!");
      }

      // Re-fetch data in the parent component
      if (onRatingSubmitted) {
        onRatingSubmitted();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700">Rate this Store</h3>
      {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-3">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  star <= (hover || rating) ? "#facc15" : "none"
                }
                stroke="#facc15"
                strokeWidth="2"
                className="w-8 h-8 transition-transform hover:scale-110"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.75.75 0 011.04 0l2.122 2.122a.75.75 0 00.563.22h2.828a.75.75 0 01.53 1.28l-2.122 2.122a.75.75 0 00-.22.563v2.828a.75.75 0 01-1.28.53l-2.122-2.122a.75.75 0 00-.563-.22H9.96a.75.75 0 01-.53-1.28l2.122-2.122a.75.75 0 00.22-.563V3.96a.75.75 0 01.28-.53z"
                />
              </svg>
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="px-5 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 shadow-md"
          disabled={loading || rating === 0}
        >
          {loading ? "Submitting..." : (initialRating ? "Update" : "Submit")}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;