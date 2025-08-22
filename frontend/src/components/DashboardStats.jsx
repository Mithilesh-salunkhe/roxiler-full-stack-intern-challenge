import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DashboardStats = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('token');
            // Check if the token is retrieved
            console.log("Token retrieved for dashboard:", !!token);
            
            if (!token) {
                setError('No token found. Please log in.');
                setLoading(false);
                return;
            }
            
            // Check the format of the authorization header
            console.log("Authorization Header to be sent:", `Bearer ${token}`);

            try {
                const response = await axios.get('http://localhost:5000/admin/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDashboardData(response.data);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="text-center mt-8 text-gray-500">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
                <p className="mt-2 text-4xl font-bold text-indigo-600">{dashboardData.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-700">Total Stores</h3>
                <p className="mt-2 text-4xl font-bold text-indigo-600">{dashboardData.totalStores}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-700">Total Ratings</h3>
                <p className="mt-2 text-4xl font-bold text-indigo-600">{dashboardData.totalRatings}</p>
            </div>
        </div>
    );
};