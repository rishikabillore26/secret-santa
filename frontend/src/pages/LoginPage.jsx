import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import RealisticSanta from '../components/RealisticSanta';
import JingleBell from '../components/JingleBell';
import ChristmasTree from '../components/ChristmasTree';
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', width: '100%', maxWidth: '820px' }}>
        {/* Left Side Decorated Christmas Tree */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ChristmasTree size={160} />
        </div>

        {/* Auth Glass Card with Perched Santa */}
        <div className="auth-card" style={{ position: 'relative', marginTop: '20px' }}>
          <div className="card-ribbon" />

          {/* Realistic Santa Sitting on top of Card */}
          <div style={{ position: 'absolute', top: '-55px', left: '24px', zIndex: 15, pointerEvents: 'none' }}>
            <RealisticSanta pose="sitting" size={88} />
          </div>

          <div className="auth-header" style={{ marginTop: '16px' }}>
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
      </div>

      <FestiveFooter />
    </main>
  );
}
