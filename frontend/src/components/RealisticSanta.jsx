import React from 'react';

/**
 * Realistic, beautifully detailed Santa Claus component.
 * Poses:
 * - "sitting": Perched on a ledge/header with dangling legs, waving hand, friendly rosy face.
 * - "waiting": Sitting/leaning with a quill and wish list scroll, patiently waiting.
 * - "delivering": Joyfully carrying a gift box, walking across to deliver it.
 */
export default function RealisticSanta({ pose = 'sitting', size = 120, className = '', style = {} }) {
  if (pose === 'waiting') {
    return (
      <div className={`realistic-santa-waiting ${className}`} style={{ width: size, height: size * 1.15, display: 'inline-block', position: 'relative', ...style }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="santa-waiting-svg"
        >
          <defs>
            <linearGradient id="santaRedSuit" x1="40" y1="50" x2="120" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="0.4" stopColor="#dc2626" />
              <stop offset="0.85" stopColor="#991b1b" />
              <stop offset="1" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="whiteFur" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.8" stopColor="#f1f5f9" />
              <stop offset="1" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="skinTone" x1="70" y1="35" x2="90" y2="65" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffedd5" />
              <stop offset="0.6" stopColor="#fed7aa" />
              <stop offset="1" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id="parchment" x1="0" y1="0" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef3c7" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <filter id="softSantaShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.4)" />
            </filter>
          </defs>

          {/* SITTING BENCH / CLOUD SHADOW */}
          <ellipse cx="80" cy="168" rx="55" ry="8" fill="rgba(0,0,0,0.3)" />

          {/* SANTA BODY (WAITING POSE) */}
          <g filter="url(#softSantaShadow)">
            {/* Dangling Legs */}
            {/* Left Leg */}
            <path d="M52 118 L46 150 L58 152 L64 122 Z" fill="#991b1b" />
            <rect x="42" y="148" width="18" height="6" rx="3" fill="url(#whiteFur)" />
            {/* Left Boot */}
            <path d="M42 154 C40 162 42 168 56 168 C62 168 64 163 60 154 Z" fill="#18181b" />
            <rect x="47" y="157" width="8" height="5" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />

            {/* Right Leg (Tapping foot slightly) */}
            <g className="santa-foot-tap">
              <path d="M96 118 L102 148 L114 146 L108 118 Z" fill="#991b1b" />
              <rect x="100" y="145" width="18" height="6" rx="3" fill="url(#whiteFur)" transform="rotate(-6 100 145)" />
              <path d="M102 151 C102 160 108 166 122 164 C128 163 128 157 120 150 Z" fill="#18181b" />
              <rect x="108" y="153" width="8" height="5" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            </g>

            {/* Big Round Red Coat Torso */}
            <ellipse cx="80" cy="100" rx="36" ry="32" fill="url(#santaRedSuit)" />

            {/* Black Belt & Big Shiny Golden Buckle */}
            <path d="M45 106 C60 114 100 114 115 106" stroke="#18181b" strokeWidth="9" strokeLinecap="round" />
            <rect x="71" y="103" width="18" height="15" rx="3" fill="none" stroke="#fbbf24" strokeWidth="3" />
            <rect x="78" y="108" width="8" height="5" fill="#f59e0b" />

            {/* Fluffy Coat Bottom Trim */}
            <path d="M44 122 C60 130 100 130 116 122" stroke="url(#whiteFur)" strokeWidth="10" strokeLinecap="round" />

            {/* Left Arm holding scroll */}
            <path d="M48 88 C36 94 34 112 44 122" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="44" cy="120" rx="6" ry="6" fill="url(#whiteFur)" />
            <circle cx="48" cy="122" r="6" fill="#15803d" /> {/* Green Mitten */}

            {/* Wishlist Scroll in Hand */}
            <g transform="translate(36, 110) rotate(-15)">
              <rect x="0" y="0" width="36" height="50" rx="3" fill="url(#parchment)" stroke="#d97706" strokeWidth="1" />
              {/* Scroll curl bottom */}
              <path d="M-2 50 C10 56 26 56 38 50 C38 46 0 46 -2 50 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" />
              {/* Lines on list */}
              <line x1="6" y1="8" x2="28" y2="8" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="6" y1="14" x2="24" y2="14" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="6" y1="20" x2="26" y2="20" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="6" y1="26" x2="20" y2="26" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="6" y1="32" x2="25" y2="32" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" />
              {/* Little red ribbon seal on scroll */}
              <circle cx="16" cy="42" r="4" fill="#dc2626" />
            </g>

            {/* Right Arm holding Feather Quill */}
            <path d="M112 88 C124 94 126 108 116 118" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="116" cy="116" rx="6" ry="6" fill="url(#whiteFur)" />
            <circle cx="114" cy="118" r="6" fill="#15803d" /> {/* Green Mitten */}
            {/* Feather Quill */}
            <path d="M114 116 L126 94 Q 130 88 126 84 Q 120 88 116 104 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />

            {/* SANTA HEAD & FACE */}
            {/* Neck / Fur Collar */}
            <ellipse cx="80" cy="72" rx="20" ry="8" fill="url(#whiteFur)" />

            {/* Face */}
            <circle cx="80" cy="56" rx="16" ry="16" fill="url(#skinTone)" />
            {/* Rosy Cheeks */}
            <circle cx="71" cy="58" r="5" fill="#f87171" opacity="0.65" />
            <circle cx="89" cy="58" r="5" fill="#f87171" opacity="0.65" />
            {/* Friendly Twinkling Eyes */}
            <circle cx="73" cy="52" r="2.2" fill="#18181b" />
            <circle cx="87" cy="52" r="2.2" fill="#18181b" />
            <circle cx="74" cy="51" r="0.8" fill="#ffffff" />
            <circle cx="88" cy="51" r="0.8" fill="#ffffff" />
            {/* Eyebrows */}
            <path d="M68 47 Q 73 44 78 47" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <path d="M82 47 Q 87 44 92 47" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            {/* Button Nose */}
            <ellipse cx="80" cy="55" rx="3.5" ry="2.8" fill="#f87171" />

            {/* Big Snowy Fluffy Beard */}
            <path
              d="M64 58 C58 74 62 94 76 98 C78 100 82 100 84 98 C98 94 102 74 96 58 C92 68 84 72 80 72 C76 72 68 68 64 58 Z"
              fill="url(#whiteFur)"
              stroke="#e2e8f0"
              strokeWidth="0.8"
            />
            {/* Curled Mustache */}
            <path d="M80 60 C74 58 66 62 64 66 C68 66 76 64 80 63 Z" fill="#ffffff" />
            <path d="M80 60 C86 58 94 62 96 66 C92 66 84 64 80 63 Z" fill="#ffffff" />

            {/* SANTA HAT */}
            {/* White Fur Brim */}
            <rect x="62" y="40" width="36" height="9" rx="4.5" fill="url(#whiteFur)" stroke="#e2e8f0" strokeWidth="0.6" />
            {/* Red Velvety Slouching Cap */}
            <path
              d="M65 42 C67 22 92 20 102 36 C106 42 114 45 118 42 C116 46 110 50 104 46"
              fill="url(#santaRedSuit)"
            />
            {/* Fluffy Pom-Pom */}
            <circle cx="118" cy="44" r="7" fill="url(#whiteFur)" stroke="#e2e8f0" strokeWidth="0.8" className="santa-waiting-pompom" />
          </g>
        </svg>
      </div>
    );
  }

  if (pose === 'delivering') {
    return (
      <div className={`realistic-santa-delivering ${className}`} style={{ width: size, height: size * 1.15, display: 'inline-block', position: 'relative', ...style }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 170 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="santa-delivering-svg"
        >
          <defs>
            <linearGradient id="delivRed" x1="30" y1="40" x2="130" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ef4444" />
              <stop offset="0.5" stopColor="#dc2626" />
              <stop offset="1" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="delivFur" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="giftGold" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fef08a" />
              <stop offset="0.6" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="85" cy="168" rx="50" ry="7" fill="rgba(0,0,0,0.3)" />

          {/* Striding Legs */}
          {/* Back Leg */}
          <path d="M60 118 L50 148 L62 150 L72 120 Z" fill="#991b1b" />
          <rect x="46" y="146" width="18" height="6" rx="3" fill="url(#delivFur)" />
          <path d="M46 152 C44 160 46 166 60 166 C66 166 68 160 64 152 Z" fill="#18181b" />

          {/* Front Striding Leg */}
          <path d="M92 118 L108 148 L120 146 L104 118 Z" fill="#991b1b" />
          <rect x="105" y="145" width="18" height="6" rx="3" fill="url(#delivFur)" transform="rotate(8 105 145)" />
          <path d="M108 150 C110 158 116 164 130 162 C136 161 134 155 126 149 Z" fill="#18181b" />

          {/* Santa Torso */}
          <ellipse cx="80" cy="100" rx="34" ry="30" fill="url(#delivRed)" />
          <path d="M46 106 C62 114 98 114 114 106" stroke="#18181b" strokeWidth="8" strokeLinecap="round" />
          <rect x="73" y="103" width="16" height="14" rx="3" fill="none" stroke="#fbbf24" strokeWidth="2.8" />
          <path d="M46 122 C62 128 98 128 114 122" stroke="url(#delivFur)" strokeWidth="8" strokeLinecap="round" />

          {/* SANTA HEAD */}
          <ellipse cx="80" cy="72" rx="18" ry="7" fill="url(#delivFur)" />
          <circle cx="80" cy="56" r="16" fill="#fed7aa" />
          <circle cx="72" cy="58" r="4.5" fill="#f87171" opacity="0.65" />
          <circle cx="88" cy="58" r="4.5" fill="#f87171" opacity="0.65" />
          <circle cx="74" cy="52" r="2" fill="#18181b" />
          <circle cx="86" cy="52" r="2" fill="#18181b" />
          <ellipse cx="80" cy="55" rx="3" ry="2.5" fill="#f87171" />
          <path d="M65 58 C60 72 64 92 78 96 C82 96 94 92 95 58 Z" fill="url(#delivFur)" />
          <path d="M80 60 C75 58 68 62 66 66 C70 66 77 64 80 63 Z" fill="#ffffff" />
          <path d="M80 60 C85 58 92 62 94 66 C90 66 83 64 80 63 Z" fill="#ffffff" />

          {/* Hat */}
          <rect x="63" y="41" width="34" height="8" rx="4" fill="url(#delivFur)" />
          <path d="M66 42 C68 24 90 22 100 36 C104 42 112 44 116 42" fill="url(#delivRed)" />
          <circle cx="116" cy="43" r="6.5" fill="url(#delivFur)" />

          {/* ARMS HOLDING GLOWING GIFT BOX */}
          <path d="M52 90 Q 75 80 100 88" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
          <circle cx="102" cy="90" r="6" fill="#15803d" />
          <circle cx="68" cy="94" r="6" fill="#15803d" />

          {/* DELIVERED GIFT BOX (HELD HIGH) */}
          <g className="carried-gift-box" transform="translate(85, 70)">
            {/* Box Body */}
            <rect x="0" y="0" width="36" height="34" rx="3" fill="#15803d" stroke="#166534" strokeWidth="1" />
            {/* Gold Ribbon Cross */}
            <rect x="15" y="0" width="6" height="34" fill="url(#giftGold)" />
            <rect x="0" y="14" width="36" height="6" fill="url(#giftGold)" />
            {/* Bow on Top */}
            <path d="M18 0 C12 -8 4 -4 14 0 Z" fill="url(#giftGold)" />
            <path d="M18 0 C24 -8 32 -4 22 0 Z" fill="url(#giftGold)" />
            <circle cx="18" cy="0" r="3" fill="#d97706" />
          </g>
        </svg>
      </div>
    );
  }

  // DEFAULT POSE: SITTING PERCHED ON LEDGE WITH DANGLING LEGS & WAVING ARM
  return (
    <div className={`realistic-santa-sitting ${className}`} style={{ width: size, height: size * 1.1, display: 'inline-block', position: 'relative', ...style }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 160 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="santa-sitting-svg"
      >
        <defs>
          <linearGradient id="sitRed" x1="40" y1="40" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ef4444" />
            <stop offset="0.4" stopColor="#dc2626" />
            <stop offset="0.85" stopColor="#991b1b" />
            <stop offset="1" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="sitFur" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.7" stopColor="#f1f5f9" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="sitSkin" x1="70" y1="35" x2="90" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffedd5" />
            <stop offset="0.6" stopColor="#fed7aa" />
            <stop offset="1" stopColor="#fdba74" />
          </linearGradient>
          <filter id="sitGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="rgba(0,0,0,0.45)" />
          </filter>
        </defs>

        <g filter="url(#sitGlow)">
          {/* DANGLING LEGS (HANGING OVER THE LEDGE/HEADER) */}
          {/* Left Dangling Leg */}
          <g className="santa-dangle-leg-left">
            <path d="M54 105 L50 144 L64 146 L68 108 Z" fill="#991b1b" />
            <rect x="47" y="142" width="20" height="7" rx="3.5" fill="url(#sitFur)" />
            {/* Black Boot with Gold Buckle */}
            <path d="M46 149 C44 158 48 164 62 164 C68 164 70 158 66 149 Z" fill="#18181b" />
            <rect x="52" y="152" width="8" height="5" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          </g>

          {/* Right Dangling Leg (Bouncing playfully) */}
          <g className="santa-dangle-leg-right">
            <path d="M92 105 L96 142 L110 140 L106 105 Z" fill="#991b1b" />
            <rect x="94" y="139" width="20" height="7" rx="3.5" fill="url(#sitFur)" transform="rotate(-4 94 139)" />
            <path d="M95 146 C95 156 100 162 114 160 C120 159 120 153 114 146 Z" fill="#18181b" />
            <rect x="101" y="149" width="8" height="5" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
          </g>

          {/* SANTA SITTING PLUMP BODY */}
          <ellipse cx="80" cy="92" rx="36" ry="28" fill="url(#sitRed)" />

          {/* Black Belt & Shiny Buckle */}
          <path d="M46 98 C60 106 100 106 114 98" stroke="#18181b" strokeWidth="9" strokeLinecap="round" />
          <rect x="71" y="95" width="18" height="15" rx="3" fill="none" stroke="#fbbf24" strokeWidth="3" />
          <rect x="78" y="100" width="8" height="5" fill="#f59e0b" />

          {/* White Fur Hem resting right on the ledge */}
          <path d="M42 110 C62 118 98 118 118 110" stroke="url(#sitFur)" strokeWidth="10" strokeLinecap="round" />

          {/* Left Arm Resting on Knee / Ledge */}
          <path d="M48 80 C36 86 36 102 46 108" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
          <circle cx="47" cy="108" r="6" fill="#15803d" /> {/* Green Mitten */}
          <ellipse cx="45" cy="104" rx="5" ry="5" fill="url(#sitFur)" />

          {/* Right Arm WAVING JOYFULLY */}
          <g className="santa-sitting-wave-arm">
            <path d="M112 80 C126 72 134 56 130 44" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
            <ellipse cx="128" cy="44" rx="6" ry="6" fill="url(#sitFur)" />
            {/* Green Mitten Waving */}
            <ellipse cx="132" cy="40" rx="7" ry="6" fill="#15803d" />
            <circle cx="127" cy="38" r="2.5" fill="#15803d" /> {/* Thumb */}
          </g>

          {/* SANTA HEAD */}
          <ellipse cx="80" cy="65" rx="18" ry="7" fill="url(#sitFur)" />
          {/* Face */}
          <circle cx="80" cy="50" r="16" fill="url(#sitSkin)" />
          {/* Rosy Cheeks */}
          <circle cx="71" cy="52" r="5" fill="#f87171" opacity="0.65" />
          <circle cx="89" cy="52" r="5" fill="#f87171" opacity="0.65" />
          {/* Eyes */}
          <circle cx="73" cy="46" r="2.2" fill="#18181b" />
          <circle cx="87" cy="46" r="2.2" fill="#18181b" />
          <circle cx="74" cy="45" r="0.8" fill="#ffffff" />
          <circle cx="88" cy="45" r="0.8" fill="#ffffff" />
          {/* Eyebrows */}
          <path d="M68 41 Q 73 38 78 41" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M82 41 Q 87 38 92 41" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Nose */}
          <ellipse cx="80" cy="49" rx="3.5" ry="2.8" fill="#f87171" />

          {/* Big Snowy Fluffy Beard */}
          <path
            d="M64 52 C58 68 62 88 76 92 C78 94 82 94 84 92 C98 88 102 68 96 52 C92 62 84 66 80 66 C76 66 68 62 64 52 Z"
            fill="url(#sitFur)"
            stroke="#e2e8f0"
            strokeWidth="0.8"
          />
          {/* Mustache */}
          <path d="M80 54 C74 52 66 56 64 60 C68 60 76 58 80 57 Z" fill="#ffffff" />
          <path d="M80 54 C86 52 94 56 96 60 C92 60 84 58 80 57 Z" fill="#ffffff" />

          {/* SANTA HAT */}
          <rect x="62" y="34" width="36" height="9" rx="4.5" fill="url(#sitFur)" stroke="#e2e8f0" strokeWidth="0.6" />
          <path
            d="M65 36 C67 16 92 14 102 30 C106 36 114 39 118 36 C116 40 110 44 104 40"
            fill="url(#sitRed)"
          />
          <circle cx="118" cy="38" r="7" fill="url(#sitFur)" stroke="#e2e8f0" strokeWidth="0.8" className="santa-sitting-pompom" />
        </g>
      </svg>
    </div>
  );
}
