import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import SantaRath from '../components/SantaRath';
import FestiveFooter from '../components/FestiveFooter';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please provide a valid work email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await authApi.register(name.trim(), email.trim(), password);
      saveAuth(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        {/* Santa's Rath Hero inside Card Header */}
        <div className="auth-rath-header">
          <SantaRath mode="hero" width={260} />
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Join Secret Santa!</h1>
          <p className="auth-subtitle">Register to create your wishlist and be matched</p>
        </div>

        {error && (
          <div className="auth-error-banner">
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group-clean">
            <label className="form-label-gold">Full Name</label>
            <input
              type="text"
              className="form-control-rath"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Joy Winter"
              required
              autoFocus
            />
          </div>

          <div className="form-group-clean">
            <label className="form-label-gold">Work Email</label>
            <input
              type="email"
              className="form-control-rath"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joy@office.com"
              required
            />
          </div>

          <div className="form-group-clean" style={{ marginBottom: '22px' }}>
            <label className="form-label-gold">Password</label>
            <input
              type="password"
              className="form-control-rath"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-festive btn-green btn-glow"
            style={{ width: '100%', padding: '13px', fontSize: '1.05rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Your Tag...' : 'Register as Employee 🛷'}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '0.92rem', color: '#cbd5e1' }}>
          <span>Already on Santa’s list? </span>
          <Link to="/login" style={{ color: '#f87171', fontWeight: 700, textDecoration: 'none' }}>
            Sign In 🎅
          </Link>
        </div>
      </div>

      <FestiveFooter />
    </main>
  );
}
