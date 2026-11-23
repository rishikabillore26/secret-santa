import React, { useState, useEffect } from 'react';
import RealisticSanta from './RealisticSanta';

/**
 * Animated Gift Wrapping & Santa Delivery Scene:
 * 1. Santa is standing right beside the gift box.
 * 2. Magical golden ribbons wrap around the crimson gift box with sparkle bursts.
 * 3. Santa happily takes the wrapped gift, waves, and strides off to the right
 *    into the starry night sky delivering the gift to the recipient!
 */
export default function GiftWrappingScene({ isAssigned = false, onRevealClick = null, recipientName = null }) {
  // Animation phase: 'wrapping' -> 'wrapped' -> 'carrying' -> 'departed'
  const [phase, setPhase] = useState('wrapping');

  const startAnimation = () => {
    setPhase('wrapping');
    // Phase 1: Ribbons wrap for 1.8s
    setTimeout(() => {
      setPhase('wrapped');
      // Phase 2: Santa takes gift after 1.2s
      setTimeout(() => {
        setPhase('carrying');
        // Phase 3: Santa strides away with gift for 2.4s
        setTimeout(() => {
          setPhase('departed');
        }, 2400);
      }, 1200);
    }, 1800);
  };

  useEffect(() => {
    startAnimation();
  }, [isAssigned]);

  return (
    <div className="gift-wrapping-stage-container">
      <div className="wrapping-scenery-backdrop">
        {/* Snowy ground pedestal */}
        <div className="snowy-ground-ledge" />

        {/* Santa & Gift Action Area */}
        <div className="santa-delivery-track">
          {/* SANTA CHARACTER */}
          <div className={`santa-character-wrapper phase-${phase}`}>
            {phase === 'carrying' || phase === 'departed' ? (
              <RealisticSanta pose="delivering" size={135} />
            ) : (
              <RealisticSanta pose="waiting" size={135} />
            )}
          </div>

          {/* GIFT BOX GETTING WRAPPED (Visible during wrapping & wrapped phases) */}
          {(phase === 'wrapping' || phase === 'wrapped') && (
            <div className={`pedestal-gift-box ${phase}`}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="wrapping-box-svg">
                {/* Crimson Box Base */}
                <rect x="20" y="38" width="60" height="52" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />

                {/* Animated Wrapping Ribbons */}
                <rect
                  x="45"
                  y="38"
                  width="10"
                  height="52"
                  fill="#fbbf24"
                  className={phase === 'wrapping' ? 'ribbon-vertical-wrap' : ''}
                />
                <rect
                  x="20"
                  y="59"
                  width="60"
                  height="10"
                  fill="#fbbf24"
                  className={phase === 'wrapping' ? 'ribbon-horizontal-wrap' : ''}
                />

                {/* Bow popping on top */}
                <g className={phase === 'wrapping' ? 'ribbon-bow-pop' : ''}>
                  <rect x="16" y="28" width="68" height="12" rx="3" fill="#b91c1c" />
                  <rect x="45" y="28" width="10" height="12" fill="#f59e0b" />
                  <path d="M44 28 C34 16 22 24 38 28 Z" fill="#fbbf24" />
                  <path d="M56 28 C66 16 78 24 62 28 Z" fill="#fbbf24" />
                  <circle cx="50" cy="28" r="4" fill="#d97706" />
                </g>
              </svg>

              {/* Sparkles during wrapping */}
              {phase === 'wrapping' && (
                <div className="wrapping-sparkle-burst">
                  <span className="wrap-sparkle s1">✨</span>
                  <span className="wrap-sparkle s2">⭐</span>
                  <span className="wrap-sparkle s3">🌟</span>
                  <span className="wrap-sparkle s4">✨</span>
                </div>
              )}
            </div>
          )}

          {/* DEPARTED DUST & DELIVERY TRAIL */}
          {phase === 'departed' && (
            <div className="santa-departed-message">
              <span style={{ fontSize: '2rem' }}>🛷 ✨ 💨</span>
              <p style={{ color: '#fef08a', fontWeight: 600, fontSize: '0.98rem', margin: '4px 0 0' }}>
                Santa is speeding through the snow on his way to deliver the secret gift!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Control Bar & Actions */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={startAnimation}
          className="btn-festive btn-outline-festive"
          style={{ fontSize: '0.84rem', padding: '6px 16px' }}
        >
          <span>🔄 Replay Wrapping & Delivery 🎁</span>
        </button>

        {isAssigned && onRevealClick && (
          <button
            type="button"
            onClick={onRevealClick}
            className="btn-festive btn-gold btn-glow"
            style={{ fontSize: '0.95rem', padding: '10px 22px' }}
          >
            <span>🎁 Reveal My Recipient Now! ✨</span>
          </button>
        )}
      </div>
    </div>
  );
}
