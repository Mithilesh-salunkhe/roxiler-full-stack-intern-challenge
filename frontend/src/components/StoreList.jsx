import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in as an admin.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/admin/stores', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStores(response.data.stores);
            } catch (err) {
                setError('Failed to fetch stores.');
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) return <div className="text-center mt-8 text-gray-500">Loading stores...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="mt-8 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store, index) => (
                    <div
                        key={store._id}
                        className={`p-6 rounded-2xl shadow-md text-white 
                        ${index % 4 === 0 ? "bg-gradient-to-r from-blue-500 to-indigo-600" : ""} 
                        ${index % 4 === 1 ? "bg-gradient-to-r from-green-400 to-emerald-600" : ""} 
                        ${index % 4 === 2 ? "bg-gradient-to-r from-purple-500 to-pink-600" : ""} 
                        ${index % 4 === 3 ? "bg-gradient-to-r from-orange-400 to-red-600" : ""}`}
                    >
                        <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                        <p className="text-sm opacity-90">{store.email}</p>
                        <p className="mt-2 text-sm">{store.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreList;
