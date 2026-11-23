import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import SantaCap from '../components/SantaCap';
import JingleBell from '../components/JingleBell';
import SleighBanner from '../components/SleighBanner';
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
      setError(err.message || 'Login failed. Please check your email and password.');
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
            <h1 style={{ margin: 0 }}>Secret Santa Login</h1>
          </div>
          <p>Every wish deserves a little Christmas magic.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '10px 14px', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '16px', textAlign: 'left' }}>
            🎅 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, marginBottom: '6px', color: '#fde68a' }}>
              Work Email
            </label>
            <input
              type="email"
              className="form-control-festive"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@office.com"
              required
              autoFocus
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
            {isLoading ? 'Checking Santa’s List...' : 'Sign In 🎁'}
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
