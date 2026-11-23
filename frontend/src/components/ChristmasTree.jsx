import React from 'react';

/**
 * Beautiful, Realistic Christmas Tree with snow-dusted pine boughs,
 * glowing golden star topper, colorful baubles, twinkle garland,
 * candy canes, and wrapped holiday gift parcels at the base.
 */
export default function ChristmasTree({ size = 180, className = '', style = {} }) {
  return (
    <div
      className={`ornate-christmas-tree ${className}`}
      style={{
        width: size,
        height: size * 1.35,
        display: 'inline-block',
        position: 'relative',
        filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.5))',
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="christmas-tree-svg"
      >
        <defs>
          <linearGradient id="treePine1" x1="80" y1="20" x2="80" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15803d" />
            <stop offset="0.5" stopColor="#166534" />
            <stop offset="1" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="treePine2" x1="80" y1="20" x2="80" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16a34a" />
            <stop offset="0.7" stopColor="#15803d" />
            <stop offset="1" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="treeSnow" x1="0" y1="0" x2="0" y2="10" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="treeTrunk" x1="72" y1="180" x2="88" y2="205" gradientUnits="userSpaceOnUse">
            <stop stopColor="#78350f" />
            <stop offset="1" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="starGoldGlow" x1="70" y1="5" x2="90" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffbeb" />
            <stop offset="0.4" stopColor="#fde047" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="starAura" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* TREE TRUNK */}
        <rect x="73" y="180" width="14" height="22" rx="3" fill="url(#treeTrunk)" stroke="#291102" strokeWidth="1" />

        {/* WRAPPED GIFTS UNDER THE TREE */}
        <g className="tree-gifts-base">
          {/* Red Gift Box Left */}
          <rect x="36" y="188" width="26" height="20" rx="3" fill="#dc2626" />
          <rect x="47" y="188" width="5" height="20" fill="#fbbf24" />
          <rect x="36" y="196" width="26" height="4" fill="#fbbf24" />
          <circle cx="49" cy="187" r="3" fill="#f59e0b" />

          {/* Gold Gift Box Right */}
          <rect x="98" y="186" width="28" height="22" rx="3" fill="#fbbf24" />
          <rect x="110" y="186" width="5" height="22" fill="#ef4444" />
          <rect x="98" y="195" width="28" height="4" fill="#ef4444" />
          <circle cx="112" cy="185" r="3.5" fill="#dc2626" />

          {/* Small Blue Gift Front */}
          <rect x="68" y="194" width="24" height="18" rx="2" fill="#0284c7" />
          <rect x="78" y="194" width="4" height="18" fill="#ffffff" />
          <circle cx="80" cy="193" r="2.5" fill="#ffffff" />
        </g>

        {/* TIER 4 (BOTTOM PINE BOUGHS) */}
        <path
          d="M80 120 L135 182 C125 186 112 184 100 178 C90 184 70 184 60 178 C48 184 35 186 25 182 Z"
          fill="url(#treePine1)"
          stroke="#0f3e1b"
          strokeWidth="1.2"
        />
        {/* Snow caps on bottom branches */}
        <path d="M25 182 Q 40 176 56 180" stroke="url(#treeSnow)" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 178 Q 80 174 100 178" stroke="url(#treeSnow)" strokeWidth="4" strokeLinecap="round" />
        <path d="M104 180 Q 120 176 135 182" stroke="url(#treeSnow)" strokeWidth="4" strokeLinecap="round" />

        {/* TIER 3 (LOWER-MID PINE BOUGHS) */}
        <path
          d="M80 85 L126 142 C116 146 104 144 94 139 C85 144 75 144 66 139 C56 144 44 146 34 142 Z"
          fill="url(#treePine2)"
          stroke="#0f3e1b"
          strokeWidth="1.2"
        />
        {/* Snow caps on mid-lower branches */}
        <path d="M34 142 Q 50 137 66 140" stroke="url(#treeSnow)" strokeWidth="3.8" strokeLinecap="round" />
        <path d="M70 139 Q 80 136 94 139" stroke="url(#treeSnow)" strokeWidth="3.8" strokeLinecap="round" />
        <path d="M98 140 Q 112 137 126 142" stroke="url(#treeSnow)" strokeWidth="3.8" strokeLinecap="round" />

        {/* TIER 2 (UPPER-MID PINE BOUGHS) */}
        <path
          d="M80 50 L115 102 C106 106 96 104 88 100 C82 104 78 104 72 100 C64 104 54 106 45 102 Z"
          fill="url(#treePine1)"
          stroke="#0f3e1b"
          strokeWidth="1.2"
        />
        <path d="M45 102 Q 60 97 72 101" stroke="url(#treeSnow)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M88 101 Q 102 97 115 102" stroke="url(#treeSnow)" strokeWidth="3.5" strokeLinecap="round" />

        {/* TIER 1 (TOP PINE TIP) */}
        <path
          d="M80 20 L102 65 C94 68 86 67 80 64 C74 67 66 68 58 65 Z"
          fill="url(#treePine2)"
          stroke="#0f3e1b"
          strokeWidth="1.2"
        />
        <path d="M58 65 Q 80 61 102 65" stroke="url(#treeSnow)" strokeWidth="3" strokeLinecap="round" />

        {/* ZIG-ZAG TWINKLING GOLDEN LIGHT GARLAND */}
        <path
          d="M74 40 Q 88 52 64 74 Q 96 90 52 118 Q 106 134 40 162"
          stroke="#fde047"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          fill="none"
          opacity="0.85"
          className="tree-light-wire"
        />

        {/* GLOWING COLORFUL BAUBLE ORNAMENTS */}
        <g className="tree-baubles">
          {/* Top Tier Baubles */}
          <circle cx="75" cy="52" r="4" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="86" cy="58" r="3.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.8" />

          {/* Tier 2 Baubles */}
          <circle cx="62" cy="85" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="82" cy="88" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="100" cy="82" r="4.2" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.8" />

          {/* Tier 3 Baubles */}
          <circle cx="48" cy="122" r="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="72" cy="124" r="5.2" fill="#a855f7" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="92" cy="118" r="4.8" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="112" cy="125" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />

          {/* Tier 4 Baubles */}
          <circle cx="40" cy="164" r="5.5" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="65" cy="160" r="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="88" cy="166" r="5.5" fill="#22c55e" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="108" cy="158" r="4.8" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="125" cy="165" r="5.2" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.8" />
        </g>

        {/* CANDY CANES HANGING ON TREE */}
        <g className="tree-candycane" transform="translate(56, 92) rotate(20) scale(0.65)">
          <path d="M8 30 L8 10 C8 3 20 3 20 10" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M8 30 L8 10 C8 3 20 3 20 10" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
        </g>
        <g className="tree-candycane" transform="translate(104, 134) rotate(-25) scale(0.65)">
          <path d="M8 30 L8 10 C8 3 20 3 20 10" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M8 30 L8 10 C8 3 20 3 20 10" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
        </g>

        {/* RADIANT GOLDEN 5-POINT STAR ON TOP */}
        <g className="tree-top-star" filter="url(#starAura)">
          {/* Star Shape */}
          <polygon
            points="80,4 84,14 94,15 86,22 89,32 80,26 71,32 74,22 66,15 76,14"
            fill="url(#starGoldGlow)"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          {/* Inner Light Core */}
          <circle cx="80" cy="18" r="3.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
