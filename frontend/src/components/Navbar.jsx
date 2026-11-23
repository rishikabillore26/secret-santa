import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
      {/* Upper-Left: My Wishlist button for employees */}
      <div className="nav-left">
        {isEmployee && (
          isWishlistPage ? (
            <Link to="/dashboard" className="nav-btn">
              <span>🏠</span>
              <span>Back to Dashboard</span>
            </Link>
          ) : (
            <Link to="/wishlist" className="nav-btn primary">
              <span>🎁</span>
              <span>My Wishlist</span>
            </Link>
          )
        )}
      </div>

      {/* Center: Brand */}
      <Link to="/" className="nav-center">
        <span style={{ fontSize: '1.5rem' }}>🎅</span>
        <span className="brand-title">Secret Santa</span>
      </Link>

      {/* Upper-Right: User info and Logout */}
      <div className="nav-right">
        {user ? (
          <>
            <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{user.name}</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '9999px',
                background: user.role === 'ADMIN' ? 'var(--xmas-gold-light)' : 'var(--xmas-green-light)',
                color: user.role === 'ADMIN' ? '#92400e' : 'var(--xmas-green-dark)',
                fontWeight: 700
              }}
            >
              {user.role}
            </span>
            <button onClick={handleLogout} className="btn-festive btn-outline-festive" style={{ padding: '5px 12px', fontSize: '0.82rem' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-festive btn-red" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
