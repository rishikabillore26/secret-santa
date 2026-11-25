import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import SantaRath from '../components/SantaRath';
import FestiveFooter from '../components/FestiveFooter';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both your email and password.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await authApi.login(email.trim(), password);
      saveAuth(data);

      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
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
          <h1 className="auth-title">Secret Santa</h1>
          <p className="auth-subtitle">Log in to enter the holiday exchange portal</p>
        </div>

        {error && (
          <div className="auth-error-banner">
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group-clean">
            <label className="form-label-gold">Work Email</label>
            <input
              type="email"
              className="form-control-rath"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@office.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group-clean" style={{ marginBottom: '22px' }}>
            <label className="form-label-gold">Password</label>
            <input
              type="password"
              className="form-control-rath"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-festive btn-red btn-glow"
            style={{ width: '100%', padding: '13px', fontSize: '1.05rem' }}
            disabled={isLoading}
          >
            {isLoading ? 'Checking Santa’s List...' : 'Sign In 🛷'}
          </button>
        </form>

        <div style={{ marginTop: '24px', fontSize: '0.92rem', color: '#cbd5e1' }}>
          <span>New employee? </span>
          <Link to="/register" style={{ color: '#86efac', fontWeight: 700, textDecoration: 'none' }}>
            Join the Exchange! 🎄
          </Link>
        </div>
      </div>

      <FestiveFooter />
    </main>
  );
}
