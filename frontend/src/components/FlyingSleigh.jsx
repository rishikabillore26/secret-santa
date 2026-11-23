import React from 'react';

/**
 * Animated Flying Santa Sleigh (Rath) pulled by leaping Reindeer (Deer) across the Christmas sky.
 * Features:
 * - 3 leaping reindeer with golden antlers and Rudolph's glowing red nose
 * - Golden reins connecting the herd to Santa's ornate crimson & gold sleigh (rath)
 * - Santa waving his hand with overflowing gift sacks
 * - Glittering stardust and sparkling trail drifting behind
 */
export default function FlyingSleigh() {
  return (
    <div className="flying-sleigh-sky-layer" aria-hidden="true">
      <div className="flying-rath-track">
        <div className="rath-sparkle-trail">
          <span className="trail-star star-1">✨</span>
          <span className="trail-star star-2">⭐</span>
          <span className="trail-star star-3">🌟</span>
          <span className="trail-star star-4">✨</span>
          <span className="trail-star star-5">💫</span>
          <span className="trail-star star-6">⭐</span>
        </div>

        <svg
          width="420"
          height="100"
          viewBox="0 0 420 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="sleigh-rath-svg"
        >
          {/* DEFINITIONS FOR GRADIENTS & GLOWS */}
          <defs>
            <linearGradient id="sleighRed" x1="40" y1="35" x2="140" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="0.5" stopColor="#dc2626" />
              <stop offset="1" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="goldTrim" x1="30" y1="75" x2="150" y2="88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="deerCoat" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d97706" />
              <stop offset="0.7" stopColor="#b45309" />
              <stop offset="1" stopColor="#78350f" />
            </linearGradient>
            <filter id="rudolphGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ================= REINS (GOLDEN HARNESS) ================= */}
          <path
            d="M125 58 Q 190 70 240 54 Q 280 62 315 50 Q 355 58 385 45"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* ================= REINDEER 3 (LEAD: RUDOLPH) ================= */}
          <g className="deer-group deer-lead" transform="translate(330, 18)">
            {/* Leaping Legs Back */}
            <path d="M12 42 L4 58 L10 60 L18 46" fill="#92400e" />
            <path d="M16 40 L10 56 L15 58 L22 43" fill="#b45309" />
            {/* Leaping Front Legs outstretched */}
            <path d="M46 36 L62 26 L64 30 L50 42" fill="#92400e" />
            <path d="M42 38 L58 30 L60 34 L46 44" fill="#b45309" />
            {/* Body */}
            <ellipse cx="32" cy="38" rx="20" ry="11" fill="url(#deerCoat)" />
            {/* Tail */}
            <path d="M11 36 Q 4 30 8 28 Q 14 32 13 38" fill="#ffffff" />
            {/* Neck & Head */}
            <path d="M44 36 L54 22 L62 24 L52 42 Z" fill="url(#deerCoat)" />
            {/* Head */}
            <ellipse cx="58" cy="22" rx="9" ry="6" fill="#b45309" />
            {/* Snout */}
            <ellipse cx="65" cy="22" rx="4" ry="3.5" fill="#d97706" />
            {/* Eye */}
            <circle cx="58" cy="20" r="1.5" fill="#1f2937" />
            {/* Ear */}
            <ellipse cx="53" cy="16" rx="2" ry="4" transform="rotate(-25 53 16)" fill="#92400e" />
            {/* Golden Antlers */}
            <path
              d="M54 17 Q 52 6 46 2 M51 11 Q 44 9 42 5 M53 8 Q 50 3 48 0"
              stroke="#fef08a"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Rudolph Glowing Red Nose with Pulsing Glow */}
            <circle cx="68" cy="22" r="3.8" fill="#ef4444" filter="url(#rudolphGlow)" className="rudolph-nose" />
            {/* Festive Jingle Collar */}
            <path d="M47 31 L53 34" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="35" r="2" fill="#fbbf24" />
          </g>

          {/* ================= REINDEER 2 (MIDDLE) ================= */}
          <g className="deer-group deer-mid" transform="translate(250, 24)">
            {/* Leaping Legs Back */}
            <path d="M12 42 L4 58 L10 60 L18 46" fill="#92400e" />
            <path d="M16 40 L10 56 L15 58 L22 43" fill="#b45309" />
            {/* Front Legs */}
            <path d="M46 36 L62 26 L64 30 L50 42" fill="#92400e" />
            <path d="M42 38 L58 30 L60 34 L46 44" fill="#b45309" />
            {/* Body */}
            <ellipse cx="32" cy="38" rx="20" ry="11" fill="url(#deerCoat)" />
            {/* Tail */}
            <path d="M11 36 Q 4 30 8 28 Q 14 32 13 38" fill="#ffffff" />
            {/* Neck & Head */}
            <path d="M44 36 L54 22 L62 24 L52 42 Z" fill="url(#deerCoat)" />
            <ellipse cx="58" cy="22" rx="9" ry="6" fill="#b45309" />
            <ellipse cx="65" cy="22" rx="4" ry="3.5" fill="#d97706" />
            <circle cx="58" cy="20" r="1.5" fill="#1f2937" />
            <ellipse cx="53" cy="16" rx="2" ry="4" transform="rotate(-25 53 16)" fill="#92400e" />
            {/* Antlers */}
            <path
              d="M54 17 Q 52 6 46 2 M51 11 Q 44 9 42 5 M53 8 Q 50 3 48 0"
              stroke="#fbbf24"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Dark nose */}
            <circle cx="68" cy="22" r="2.2" fill="#1f2937" />
            {/* Festive Jingle Collar */}
            <path d="M47 31 L53 34" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="35" r="2" fill="#fbbf24" />
          </g>

          {/* ================= REINDEER 1 (REAR) ================= */}
          <g className="deer-group deer-rear" transform="translate(170, 30)">
            {/* Leaping Legs Back */}
            <path d="M12 42 L4 58 L10 60 L18 46" fill="#92400e" />
            <path d="M16 40 L10 56 L15 58 L22 43" fill="#b45309" />
            {/* Front Legs */}
            <path d="M46 36 L62 26 L64 30 L50 42" fill="#92400e" />
            <path d="M42 38 L58 30 L60 34 L46 44" fill="#b45309" />
            {/* Body */}
            <ellipse cx="32" cy="38" rx="20" ry="11" fill="url(#deerCoat)" />
            {/* Tail */}
            <path d="M11 36 Q 4 30 8 28 Q 14 32 13 38" fill="#ffffff" />
            {/* Neck & Head */}
            <path d="M44 36 L54 22 L62 24 L52 42 Z" fill="url(#deerCoat)" />
            <ellipse cx="58" cy="22" rx="9" ry="6" fill="#b45309" />
            <ellipse cx="65" cy="22" rx="4" ry="3.5" fill="#d97706" />
            <circle cx="58" cy="20" r="1.5" fill="#1f2937" />
            <ellipse cx="53" cy="16" rx="2" ry="4" transform="rotate(-25 53 16)" fill="#92400e" />
            {/* Antlers */}
            <path
              d="M54 17 Q 52 6 46 2 M51 11 Q 44 9 42 5 M53 8 Q 50 3 48 0"
              stroke="#fbbf24"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Dark nose */}
            <circle cx="68" cy="22" r="2.2" fill="#1f2937" />
            {/* Festive Jingle Collar */}
            <path d="M47 31 L53 34" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="35" r="2" fill="#fbbf24" />
          </g>

          {/* ================= SANTA & RATH (CHARIOT / SLEIGH) ================= */}
          <g className="santa-sleigh-chariot" transform="translate(10, 15)">
            {/* Big Green Bag of Toys / Gifts in back */}
            <ellipse cx="48" cy="42" rx="22" ry="18" fill="#15803d" />
            <path d="M44 26 C42 22 52 20 54 26" stroke="#fbbf24" strokeWidth="2.5" />
            {/* Wrapped gifts peeking out */}
            <rect x="36" y="22" width="14" height="12" rx="2" fill="#ef4444" transform="rotate(-15 36 22)" />
            <rect x="48" y="18" width="12" height="14" rx="2" fill="#fbbf24" transform="rotate(12 48 18)" />

            {/* SANTA CLAUS */}
            <g className="santa-figure">
              {/* Santa Body / Red Coat */}
              <ellipse cx="82" cy="46" rx="16" ry="14" fill="#dc2626" />
              {/* Black Belt & Gold Buckle */}
              <path d="M68 50 C76 53 88 53 96 50" stroke="#1f2937" strokeWidth="4.5" />
              <rect x="79" y="48" width="6" height="5" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
              {/* Santa Face */}
              <circle cx="85" cy="30" r="10" fill="#fed7aa" />
              {/* Rosy Cheeks */}
              <circle cx="82" cy="32" r="2.5" fill="#fca5a5" opacity="0.8" />
              <circle cx="91" cy="32" r="2.5" fill="#fca5a5" opacity="0.8" />
              {/* Friendly Eyes */}
              <circle cx="84" cy="28" r="1.5" fill="#1f2937" />
              <circle cx="90" cy="28" r="1.5" fill="#1f2937" />
              {/* Fluffy White Beard */}
              <path
                d="M76 32 C74 44 96 46 95 32 C97 38 88 45 85 45 C82 45 74 38 76 32 Z"
                fill="#ffffff"
              />
              <path d="M80 34 Q 85 37 90 34" stroke="#e2e8f0" strokeWidth="2" fill="none" />
              {/* Santa Red Hat */}
              <path d="M76 26 C80 14 96 14 98 26 Z" fill="#dc2626" />
              {/* Fluffy Hat Trim */}
              <rect x="74" y="24" width="24" height="5" rx="2.5" fill="#ffffff" />
              {/* Pom Pom */}
              <circle cx="99" cy="22" r="3.5" fill="#ffffff" />
              {/* Waving Santa Arm */}
              <g className="santa-arm-wave">
                <path d="M94 40 Q 106 32 108 24" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" />
                {/* White Cuff */}
                <ellipse cx="108" cy="24" rx="3.5" ry="3.5" fill="#ffffff" />
                {/* Green Mitten waving */}
                <ellipse cx="111" cy="21" rx="4" ry="3.5" fill="#16a34a" />
              </g>
            </g>

            {/* SLEIGH (RATH) BODY - Curled Ornate Chariot */}
            {/* Inner Seat */}
            <path d="M52 48 C60 62 105 62 120 48" fill="#991b1b" />
            {/* Main Outer Crimson Chariot Hull */}
            <path
              d="M32 46 C40 32 75 30 115 42 C125 45 132 54 130 65 C125 78 75 80 40 76 C28 74 24 58 32 46 Z"
              fill="url(#sleighRed)"
              stroke="#b91c1c"
              strokeWidth="1.5"
            />
            {/* Gold Ornate Trim & Swirls */}
            <path
              d="M30 48 Q 50 36 90 40 Q 124 44 130 64"
              stroke="url(#goldTrim)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Festive Star on Sleigh Side */}
            <path
              d="M78 58 L80 54 L82 58 L86 59 L83 61 L84 65 L80 63 L76 65 L77 61 L74 59 Z"
              fill="#fef08a"
            />

            {/* SLEIGH RUNNERS (GOLDEN SKIS & SCROLLWORK) */}
            <path
              d="M20 84 C45 85 105 85 125 80 C138 76 142 66 140 60 C139 65 134 72 122 75 C100 79 45 79 24 77 C14 75 12 68 18 64 C12 68 12 80 20 84 Z"
              fill="url(#goldTrim)"
            />
            {/* Runner Struts */}
            <path d="M50 76 L48 83 M95 76 L93 82 M118 70 L115 78" stroke="#d97706" strokeWidth="2.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
