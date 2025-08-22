import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const StoreOwnerDashboard = () => {
    const [store, setStore] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const storeId = user?.storeId;

    useEffect(() => {
        const fetchStoreData = async () => {
            const token = localStorage.getItem('token');
            if (!token || !storeId) {
                setError('Authentication error or store not found.');
                setLoading(false);
                return;
            }

            try {
                const avgResponse = await axios.get(`http://localhost:5000/ratings/store/${storeId}/average`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAverageRating(avgResponse.data.averageRating);

                const ratingsResponse = await axios.get(`http://localhost:5000/ratings/store/${storeId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRatings(ratingsResponse.data.ratings);

            } catch (err) {
                setError('Failed to fetch store data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [storeId]);

    if (loading) return <div className="text-center mt-12 text-gray-500 animate-pulse">Loading dashboard...</div>;
    if (error) return <div className="text-center mt-12 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center">Your Store Dashboard</h1>

            {/* Overall Rating Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 rounded-xl shadow-xl max-w-sm mx-auto mb-10 transform transition hover:scale-105">
                <h3 className="text-xl sm:text-2xl font-semibold text-center">Overall Store Rating</h3>
                <p className="mt-4 text-5xl sm:text-6xl font-bold text-center">{averageRating.toFixed(1)}</p>
                <p className="text-center mt-2 text-lg opacity-80">Based on {ratings.length} reviews</p>
            </div>

            {/* Ratings Table */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-700 text-center">Ratings Submitted</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-indigo-100 text-indigo-700">
                        <tr>
                            <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">User Name</th>
                            <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">User Email</th>
                            <th className="py-3 px-6 text-left font-medium uppercase tracking-wider">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ratings.length > 0 ? (
                            ratings.map(rating => (
                                <tr key={rating._id} className="hover:bg-indigo-50 transition-colors">
                                    <td className="py-3 px-6 border-b">{rating.user.name}</td>
                                    <td className="py-3 px-6 border-b">{rating.user.email}</td>
                                    <td className="py-3 px-6 border-b font-semibold text-indigo-600">{rating.rating}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-6 px-6 text-center text-gray-400">No ratings submitted yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
