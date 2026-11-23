import React, { useState } from 'react';
import SantaRath from './SantaRath';
import ChristmasTree from './ChristmasTree';

/**
 * Interactive Santa's Rath Delivery Station for Employee Dashboard.
 * Showcases Santa in his Reindeer Rath (chariot) with gifts,
 * and handles the exciting secret recipient reveal with particle sparkles!
 */
export default function RathDeliverySection({ status, recipient, onReveal, loading, error }) {
  // Reveal stage: 'idle' | 'unwrapping' | 'revealed'
  const [stage, setStage] = useState('idle');

  const handleStartReveal = async () => {
    try {
      setStage('unwrapping');
      // Fetch recipient while unwrapping
      await onReveal();
      setTimeout(() => {
        setStage('revealed');
      }, 1200);
    } catch {
      setStage('idle');
    }
  };

  return (
    <section className="festive-card rath-delivery-card">
      {/* Header */}
      <div className="rath-section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.8rem' }}>🎁</span>
          <div>
            <h3 className="festive-heading" style={{ fontSize: '1.55rem', margin: 0 }}>
              My Secret Santa Recipient
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: '2px 0 0' }}>
              Santa's Rath gift delivery hub
            </p>
          </div>
        </div>

        <span className={`status-pill ${status?.assigned ? 'pill-matched' : 'pill-pending'}`}>
          {status?.assigned ? '✓ Matched by Admin' : '⏳ Pairing in Progress'}
        </span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="candy-spinner" />
        </div>
      ) : stage === 'revealed' && recipient ? (
        /* ================= REVEALED STAGE ================= */
        <div className="rath-revealed-view">
          <div className="recipient-parchment-banner">
            <span className="rath-banner-badge">🎅 Santa's Chariot Delivery Assigned!</span>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '8px' }}>
              You are the Secret Santa for:
            </p>
            <h2 className="recipient-name-shimmer">
              ✨ {recipient.recipientName} ✨
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', marginTop: '6px' }}>
              Shh! Keep your identity a mystery until the holiday exchange party! 🤫
            </p>
          </div>

          {/* Recipient's Wishlist */}
          <div style={{ marginTop: '28px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fef08a', marginBottom: '16px' }}>
              🎄 {recipient.recipientName}’s Holiday Wishlist:
            </h4>

            {recipient.wishes?.length === 0 ? (
              <div className="empty-sub-box">
                <p style={{ fontStyle: 'italic', margin: 0, color: '#cbd5e1' }}>
                  {recipient.recipientName} hasn't added any specific wishes yet. Surprise them with a festive treat or holiday classic! 🎁
                </p>
              </div>
            ) : (
              <div className="wishlist-grid">
                {recipient.wishes?.map((wish, index) => (
                  <div key={wish.id} className="gift-tag-card" style={{ animationDelay: `${index * 0.12}s` }}>
                    <div className="gift-tag-ribbon-seal" />
                    <div>
                      <div className="gift-tag-hole" aria-hidden="true" />
                      <h5 className="gift-tag-title">{wish.productName}</h5>
                      {wish.note && <p className="gift-tag-note">"{wish.note}"</p>}
                      {wish.productUrl && (
                        <a href={wish.productUrl} target="_blank" rel="noopener noreferrer" className="gift-tag-link">
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
        </div>
      ) : (
        /* ================= IDLE OR UNWRAPPING STAGE ================= */
        <div className="rath-interactive-stage">
          {/* Rath Scene on Snowy Ground */}
          <div className="rath-scenery-container">
            <div className="rath-scenery-backdrop">
              <div className="rath-tree-side">
                <ChristmasTree size={145} />
              </div>
              <div className={`rath-vehicle-side ${stage === 'unwrapping' ? 'rath-delivering-takeoff' : ''}`}>
                <SantaRath mode="hero" width={380} />
              </div>
            </div>

            {/* Glowing Gift Box during Unwrapping */}
            {stage === 'unwrapping' && (
              <div className="unwrapping-gift-burst">
                <div className="gift-glow-halo" />
                <span className="unwrapping-box-icon">🎁</span>
                <div className="stardust-burst">
                  <span className="sparkle sp1">✨</span>
                  <span className="sparkle sp2">🌟</span>
                  <span className="sparkle sp3">⭐</span>
                  <span className="sparkle sp4">✨</span>
                  <span className="sparkle sp5">🎉</span>
                </div>
              </div>
            )}
          </div>

          {/* Action or Notice below the Rath scene */}
          {!status?.assigned ? (
            <div className="rath-notice-box">
              <span style={{ fontSize: '1.6rem' }}>⏳</span>
              <div>
                <h4 style={{ color: '#fef08a', fontSize: '1.1rem', margin: '0 0 4px' }}>
                  Santa's Rath is preparing for the exchange!
                </h4>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
                  Your office administrator is currently pairing everyone up. As soon as assignments are made, your recipient's name and wishes will appear right here!
                </p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="button"
                onClick={handleStartReveal}
                disabled={stage === 'unwrapping'}
                className="btn-festive btn-gold btn-glow btn-large-reveal"
              >
                <span>{stage === 'unwrapping' ? '✨ Unwrapping with Santa’s Rath...' : '🎁 Reveal My Secret Santa Recipient ✨'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
