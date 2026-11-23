import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ChristmasLights from './components/ChristmasLights';
import HolidayAmbience from './components/HolidayAmbience';
import FlyingSleigh from './components/FlyingSleigh';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import WishlistPage from './pages/WishlistPage';
import AdminDashboard from './pages/AdminDashboard';

function HomeRedirect() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return user.role === 'ADMIN' ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Persistent Holiday Atmosphere Across Every Route */}
        <ChristmasLights />
        <HolidayAmbience />
        <FlyingSleigh />

        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="EMPLOYEE">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRole="EMPLOYEE">
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
