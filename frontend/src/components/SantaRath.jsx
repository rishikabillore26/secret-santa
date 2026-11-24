import React from 'react';

/**
 * Santa's Magical Rath (Reindeer-driven Golden Flying Chariot / Sleigh)
 * Variants:
 * - "flying": Flying across the sky with leaping reindeer and glowing star trail.
 * - "hero": Parked majestically on snowy ground with glowing gifts and Santa waving.
 * - "mini": Compact sleek banner Rath for headers and modals.
 */
export default function SantaRath({ mode = 'flying', width = 380, className = '', style = {} }) {
  if (mode === 'mini') {
    return (
      <div className={`santa-rath-mini ${className}`} style={{ width, display: 'inline-block', ...style }} aria-hidden="true">
        <svg viewBox="0 0 280 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <linearGradient id="rathMiniRed" x1="0" y1="0" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="1" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="rathMiniGold" x1="0" y1="0" x2="60" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Golden Reins */}
          <path d="M75 32 Q 130 42 185 28 Q 215 32 245 22" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />

          {/* Reindeer 2 */}
          <g transform="translate(175, 12)">
            {/* Body */}
            <ellipse cx="25" cy="24" rx="14" ry="7" fill="#b45309" />
            {/* Neck & Head */}
            <path d="M33 22 L40 12 L46 14 L39 26 Z" fill="#b45309" />
            <circle cx="43" cy="13" r="5" fill="#92400e" />
            {/* Antlers */}
            <path d="M41 10 Q 38 2 34 0 M39 5 Q 35 4 33 2" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Legs */}
            <path d="M16 26 L10 38 L14 40 L21 28 M30 26 L42 20 L44 23 L33 30" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            {/* Dark nose */}
            <circle cx="48" cy="13" r="1.5" fill="#18181b" />
          </g>

          {/* Reindeer 1 (Lead Rudolph with glowing red nose) */}
          <g transform="translate(225, 6)">
            <ellipse cx="25" cy="24" rx="14" ry="7" fill="#b45309" />
            <path d="M33 22 L40 12 L46 14 L39 26 Z" fill="#b45309" />
            <circle cx="43" cy="13" r="5" fill="#92400e" />
            <path d="M41 10 Q 38 2 34 0 M39 5 Q 35 4 33 2" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M16 26 L10 38 L14 40 L21 28 M30 26 L42 20 L44 23 L33 30" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            {/* Glowing Rudolph nose */}
            <circle cx="48" cy="13" r="2.8" fill="#ef4444" className="rudolph-mini-nose" />
          </g>

          {/* Santa in Chariot */}
          <g transform="translate(10, 8)">
            {/* Gift Sack */}
            <ellipse cx="30" cy="25" rx="14" ry="12" fill="#15803d" />
            {/* Santa */}
            <ellipse cx="50" cy="28" rx="10" ry="9" fill="#dc2626" />
            <circle cx="52" cy="17" r="6" fill="#fed7aa" />
            <path d="M47 18 C45 26 59 26 57 18 Z" fill="#ffffff" />
            <path d="M47 14 C49 7 59 7 60 14 Z" fill="#dc2626" />
            <circle cx="61" cy="12" r="2" fill="#ffffff" />
            {/* Waving arm */}
            <path d="M58 24 Q 66 18 67 14" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="68" cy="13" r="2" fill="#16a34a" />

            {/* Sleigh Hull */}
            <path d="M18 28 C24 18 50 18 75 26 C80 32 76 44 48 44 C26 44 14 36 18 28 Z" fill="url(#rathMiniRed)" stroke="#991b1b" strokeWidth="1" />
            {/* Golden trim */}
            <path d="M18 30 Q 35 22 70 26" stroke="url(#rathMiniGold)" strokeWidth="2" fill="none" />
            {/* Runners */}
            <path d="M10 50 C26 51 65 51 78 47 C86 44 88 38 86 35 C85 38 82 42 74 44 C60 46 25 46 12 45 C7 44 6 40 10 38 C6 40 6 48 10 50 Z" fill="url(#rathMiniGold)" />
          </g>
        </svg>
      </div>
    );
  }

  if (mode === 'hero') {
    return (
      <div className={`santa-rath-hero ${className}`} style={{ width, display: 'inline-block', position: 'relative', ...style }}>
        <svg viewBox="0 0 360 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.5))' }}>
          <defs>
            <linearGradient id="rathHeroRed" x1="20" y1="40" x2="160" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="0.5" stopColor="#dc2626" />
              <stop offset="1" stopColor="#881337" />
            </linearGradient>
            <linearGradient id="rathHeroGold" x1="10" y1="90" x2="180" y2="120" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fffbeb" />
              <stop offset="0.3" stopColor="#fde047" />
              <stop offset="0.7" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="deerCoatHero" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d97706" />
              <stop offset="0.6" stopColor="#b45309" />
              <stop offset="1" stopColor="#78350f" />
            </linearGradient>
            <filter id="heroRudolphGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Snowy Pedestal Shadow */}
          <ellipse cx="180" cy="132" rx="160" ry="7" fill="rgba(0,0,0,0.35)" />

          {/* Golden Reins connecting Santa to Reindeer */}
          <path d="M125 76 Q 180 88 230 68 Q 270 78 305 60" stroke="#fbbf24" strokeWidth="2.2" strokeDasharray="4 2" fill="none" />

          {/* REINDEER 2 (MID) */}
          <g transform="translate(205, 30)">
            {/* 4 Distinct Legs with Hooves */}
            <path d="M15 54 L8 80 L14 82 L22 58" fill="#78350f" />
            <polygon points="8,80 14,82 13,85 7,83" fill="#18181b" />
            <path d="M22 52 L16 78 L21 80 L28 56" fill="#92400e" />
            <polygon points="16,78 21,80 20,83 15,81" fill="#18181b" />
            <path d="M46 48 L58 78 L64 78 L52 52" fill="#78350f" />
            <polygon points="58,78 64,78 63,82 57,82" fill="#18181b" />
            <path d="M42 50 L52 76 L58 76 L48 54" fill="#92400e" />
            <polygon points="52,76 58,76 57,80 51,80" fill="#18181b" />
            {/* Body */}
            <ellipse cx="32" cy="46" rx="22" ry="12" fill="url(#deerCoatHero)" />
            {/* Tail */}
            <path d="M11 44 Q 4 38 8 36 Q 14 40 13 46" fill="#ffffff" />
            {/* Neck & Head */}
            <path d="M44 44 L54 28 L62 30 L52 50 Z" fill="url(#deerCoatHero)" />
            <ellipse cx="60" cy="28" rx="10" ry="7" fill="#b45309" />
            <ellipse cx="68" cy="28" rx="4.5" ry="4" fill="#d97706" />
            <circle cx="60" cy="26" r="1.8" fill="#18181b" />
            <circle cx="60.5" cy="25.5" r="0.6" fill="#ffffff" />
            {/* Antlers */}
            <path d="M56 22 Q 54 8 46 3 M52 14 Q 44 12 42 7 M55 10 Q 51 4 48 0" stroke="#fef08a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <circle cx="71" cy="28" r="2.2" fill="#18181b" />
            {/* Festive Collar */}
            <path d="M48 38 L54 42" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="51" cy="43" r="2.2" fill="#fbbf24" />
          </g>

          {/* REINDEER 1 (RUDOLPH IN LEAD) */}
          <g transform="translate(275, 20)">
            <path d="M15 54 L8 80 L14 82 L22 58" fill="#78350f" />
            <polygon points="8,80 14,82 13,85 7,83" fill="#18181b" />
            <path d="M22 52 L16 78 L21 80 L28 56" fill="#92400e" />
            <polygon points="16,78 21,80 20,83 15,81" fill="#18181b" />
            <path d="M46 48 L58 78 L64 78 L52 52" fill="#78350f" />
            <polygon points="58,78 64,78 63,82 57,82" fill="#18181b" />
            <path d="M42 50 L52 76 L58 76 L48 54" fill="#92400e" />
            <polygon points="52,76 58,76 57,80 51,80" fill="#18181b" />
            <ellipse cx="32" cy="46" rx="22" ry="12" fill="url(#deerCoatHero)" />
            <path d="M11 44 Q 4 38 8 36 Q 14 40 13 46" fill="#ffffff" />
            <path d="M44 44 L54 28 L62 30 L52 50 Z" fill="url(#deerCoatHero)" />
            <ellipse cx="60" cy="28" rx="10" ry="7" fill="#b45309" />
            <ellipse cx="68" cy="28" rx="4.5" ry="4" fill="#d97706" />
            <circle cx="60" cy="26" r="1.8" fill="#18181b" />
            <circle cx="60.5" cy="25.5" r="0.6" fill="#ffffff" />
            <path d="M56 22 Q 54 8 46 3 M52 14 Q 44 12 42 7 M55 10 Q 51 4 48 0" stroke="#fef08a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Glowing Rudolph Red Nose */}
            <circle cx="71" cy="28" r="4.2" fill="#ef4444" filter="url(#heroRudolphGlow)" className="rudolph-hero-nose" />
            <path d="M48 38 L54 42" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="51" cy="43" r="2.2" fill="#fbbf24" />
          </g>

          {/* SANTA IN HIS ROYAL CHARIOT (RATH) */}
          <g transform="translate(15, 18)">
            {/* Overflowing Toy Bag in back */}
            <ellipse cx="44" cy="52" rx="24" ry="20" fill="#15803d" />
            <path d="M40 34 C38 30 48 28 50 34" stroke="#fbbf24" strokeWidth="3" fill="none" />
            {/* Wrapped gifts peeking out */}
            <rect x="30" y="28" width="16" height="14" rx="2" fill="#dc2626" transform="rotate(-15 30 28)" />
            <rect x="46" y="24" width="14" height="16" rx="2" fill="#fbbf24" transform="rotate(12 46 24)" />
            <rect x="22" y="38" width="14" height="12" rx="2" fill="#0284c7" transform="rotate(8 22 38)" />

            {/* SANTA CLAUS */}
            <ellipse cx="80" cy="56" rx="18" ry="16" fill="#dc2626" />
            {/* Belt */}
            <path d="M64 62 C74 66 86 66 96 62" stroke="#18181b" strokeWidth="5.5" strokeLinecap="round" />
            <rect x="76" y="59" width="8" height="7" stroke="#fbbf24" strokeWidth="1.8" fill="none" />
            {/* Santa Head */}
            <circle cx="82" cy="38" r="12" fill="#fed7aa" />
            <circle cx="78" cy="40" r="3" fill="#fca5a5" opacity="0.8" />
            <circle cx="88" cy="40" r="3" fill="#fca5a5" opacity="0.8" />
            <circle cx="80" cy="36" r="1.8" fill="#18181b" />
            <circle cx="88" cy="36" r="1.8" fill="#18181b" />
            {/* White Beard */}
            <path d="M72 40 C70 54 94 56 94 40 C96 46 86 54 83 54 C79 54 71 46 72 40 Z" fill="#ffffff" />
            {/* Santa Hat */}
            <path d="M72 32 C76 18 94 18 96 32 Z" fill="#dc2626" />
            <rect x="70" y="30" width="28" height="6" rx="3" fill="#ffffff" />
            <circle cx="98" cy="26" r="4" fill="#ffffff" />
            {/* Waving Arm */}
            <g className="santa-hero-wave">
              <path d="M92 48 Q 106 38 110 28" stroke="#dc2626" strokeWidth="6.5" strokeLinecap="round" />
              <ellipse cx="110" cy="28" rx="4.5" ry="4.5" fill="#ffffff" />
              <ellipse cx="113" cy="24" rx="5" ry="4.5" fill="#16a34a" />
            </g>

            {/* CHARIOT HULL (RATH BODY) */}
            <path
              d="M26 56 C34 40 72 38 118 52 C128 55 135 65 132 78 C126 92 72 95 35 90 C22 88 18 70 26 56 Z"
              fill="url(#rathHeroRed)"
              stroke="#991b1b"
              strokeWidth="1.8"
            />
            {/* Golden Filigree & Scrollwork */}
            <path
              d="M24 58 Q 48 44 92 48 Q 128 52 132 76"
              stroke="url(#rathHeroGold)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Star insignia on Rath */}
            <polygon points="78,68 81,74 88,75 83,79 85,86 78,82 72,86 74,79 69,75 75,74" fill="#fef08a" />

            {/* GOLDEN RUNNERS / SKIS */}
            <path
              d="M14 98 C42 100 110 100 132 94 C146 90 150 78 148 70 C146 76 140 84 126 88 C102 92 42 92 18 90 C7 88 5 80 12 76 C5 80 5 94 14 98 Z"
              fill="url(#rathHeroGold)"
            />
            <path d="M48 90 L46 98 M98 90 L96 97 M124 84 L120 92" stroke="#d97706" strokeWidth="3" />
          </g>
        </svg>
      </div>
    );
  }

  // DEFAULT MODE: "flying"
  return (
    <div className={`santa-rath-flying-root ${className}`} style={{ width, display: 'inline-block', position: 'relative', ...style }}>
      <svg viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.65))' }}>
        <defs>
          <linearGradient id="rathFlyRed" x1="40" y1="35" x2="140" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset="0.5" stopColor="#dc2626" />
            <stop offset="1" stopColor="#881337" />
          </linearGradient>
          <linearGradient id="rathFlyGold" x1="30" y1="75" x2="150" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffbeb" />
            <stop offset="0.4" stopColor="#fde047" />
            <stop offset="0.8" stopColor="#f59e0b" />
            <stop offset="1" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="deerFlyCoat" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="0.7" stopColor="#b45309" />
            <stop offset="1" stopColor="#78350f" />
          </linearGradient>
          <filter id="rathRudolphGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* GOLDEN HARNESS & REINS */}
        <path d="M125 64 Q 170 76 210 64 Q 255 70 295 58 Q 340 64 380 52" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" fill="none" />

        {/* REINDEER 3 (LEAD RUDOLPH - 4 LEAPING GALLOPING LEGS) */}
        <g className="gallop-deer gallop-deer-1" transform="translate(330, 20)">
          {/* 1. Back Far Leg (darker shade, pushing backward) */}
          <g className="deer-leg deer-back-far" style={{ transformOrigin: '18px 36px' }}>
            <path d="M16 35 Q10 44 8 50 L3 61 L7 62 L9 65 L4 65 L5 52 Q9 43 19 37 Z" fill="#78350f" />
            <polygon points="3,61 7,62 9,65 4,65" fill="#18181b" />
          </g>

          {/* 2. Front Far Leg (darker shade, bent knee in running stride) */}
          <g className="deer-leg deer-front-far" style={{ transformOrigin: '42px 38px' }}>
            <path d="M40 37 Q46 44 49 48 L46 58 L50 59 L51 62 L44 62 L44 50 Q42 44 38 39 Z" fill="#78350f" />
            <polygon points="46,58 50,59 51,62 44,62" fill="#18181b" />
          </g>

          {/* 3. Fluffy White Tail */}
          <path d="M11 34 Q 3 28 6 25 Q 14 29 13 36 Z" fill="#ffffff" />

          {/* 4. Torso Body */}
          <ellipse cx="32" cy="37" rx="20" ry="11" fill="url(#deerFlyCoat)" />
          <ellipse cx="44" cy="38" rx="4" ry="7" fill="#fef3c7" opacity="0.45" />

          {/* 5. Back Near Leg (warm chestnut, kicking back with black hoof) */}
          <g className="deer-leg deer-back-near" style={{ transformOrigin: '22px 36px' }}>
            <path d="M22 35 Q14 43 12 51 L4 63 L8 65 L6 68 L1 66 L9 53 Q14 44 24 37 Z" fill="#b45309" />
            <polygon points="4,63 8,65 6,68 1,66" fill="#18181b" />
          </g>

          {/* 6. Front Near Leg (warm chestnut, reaching forward ahead of chest with black hoof) */}
          <g className="deer-leg deer-front-near" style={{ transformOrigin: '46px 38px' }}>
            <path d="M44 38 Q52 45 56 49 L66 56 L69 54 L71 58 L63 60 L54 52 Q48 46 43 40 Z" fill="#b45309" />
            <polygon points="66,56 69,54 71,58 63,60" fill="#18181b" />
          </g>

          {/* 7. Neck & Head */}
          <path d="M42 36 L52 19 L62 21 L48 41 Z" fill="url(#deerFlyCoat)" />
          <ellipse cx="58" cy="19" rx="9" ry="6" fill="#b45309" />
          <ellipse cx="65" cy="20" rx="4.5" ry="3.5" fill="#d97706" />
          <circle cx="58" cy="18" r="1.6" fill="#18181b" />
          <circle cx="58.5" cy="17.5" r="0.6" fill="#ffffff" />
          <path d="M51 16 Q 44 14 47 11 Q 52 13 52 17 Z" fill="#92400e" />
          <path d="M54 14 Q 52 4 46 0 M51 9 Q 44 8 41 4 M53 6 Q 49 2 47 -1" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Glowing Red Nose */}
          <circle cx="68" cy="20" r="4.2" fill="#ef4444" filter="url(#rathRudolphGlow)" className="rudolph-sky-nose" />

          {/* Festive Collar with Golden Jingle Bells */}
          <path d="M46 29 L52 33" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="48" cy="32" r="2.2" fill="#fbbf24" />
          <circle cx="51" cy="34" r="1.8" fill="#fde047" />

          {/* Magical Stardust Under Galloping Hooves */}
          <circle cx="68" cy="64" r="1.5" fill="#fde047" className="hoof-sparkle" />
          <circle cx="5" cy="70" r="1.5" fill="#fde047" className="hoof-sparkle" />
        </g>

        {/* REINDEER 2 (MID - 4 LEAPING GALLOPING LEGS) */}
        <g className="gallop-deer gallop-deer-2" transform="translate(245, 26)">
          {/* 1. Back Far Leg */}
          <g className="deer-leg deer-back-far" style={{ transformOrigin: '18px 36px' }}>
            <path d="M16 35 Q10 44 8 50 L3 61 L7 62 L9 65 L4 65 L5 52 Q9 43 19 37 Z" fill="#78350f" />
            <polygon points="3,61 7,62 9,65 4,65" fill="#18181b" />
          </g>

          {/* 2. Front Far Leg */}
          <g className="deer-leg deer-front-far" style={{ transformOrigin: '42px 38px' }}>
            <path d="M40 37 Q46 44 49 48 L46 58 L50 59 L51 62 L44 62 L44 50 Q42 44 38 39 Z" fill="#78350f" />
            <polygon points="46,58 50,59 51,62 44,62" fill="#18181b" />
          </g>

          {/* 3. Fluffy White Tail */}
          <path d="M11 34 Q 3 28 6 25 Q 14 29 13 36 Z" fill="#ffffff" />

          {/* 4. Torso Body */}
          <ellipse cx="32" cy="37" rx="20" ry="11" fill="url(#deerFlyCoat)" />
          <ellipse cx="44" cy="38" rx="4" ry="7" fill="#fef3c7" opacity="0.45" />

          {/* 5. Back Near Leg */}
          <g className="deer-leg deer-back-near" style={{ transformOrigin: '22px 36px' }}>
            <path d="M22 35 Q14 43 12 51 L4 63 L8 65 L6 68 L1 66 L9 53 Q14 44 24 37 Z" fill="#b45309" />
            <polygon points="4,63 8,65 6,68 1,66" fill="#18181b" />
          </g>

          {/* 6. Front Near Leg */}
          <g className="deer-leg deer-front-near" style={{ transformOrigin: '46px 38px' }}>
            <path d="M44 38 Q52 45 56 49 L66 56 L69 54 L71 58 L63 60 L54 52 Q48 46 43 40 Z" fill="#b45309" />
            <polygon points="66,56 69,54 71,58 63,60" fill="#18181b" />
          </g>

          {/* 7. Neck & Head */}
          <path d="M42 36 L52 19 L62 21 L48 41 Z" fill="url(#deerFlyCoat)" />
          <ellipse cx="58" cy="19" rx="9" ry="6" fill="#b45309" />
          <ellipse cx="65" cy="20" rx="4.5" ry="3.5" fill="#d97706" />
          <circle cx="58" cy="18" r="1.6" fill="#18181b" />
          <circle cx="58.5" cy="17.5" r="0.6" fill="#ffffff" />
          <path d="M51 16 Q 44 14 47 11 Q 52 13 52 17 Z" fill="#92400e" />
          <path d="M54 14 Q 52 4 46 0 M51 9 Q 44 8 41 4 M53 6 Q 49 2 47 -1" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="68" cy="20" r="2.2" fill="#18181b" />

          {/* Emerald Festive Collar with Golden Jingle Bells */}
          <path d="M46 29 L52 33" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="48" cy="32" r="2.2" fill="#fbbf24" />
          <circle cx="51" cy="34" r="1.8" fill="#fde047" />

          {/* Magical Stardust Under Hooves */}
          <circle cx="68" cy="64" r="1.5" fill="#fde047" className="hoof-sparkle" />
          <circle cx="5" cy="70" r="1.5" fill="#fde047" className="hoof-sparkle" />
        </g>

        {/* REINDEER 1 (REAR - 4 LEAPING GALLOPING LEGS) */}
        <g className="gallop-deer gallop-deer-3" transform="translate(160, 32)">
          {/* 1. Back Far Leg */}
          <g className="deer-leg deer-back-far" style={{ transformOrigin: '18px 36px' }}>
            <path d="M16 35 Q10 44 8 50 L3 61 L7 62 L9 65 L4 65 L5 52 Q9 43 19 37 Z" fill="#78350f" />
            <polygon points="3,61 7,62 9,65 4,65" fill="#18181b" />
          </g>

          {/* 2. Front Far Leg */}
          <g className="deer-leg deer-front-far" style={{ transformOrigin: '42px 38px' }}>
            <path d="M40 37 Q46 44 49 48 L46 58 L50 59 L51 62 L44 62 L44 50 Q42 44 38 39 Z" fill="#78350f" />
            <polygon points="46,58 50,59 51,62 44,62" fill="#18181b" />
          </g>

          {/* 3. Fluffy White Tail */}
          <path d="M11 34 Q 3 28 6 25 Q 14 29 13 36 Z" fill="#ffffff" />

          {/* 4. Torso Body */}
          <ellipse cx="32" cy="37" rx="20" ry="11" fill="url(#deerFlyCoat)" />
          <ellipse cx="44" cy="38" rx="4" ry="7" fill="#fef3c7" opacity="0.45" />

          {/* 5. Back Near Leg */}
          <g className="deer-leg deer-back-near" style={{ transformOrigin: '22px 36px' }}>
            <path d="M22 35 Q14 43 12 51 L4 63 L8 65 L6 68 L1 66 L9 53 Q14 44 24 37 Z" fill="#b45309" />
            <polygon points="4,63 8,65 6,68 1,66" fill="#18181b" />
          </g>

          {/* 6. Front Near Leg */}
          <g className="deer-leg deer-front-near" style={{ transformOrigin: '46px 38px' }}>
            <path d="M44 38 Q52 45 56 49 L66 56 L69 54 L71 58 L63 60 L54 52 Q48 46 43 40 Z" fill="#b45309" />
            <polygon points="66,56 69,54 71,58 63,60" fill="#18181b" />
          </g>

          {/* 7. Neck & Head */}
          <path d="M42 36 L52 19 L62 21 L48 41 Z" fill="url(#deerFlyCoat)" />
          <ellipse cx="58" cy="19" rx="9" ry="6" fill="#b45309" />
          <ellipse cx="65" cy="20" rx="4.5" ry="3.5" fill="#d97706" />
          <circle cx="58" cy="18" r="1.6" fill="#18181b" />
          <circle cx="58.5" cy="17.5" r="0.6" fill="#ffffff" />
          <path d="M51 16 Q 44 14 47 11 Q 52 13 52 17 Z" fill="#92400e" />
          <path d="M54 14 Q 52 4 46 0 M51 9 Q 44 8 41 4 M53 6 Q 49 2 47 -1" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="68" cy="20" r="2.2" fill="#18181b" />

          {/* Ruby Festive Collar with Golden Jingle Bells */}
          <path d="M46 29 L52 33" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="48" cy="32" r="2.2" fill="#fbbf24" />
          <circle cx="51" cy="34" r="1.8" fill="#fde047" />

          {/* Magical Stardust Under Hooves */}
          <circle cx="68" cy="64" r="1.5" fill="#fde047" className="hoof-sparkle" />
          <circle cx="5" cy="70" r="1.5" fill="#fde047" className="hoof-sparkle" />
        </g>

        {/* SANTA IN HIS FLYING CHARIOT */}
        <g className="chariot-body" transform="translate(10, 18)">
          {/* Toy Sack in back */}
          <ellipse cx="48" cy="42" rx="22" ry="18" fill="#15803d" />
          <path d="M44 26 C42 22 52 20 54 26" stroke="#fbbf24" strokeWidth="2.5" />
          <rect x="36" y="22" width="14" height="12" rx="2" fill="#ef4444" transform="rotate(-15 36 22)" />
          <rect x="48" y="18" width="12" height="14" rx="2" fill="#fbbf24" transform="rotate(12 48 18)" />

          {/* Santa Figure */}
          <ellipse cx="82" cy="46" rx="16" ry="14" fill="#dc2626" />
          <path d="M68 50 C76 53 88 53 96 50" stroke="#18181b" strokeWidth="4.5" />
          <rect x="79" y="48" width="6" height="5" stroke="#fbbf24" strokeWidth="1.5" fill="none" />
          <circle cx="85" cy="30" r="10" fill="#fed7aa" />
          <circle cx="82" cy="32" r="2.5" fill="#fca5a5" opacity="0.8" />
          <circle cx="91" cy="32" r="2.5" fill="#fca5a5" opacity="0.8" />
          <circle cx="84" cy="28" r="1.5" fill="#18181b" />
          <circle cx="90" cy="28" r="1.5" fill="#18181b" />
          <path d="M76 32 C74 44 96 46 95 32 C97 38 88 45 85 45 C82 45 74 38 76 32 Z" fill="#ffffff" />
          <path d="M76 26 C80 14 96 14 98 26 Z" fill="#dc2626" />
          <rect x="74" y="24" width="24" height="5" rx="2.5" fill="#ffffff" />
          <circle cx="99" cy="22" r="3.5" fill="#ffffff" />
          {/* Waving Arm */}
          <g className="santa-sky-wave">
            <path d="M94 40 Q 106 32 108 24" stroke="#dc2626" strokeWidth="5.5" strokeLinecap="round" />
            <ellipse cx="108" cy="24" rx="3.5" ry="3.5" fill="#ffffff" />
            <ellipse cx="111" cy="21" rx="4" ry="3.5" fill="#16a34a" />
          </g>

          {/* Chariot Hull */}
          <path
            d="M32 46 C40 32 75 30 115 42 C125 45 132 54 130 65 C125 78 75 80 40 76 C28 74 24 58 32 46 Z"
            fill="url(#rathFlyRed)"
            stroke="#991b1b"
            strokeWidth="1.5"
          />
          {/* Gold Trim */}
          <path
            d="M30 48 Q 50 36 90 40 Q 124 44 130 64"
            stroke="url(#rathFlyGold)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <polygon points="78,56 80,52 82,56 86,57 83,59 84,63 80,61 76,63 77,59 74,57" fill="#fef08a" />

          {/* Runners */}
          <path
            d="M20 84 C45 85 105 85 125 80 C138 76 142 66 140 60 C139 65 134 72 122 75 C100 79 45 79 24 77 C14 75 12 68 18 64 C12 68 12 80 20 84 Z"
            fill="url(#rathFlyGold)"
          />
          <path d="M50 76 L48 83 M95 76 L93 82 M118 70 L115 78" stroke="#d97706" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
