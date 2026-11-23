import React from 'react';

/**
 * Animated Swinging Golden Christmas Bell with holiday ribbon bow and sparkle stars.
 */
export default function JingleBell({ size = 30, className = '', style = {} }) {
  return (
    <span
      className={`jingle-bell-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        verticalAlign: 'middle',
        position: 'relative',
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="jingle-bell-svg"
      >
        {/* Sparkle Rays */}
        <g className="bell-sparkles">
          <circle cx="8" cy="14" r="1.5" fill="#fde047" />
          <circle cx="40" cy="14" r="1.5" fill="#fde047" />
          <path d="M7 14L4 14M8 11L8 8" stroke="#fde047" strokeWidth="1" strokeLinecap="round" />
          <path d="M41 14L44 14M40 11L40 8" stroke="#fde047" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Bell Body Group (Swings) */}
        <g className="bell-swinger">
          {/* Top Hanging Ring */}
          <ellipse cx="24" cy="9" rx="3.5" ry="4" stroke="#d97706" strokeWidth="1.8" fill="none" />

          {/* Golden Bell Flare */}
          <path
            d="M24 12C18 12 16 20 14 27C12 33 9 34 8 36C8 38 12 39 24 39C36 39 40 38 40 36C39 34 36 33 34 27C32 20 30 12 24 12Z"
            fill="url(#bellGoldGrad)"
            stroke="#b45309"
            strokeWidth="1.2"
          />

          {/* Bell Rim Highlight */}
          <ellipse cx="24" cy="36" rx="14" ry="2.2" fill="#fef08a" opacity="0.6" />

          {/* Bell Clapper */}
          <circle cx="24" cy="39" r="3.2" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />

          {/* Glossy Curved Highlight */}
          <path
            d="M17 19C16 23 15 27 13 32"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Red Ribbon Bow on Top */}
          <g className="bell-ribbon">
            {/* Left Bow Loop */}
            <path
              d="M24 12C20 9 14 11 16 15C18 19 23 14 24 13Z"
              fill="#dc2626"
              stroke="#991b1b"
              strokeWidth="0.8"
            />
            {/* Right Bow Loop */}
            <path
              d="M24 12C28 9 34 11 32 15C30 19 25 14 24 13Z"
              fill="#dc2626"
              stroke="#991b1b"
              strokeWidth="0.8"
            />
            {/* Center Knot */}
            <circle cx="24" cy="13" r="2.2" fill="#b91c1c" />
            {/* Ribbon Tails */}
            <path d="M23 14L20 20" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 14L28 20" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="bellGoldGrad" x1="12" y1="12" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fef08a" />
            <stop offset="0.3" stopColor="#f59e0b" />
            <stop offset="0.8" stopColor="#d97706" />
            <stop offset="1" stopColor="#92400e" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
