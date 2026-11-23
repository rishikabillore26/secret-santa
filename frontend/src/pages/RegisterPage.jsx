import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import ChristmasLights from '../components/ChristmasLights';
import Snowfall from '../components/Snowfall';
import SleighBanner from '../components/SleighBanner';
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
    <>
      <ChristmasLights />
      <Snowfall />

      <main className="auth-page">
        <SleighBanner />

        <div className="auth-card">
          <div className="card-ribbon" />
          <span className="auth-holly" aria-hidden="true">🎁</span>

          <div className="auth-header">
            <h1>Ho Ho Ho! Secret Santa is Here!</h1>
            <p>Every wish deserves a little Christmas magic.</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px', textAlign: 'left' }}>
              🎅 {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Joy Winter"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem' }}
                required
                autoFocus
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Work Email
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joy@office.com"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem' }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid var(--border-light)', fontSize: '0.92rem' }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-festive btn-green btn-glow"
              style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Your Tag...' : 'Register as Employee 🎄'}
            </button>
          </form>

          <div style={{ marginTop: '22px', fontSize: '0.9rem', color: '#6b7280' }}>
            <span>Already on Santa’s list? </span>
            <Link to="/login" style={{ color: 'var(--xmas-red)', fontWeight: 700, textDecoration: 'none' }}>
              Sign In 🎅
            </Link>
          </div>
        </div>

        <FestiveFooter />
      </main>
    </>
  );
}
