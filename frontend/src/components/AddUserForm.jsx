import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'normal',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError(null);
        
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:5000/admin/add-user', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message || 'User added successfully!');
            setFormData({ name: '', email: '', password: '', address: '', role: 'normal' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add user.');
        }
    };

    return (
        <div className="mt-8 max-w-lg mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-2xl shadow-lg">
            <div className="bg-white p-8 rounded-2xl">
                {message && <p className="text-green-600 text-center font-medium mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center font-medium mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Role</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                        >
                            <option value="normal">Normal User</option>
                            <option value="store_owner">Store Owner</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-200"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUserForm;
