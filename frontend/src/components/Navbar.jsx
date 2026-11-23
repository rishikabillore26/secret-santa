import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SantaRath from './SantaRath';

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
      {/* Left Action: Quick Navigation */}
      <div className="nav-left">
        {isEmployee && (
          isWishlistPage ? (
            <Link to="/dashboard" className="nav-btn nav-btn-glow">
              <span>🏠</span>
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link to="/wishlist" className="nav-btn primary nav-btn-glow">
              <span>🎁</span>
              <span>My Wishlist</span>
            </Link>
          )
        )}
      </div>

      {/* Center: Brand with sleek Santa Rath */}
      <Link to="/" className="brand-link">
        <SantaRath mode="mini" width={85} />
        <span className="brand-title">Secret Santa</span>
      </Link>

      {/* Right: User Profile & Logout */}
      <div className="nav-right">
        {user ? (
          <>
            <div className="user-profile-chip">
              <span className="user-name">
                <span style={{ marginRight: '6px' }}>🎅</span>
                {user.name}
              </span>
              <span className={`user-role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-employee'}`}>
                {user.role}
              </span>
            </div>
            <button onClick={handleLogout} className="btn-festive btn-outline-festive btn-logout">
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
