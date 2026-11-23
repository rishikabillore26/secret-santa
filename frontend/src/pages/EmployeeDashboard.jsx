import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ChristmasLights from '../components/ChristmasLights';
import Snowfall from '../components/Snowfall';
import FestiveFooter from '../components/FestiveFooter';
import { employeeApi } from '../api/employeeApi';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const [status, setStatus] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reveal Animation Stages: 'idle', 'shaking', 'popping', 'revealed'
  const [revealStage, setRevealStage] = useState('idle');

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await employeeApi.getStatus();
      setStatus(data);
    } catch (err) {
      setError(err.message || 'Failed to load employee status.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartRevealSequence = async () => {
    try {
      setError('');
      setRevealStage('shaking');

      // Fetch recipient data while shaking
      const recipientData = await employeeApi.getRecipient();

      // Stage 1: Shake for 800ms
      setTimeout(() => {
        setRevealStage('popping');
        // Stage 2: Pop lid and sparkles for 600ms
        setTimeout(() => {
          setRecipient(recipientData);
          setRevealStage('revealed');
        }, 600);
      }, 900);
    } catch (err) {
      setError(err.message || 'Could not reveal your Secret Santa recipient.');
      setRevealStage('idle');
    }
  };

  return (
    <>
      <ChristmasLights />
      <Snowfall />
      <Navbar />

      <main className="page-container">
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px' }}>
            🎅 {error}
          </div>
        )}

        {/* Quick Wishlist Banner */}
        <div className="festive-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="card-ribbon" />
          <div>
            <h2 className="festive-heading">Your Secret Santa Headquarters 🎄</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
              You currently have <strong>{status?.wishCount ?? 0} wish(es)</strong> saved on your wishlist.
            </p>
          </div>
          <Link to="/wishlist" className="btn-festive btn-red btn-glow" style={{ fontSize: '1rem', padding: '11px 24px' }}>
            <span>🎁</span>
            <span>Open My Wishlist</span>
          </Link>
        </div>

        {/* Section: My Secret Santa Recipient */}
        <section className="festive-card">
          <div className="card-ribbon" />
          <h3 className="festive-heading" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
            🎁 My Secret Santa Recipient
          </h3>

          {loading ? (
            <div className="candy-spinner" />
          ) : !status?.assigned ? (
            <div style={{ textAlign: 'center', padding: '44px 16px', background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', borderRadius: '12px', border: '1.5px dashed #f59e0b' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '10px' }}>⏳</div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#92400e', marginBottom: '8px' }}>
                Your Secret Santa match isn't ready yet, check back soon!
              </h4>
              <p style={{ color: '#b45309', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
                Your office administrator is currently selecting the gift pairings. As soon as your recipient is assigned, you'll be able to reveal them here!
              </p>
            </div>
          ) : revealStage === 'idle' ? (
            <div className="reveal-stage">
              <p style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: 500, marginBottom: '20px' }}>
                ✨ Santa’s elves have made a match for you! Ready to unwrap your recipient?
              </p>

              <div className="reveal-box-wrapper" onClick={handleStartRevealSequence} title="Click to open your gift!">
                {/* Gift Box SVG */}
                <svg width="130" height="130" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="38" width="60" height="52" rx="4" fill="#c2252b" />
                  <rect x="44" y="38" width="12" height="52" fill="#fbbf24" />
                  <rect x="20" y="60" width="60" height="10" fill="#fbbf24" />
                  <rect x="16" y="28" width="68" height="12" rx="3" fill="#991b1b" />
                  <rect x="44" y="28" width="12" height="12" fill="#f59e0b" />
                  <path d="M42 28C34 16 22 24 38 28Z" fill="#fbbf24" />
                  <path d="M58 28C66 16 78 24 62 28Z" fill="#fbbf24" />
                  <circle cx="50" cy="28" r="4" fill="#d97706" />
                </svg>
              </div>

              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={handleStartRevealSequence}
                  className="btn-festive btn-green btn-glow"
                  style={{ fontSize: '1.1rem', padding: '14px 32px' }}
                >
                  Reveal My Secret Santa Person 🎁
                </button>
              </div>
            </div>
          ) : revealStage === 'shaking' || revealStage === 'popping' ? (
            <div className="reveal-stage">
              <p style={{ fontSize: '1.15rem', color: 'var(--xmas-red)', fontWeight: 700, marginBottom: '20px' }}>
                🎄 Shhh... unwrapping your Secret Santa assignment! ✨
              </p>

              <div className="reveal-box-wrapper">
                <div className={revealStage === 'shaking' ? 'giftbox-shaking' : 'giftbox-popping'}>
                  <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="44" width="60" height="46" rx="4" fill="#c2252b" />
                    <rect x="44" y="44" width="12" height="46" fill="#fbbf24" />
                    <g transform={revealStage === 'popping' ? "translate(0, -24) rotate(-15 50 20)" : ""}>
                      <rect x="16" y="32" width="68" height="12" rx="3" fill="#991b1b" />
                      <rect x="44" y="32" width="12" height="12" fill="#f59e0b" />
                      <path d="M42 32C34 20 22 28 38 32Z" fill="#fbbf24" />
                      <path d="M58 32C66 20 78 28 62 32Z" fill="#fbbf24" />
                      <circle cx="50" cy="32" r="4" fill="#d97706" />
                    </g>
                  </svg>
                </div>

                {revealStage === 'popping' && (
                  <div className="confetti-burst">
                    <span style={{ fontSize: '3rem' }}>✨🎉🌟🎁✨</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Stage: Revealed */
            <div>
              <div className="recipient-reveal-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '2rem' }}>🎅</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--xmas-green-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    You are the Secret Santa for:
                  </span>
                </div>

                <div className="recipient-gold-glow">
                  🎉 {recipient?.recipientName}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.92rem', color: '#4b5563' }}>
                  <span>🎁 Sleigh Delivery assigned to you! Keep it a surprise!</span>
                </div>
              </div>

              <div style={{ marginTop: '30px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--xmas-green-dark)', marginBottom: '16px' }}>
                  ✨ {recipient?.recipientName}’s Wishlist:
                </h4>

                {recipient?.wishes?.length === 0 ? (
                  <div style={{ padding: '28px', background: '#fafaf9', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1rem' }}>
                      {recipient?.recipientName} hasn't added any specific wishes yet. Feel free to surprise them with a classic holiday gift!
                    </p>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {recipient?.wishes?.map((wish, index) => (
                      <div
                        key={wish.id}
                        className="gift-tag-card"
                        style={{
                          animationDelay: `${index * 0.15}s`,
                          borderColor: '#bbf7d0'
                        }}
                      >
                        <div>
                          <div className="gift-tag-hole" style={{ borderColor: 'var(--xmas-green)' }} aria-hidden="true" />
                          <h5 className="gift-tag-title">{wish.productName}</h5>

                          {wish.note && (
                            <p className="gift-tag-note">
                              "{wish.note}"
                            </p>
                          )}

                          {wish.productUrl && (
                            <a
                              href={wish.productUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gift-tag-link"
                            >
                              <span>🔗 View Item Link</span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button
                  onClick={handleStartRevealSequence}
                  className="btn-festive btn-outline-festive"
                  style={{ fontSize: '0.88rem' }}
                >
                  Replay Reveal Animation 🎁
                </button>
              </div>
            </div>
          )}
        </section>

        <FestiveFooter />
      </main>
    </>
  );
}
