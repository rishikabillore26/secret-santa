import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import SantaCap from '../components/SantaCap';
import JingleBell from '../components/JingleBell';
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
    <main className="auth-page">
      <SleighBanner />

      <div className="auth-card">
        <div className="card-ribbon" />
        <SantaCap size={44} className="card-corner-cap" />

        <div className="auth-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
            <JingleBell size={30} />
            <h1 style={{ margin: 0 }}>Join Secret Santa!</h1>
          </div>
          <p>Register as an employee to create your wishlist and be matched.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px', textAlign: 'left' }}>
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Full Name
            </label>
            <input
              type="text"
              className="form-control-festive"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Joy Winter"
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Work Email
            </label>
            <input
              type="email"
              className="form-control-festive"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="joy@office.com"
              required
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Password
            </label>
            <input
              type="password"
              className="form-control-festive"
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
            {isLoading ? 'Creating Your Tag...' : 'Register as Employee 🎄'}
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
