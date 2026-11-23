import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import RealisticSanta from '../components/RealisticSanta';
import JingleBell from '../components/JingleBell';
import ChristmasTree from '../components/ChristmasTree';
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
      </div>

      <FestiveFooter />
    </main>
  );
}
