import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SantaCap from './SantaCap';
import JingleBell from './JingleBell';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isEmployee = user?.role === 'EMPLOYEE';
  const isWishlistPage = location.pathname === '/wishlist';

  return (
    <header className="app-navbar">
      {/* Upper-Left: Quick navigation button for employees */}
      <div className="nav-left">
        {isEmployee && (
          isWishlistPage ? (
            <Link to="/dashboard" className="nav-btn nav-btn-glow">
              <span className="nav-icon">🏠</span>
              <span>Back to Dashboard</span>
            </Link>
          ) : (
            <Link to="/wishlist" className="nav-btn primary nav-btn-glow">
              <span className="nav-icon">🎁</span>
              <span>My Wishlist</span>
            </Link>
          )
        )}
      </div>

      {/* Center: Brand with animated Santa Cap and swinging Jingle Bell */}
      <Link to="/" className="nav-center brand-link">
        <JingleBell size={28} className="brand-bell" />
        <div className="brand-logo-wrapper">
          <SantaCap size={32} className="brand-santa-cap" />
          <span className="brand-title">Secret Santa</span>
        </div>
      </Link>

      {/* Upper-Right: User info and Logout */}
      <div className="nav-right">
        {user ? (
          <>
            <div className="user-profile-chip">
              <span className="user-name">
                <SantaCap size={18} style={{ marginRight: '4px' }} />
                {user.name}
              </span>
              <span className={`user-role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-employee'}`}>
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-festive btn-outline-festive btn-logout"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-festive btn-red" style={{ padding: '7px 18px', fontSize: '0.88rem' }}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
