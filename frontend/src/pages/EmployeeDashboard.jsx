import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FestiveFooter from '../components/FestiveFooter';
import SantaCap from '../components/SantaCap';
import JingleBell from '../components/JingleBell';
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

      // Stage 1: Shake for 900ms
      setTimeout(() => {
        setRevealStage('popping');
        // Stage 2: Pop lid and sparkles for 650ms
        setTimeout(() => {
          setRecipient(recipientData);
          setRevealStage('revealed');
        }, 650);
      }, 900);
    } catch (err) {
      setError(err.message || 'Could not reveal your Secret Santa recipient.');
      setRevealStage('idle');
    }
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        {error && (
          <div style={{ background: 'rgba(153, 27, 27, 0.85)', border: '1px solid #ef4444', color: '#fee2e2', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px' }}>
            🎅 {error}
          </div>
        )}

        {/* Quick Wishlist Banner */}
        <div className="festive-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div className="card-ribbon" />
          <SantaCap size={36} className="card-corner-cap" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <JingleBell size={26} />
              <h2 className="festive-heading" style={{ margin: 0 }}>
                Your Secret Santa Headquarters 🎄
              </h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.96rem', margin: 0 }}>
              You currently have <strong style={{ color: '#fef08a' }}>{status?.wishCount ?? 0} wish(es)</strong> saved on your wishlist.
            </p>
          </div>
          <Link to="/wishlist" className="btn-festive btn-red btn-glow" style={{ fontSize: '1rem', padding: '12px 26px' }}>
            <span>🎁</span>
            <span>Open My Wishlist</span>
          </Link>
        </div>

        {/* Section: My Secret Santa Recipient */}
        <section className="festive-card">
          <div className="card-ribbon" />
          <SantaCap size={36} className="card-corner-cap" />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <JingleBell size={26} />
            <h3 className="festive-heading" style={{ fontSize: '1.5rem', margin: 0 }}>
              My Secret Santa Recipient
            </h3>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="candy-spinner" />
            </div>
          ) : !status?.assigned ? (
            <div className="festive-waiting-box">
              <div style={{ fontSize: '3.6rem', marginBottom: '12px', animation: 'hourglassBob 3s infinite ease-in-out' }}>
                ⏳
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#fef08a', marginBottom: '10px', textShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>
                Your Secret Santa match isn't ready yet, check back soon!
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.96rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
                Your office administrator is currently selecting the gift pairings. As soon as your recipient is assigned, you'll be able to reveal them here!
              </p>
            </div>
          ) : revealStage === 'idle' ? (
            <div className="reveal-stage">
              <p style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 600, marginBottom: '24px', textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
                ✨ Santa’s elves have made a match for you! Ready to unwrap your recipient?
              </p>

              <div className="reveal-box-wrapper" onClick={handleStartRevealSequence} title="Click to unwrap your gift!">
                {/* Glowing gift box rays */}
                <div className="gift-halo-glow" />

                {/* Gift Box SVG */}
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="giftbox-svg-interactive">
                  <rect x="20" y="38" width="60" height="52" rx="4" fill="#c2252b" />
                  <rect x="44" y="38" width="12" height="52" fill="#fbbf24" />
                  {/* Ribbon Bow on Lid */}
                  <rect x="16" y="28" width="68" height="14" rx="3" fill="#991b1b" />
                  <rect x="44" y="28" width="12" height="14" fill="#f59e0b" />
                  <path d="M42 28C34 16 22 24 38 28Z" fill="#fbbf24" />
                  <path d="M58 28C66 16 78 24 62 28Z" fill="#fbbf24" />
                  <circle cx="50" cy="28" r="4.5" fill="#d97706" />
                </svg>

                <div style={{ marginTop: '16px' }}>
                  <button className="btn-festive btn-gold btn-glow" style={{ fontSize: '1.05rem', padding: '12px 28px' }}>
                    <span>🎁 Reveal My Secret Santa Person ✨</span>
                  </button>
                </div>
              </div>
            </div>
          ) : revealStage === 'shaking' || revealStage === 'popping' ? (
            <div className="reveal-stage">
              <p style={{ fontSize: '1.2rem', color: '#fde68a', fontWeight: 700, marginBottom: '20px' }}>
                {revealStage === 'shaking' ? '🎅 Santa is checking the list twice...' : '✨ UNWRAPPING YOUR SECRET SANTA RECIPIENT! ✨'}
              </p>

              <div className={`reveal-box-wrapper ${revealStage === 'shaking' ? 'giftbox-shaking' : 'giftbox-popping'}`}>
                <div className="gift-halo-glow active" />
                <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="44" width="60" height="46" rx="4" fill="#c2252b" />
                  <rect x="44" y="44" width="12" height="46" fill="#fbbf24" />
                  <g transform={revealStage === 'popping' ? "translate(0, -28) rotate(-18 50 20)" : ""}>
                    <rect x="16" y="32" width="68" height="12" rx="3" fill="#991b1b" />
                    <rect x="44" y="32" width="12" height="12" fill="#f59e0b" />
                    <path d="M42 32C34 20 22 28 38 32Z" fill="#fbbf24" />
                    <path d="M58 32C66 20 78 28 62 32Z" fill="#fbbf24" />
                    <circle cx="50" cy="32" r="4" fill="#d97706" />
                  </g>
                </svg>

                {revealStage === 'popping' && (
                  <div className="confetti-burst">
                    <span style={{ fontSize: '3.5rem' }}>✨🎉🌟🎁✨</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Stage: Revealed */
            <div>
              <div className="recipient-reveal-card">
                <SantaCap size={44} className="card-corner-cap" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <JingleBell size={26} />
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fef08a', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    You are the Secret Santa for:
                  </span>
                </div>

                <div className="recipient-gold-glow">
                  🎉 {recipient?.recipientName}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', color: '#f1f5f9' }}>
                  <span>🛷 Sleigh Delivery assigned to you! Keep it a festive surprise! 🤫</span>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <JingleBell size={24} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fef08a', margin: 0 }}>
                    ✨ {recipient?.recipientName}’s Holiday Wishlist:
                  </h4>
                </div>

                {recipient?.wishes?.length === 0 ? (
                  <div style={{ padding: '32px', background: 'rgba(30, 48, 77, 0.7)', borderRadius: '14px', border: '1.5px dashed rgba(251, 191, 36, 0.4)', textAlign: 'center', color: '#cbd5e1' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1.02rem', margin: 0 }}>
                      {recipient?.recipientName} hasn't added any specific wishes yet. Feel free to surprise them with a classic holiday gift! 🎁
                    </p>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {recipient?.wishes?.map((wish, index) => (
                      <div
                        key={wish.id}
                        className="gift-tag-card"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        <div className="gift-tag-ribbon-seal" />
                        <div>
                          <div className="gift-tag-hole" aria-hidden="true" />
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

              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                  onClick={handleStartRevealSequence}
                  className="btn-festive btn-outline-festive"
                  style={{ fontSize: '0.9rem', padding: '8px 20px' }}
                >
                  <span>🔄 Replay Reveal Animation 🎁</span>
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
