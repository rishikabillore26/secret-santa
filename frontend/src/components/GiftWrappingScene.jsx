import React, { useState, useEffect } from 'react';
import RealisticSanta from './RealisticSanta';

/**
 * Fun, lively, attractive Gift Wrapping & Santa Delivery Scene:
 * - Santa is standing right beside the gift box on a snowy ledge.
 * - Magical golden ribbons wrap around the crimson gift box with sparkle bursts.
 * - Santa happily lifts the wrapped gift, smiling and swaying merrily.
 * - No clutter, no text messages, no extra replay buttons - pure holiday fun!
 */
export default function GiftWrappingScene({ isAssigned = false, onRevealClick = null }) {
  // Looping animation cycle: 'wrapping' -> 'carrying' -> loops smoothly
  const [phase, setPhase] = useState('wrapping');

  useEffect(() => {
    const cycle = () => {
      setPhase('wrapping');
      // Wrap ribbons for 2.2s
      const t1 = setTimeout(() => {
        setPhase('carrying');
      }, 2200);

      // Loop back after 6.5s
      const t2 = setTimeout(() => {
        cycle();
      }, 6500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    const cleanup = cycle();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="gift-wrapping-stage-container">
      <div className="wrapping-scenery-backdrop">
        {/* Snowy ground ledge */}
        <div className="snowy-ground-ledge" />

        {/* Santa & Gift Action Area */}
        <div className="santa-delivery-track">
          {/* SANTA CHARACTER */}
          <div className="santa-character-wrapper">
            {phase === 'carrying' ? (
              <RealisticSanta pose="delivering" size={145} />
            ) : (
              <RealisticSanta pose="sitting" size={145} />
            )}
          </div>

          {/* GIFT BOX GETTING WRAPPED (During wrapping phase) */}
          {phase === 'wrapping' && (
            <div className="pedestal-gift-box wrapping">
              <svg width="105" height="105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="wrapping-box-svg">
                {/* Crimson Box Base */}
                <rect x="20" y="38" width="60" height="52" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />

                {/* Animated Wrapping Ribbons */}
                <rect
                  x="45"
                  y="38"
                  width="10"
                  height="52"
                  fill="#fbbf24"
                  className="ribbon-vertical-wrap"
                />
                <rect
                  x="20"
                  y="59"
                  width="60"
                  height="10"
                  fill="#fbbf24"
                  className="ribbon-horizontal-wrap"
                />

                {/* Bow popping on top */}
                <g className="ribbon-bow-pop">
                  <rect x="16" y="28" width="68" height="12" rx="3" fill="#b91c1c" />
                  <rect x="45" y="28" width="10" height="12" fill="#f59e0b" />
                  <path d="M44 28 C34 16 22 24 38 28 Z" fill="#fbbf24" />
                  <path d="M56 28 C66 16 78 24 62 28 Z" fill="#fbbf24" />
                  <circle cx="50" cy="28" r="4" fill="#d97706" />
                </g>
              </svg>

              {/* Magical Sparkles Burst */}
              <div className="wrapping-sparkle-burst">
                <span className="wrap-sparkle s1">✨</span>
                <span className="wrap-sparkle s2">⭐</span>
                <span className="wrap-sparkle s3">🌟</span>
                <span className="wrap-sparkle s4">✨</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* If assigned, show the big fun reveal button */}
      {isAssigned && onRevealClick && (
        <div style={{ marginTop: '18px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={onRevealClick}
            className="btn-festive btn-gold btn-glow"
            style={{ fontSize: '1.05rem', padding: '12px 28px' }}
          >
            <span>🎁 Reveal My Secret Santa Recipient! ✨</span>
          </button>
        </div>
      )}
    </div>
  );
}
