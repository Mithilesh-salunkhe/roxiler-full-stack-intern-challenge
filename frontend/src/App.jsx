import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { NormalUserDashboard }from './pages/NormalUserDashboard.jsx';
import { StoreOwnerDashboard } from './pages/StoreOwnerDashboard.jsx';
import UpdatePassword from './pages/UpdatePassword.jsx';


const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!user || !token || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />


        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes for Dashboards */}
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/normaluser/dashboard"
          element={
            <ProtectedRoute requiredRole="normal">
              <NormalUserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/storeowner/dashboard"
          element={
            <ProtectedRoute requiredRole="store_owner">
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;