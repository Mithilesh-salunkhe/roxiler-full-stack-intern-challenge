import React from 'react';
import { Link, useLocation, Routes, Route, Outlet } from 'react-router-dom';

// Import all admin-specific components
import { DashboardStats } from '../components/DashboardStats.jsx';
import UserList from '../components/UserList';
import StoreList from '../components/StoreList';
import AddUserForm from '../components/AddUserForm';
import AddStoreForm from '../components/AddStoreForm';

const AdminDashboard = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/dashboard/users':
        return <UserList />;
      case '/admin/dashboard/stores':
        return <StoreList />;
      case '/admin/dashboard/add-user':
        return <AddUserForm />;
      case '/admin/dashboard/add-store':
        return <AddStoreForm />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gradient-to-b from-indigo-500 to-purple-600 text-white shadow-xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-6">✨ Admin Panel</h2>

        <nav className="flex lg:flex-col flex-wrap gap-3">
          <Link
            to="/admin/dashboard"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === '/admin/dashboard'
                ? 'bg-white text-indigo-700 shadow-md'
                : 'bg-indigo-400 hover:bg-indigo-300'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/dashboard/users"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === '/admin/dashboard/users'
                ? 'bg-white text-indigo-700 shadow-md'
                : 'bg-indigo-400 hover:bg-indigo-300'
            }`}
          >
            Users
          </Link>
          <Link
            to="/admin/dashboard/stores"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === '/admin/dashboard/stores'
                ? 'bg-white text-indigo-700 shadow-md'
                : 'bg-indigo-400 hover:bg-indigo-300'
            }`}
          >
            Stores
          </Link>
          <Link
            to="/admin/dashboard/add-user"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === '/admin/dashboard/add-user'
                ? 'bg-white text-green-700 shadow-md'
                : 'bg-green-400 hover:bg-green-300'
            }`}
          >
            Add User
          </Link>
          <Link
            to="/admin/dashboard/add-store"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              location.pathname === '/admin/dashboard/add-store'
                ? 'bg-white text-green-700 shadow-md'
                : 'bg-green-400 hover:bg-green-300'
            }`}
          >
            Add Store
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-2xl shadow-md">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {location.pathname === '/admin/dashboard'
              ? '📊 Dashboard Overview'
              : location.pathname.split('/').pop().replace('-', ' ').toUpperCase()}
          </h1>
          <img
            src="/images/dashboard-illustration.svg"
            alt="Dashboard Illustration"
            className="w-28 h-28 mt-4 md:mt-0"
          />
        </div>

        {/* Content Area */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          <Routes>
            <Route path="/" element={<DashboardStats />} />
            <Route path="users" element={<UserList />} />
            <Route path="stores" element={<StoreList />} />
            <Route path="add-user" element={<AddUserForm />} />
            <Route path="add-store" element={<AddStoreForm />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;