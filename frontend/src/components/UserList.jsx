import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in as an admin.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/admin/users?name=${filter}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUsers(response.data.users);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filter]);

    if (loading) return <div className="text-center mt-8 text-gray-500">Loading users...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-xl shadow-lg">
            {/* Filter Input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-3 border rounded-full shadow-md w-full md:w-1/2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-purple-50 transition`}
                            >
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            user.role === 'admin'
                                                ? 'bg-purple-200 text-purple-800'
                                                : 'bg-blue-200 text-blue-800'
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
