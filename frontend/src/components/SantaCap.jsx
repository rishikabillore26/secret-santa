import React from 'react';

/**
 * Animated Santa Cap with fluffy white trim and bobbing pom-pom.
 * Can be positioned absolutely on top of headers, cards, or inline.
 */
export default function SantaCap({ size = 32, className = '', style = {} }) {
  return (
    <span
      className={`santa-cap-container ${className}`}
      style={{
        display: 'inline-block',
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
        className="santa-cap-svg"
      >
        {/* Soft Shadow */}
        <ellipse cx="24" cy="42" rx="16" ry="3" fill="rgba(0,0,0,0.25)" />

        {/* Curved Red Velvet Body */}
        <path
          d="M10 36C11 26 22 10 38 16C36 18 33 22 35 25C26 21 16 28 10 36Z"
          fill="url(#santaRedGrad)"
        />

        {/* Shading Fold */}
        <path
          d="M26 19C32 20 36 21 35 25C30 23 27 21 26 19Z"
          fill="#991b1b"
          opacity="0.6"
        />

        {/* Fluffy White Brim Band */}
        <rect
          x="7"
          y="33"
          width="26"
          height="8"
          rx="4"
          fill="url(#furGrad)"
          stroke="#e2e8f0"
          strokeWidth="0.8"
        />
        {/* Fluffy texture circles */}
        <circle cx="11" cy="37" r="3.2" fill="#ffffff" />
        <circle cx="16" cy="37" r="3.2" fill="#ffffff" />
        <circle cx="21" cy="37" r="3.2" fill="#ffffff" />
        <circle cx="26" cy="37" r="3.2" fill="#ffffff" />
        <circle cx="29" cy="37" r="3.2" fill="#ffffff" />

        {/* Bobbing Pom-Pom on tip */}
        <g className="cap-pompom">
          <circle cx="39" cy="22" r="5.5" fill="url(#furGrad)" stroke="#e2e8f0" strokeWidth="0.8" />
          <circle cx="39" cy="22" r="4.2" fill="#ffffff" />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id="santaRedGrad" x1="12" y1="12" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset="0.6" stopColor="#dc2626" />
            <stop offset="1" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="furGrad" x1="10" y1="33" x2="32" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
