import React from 'react';

export default function SleighBanner() {
  return (
    <div className="sleigh-banner" aria-hidden="true">
      <div className="sleigh-track">
        {/* Cute Santa Sleigh Vector */}
        <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Reindeer 1 */}
          <path d="M190 20C195 15 205 15 210 22C208 28 202 32 195 30L193 42L187 42L189 30C185 30 182 25 185 20Z" fill="#b45309"/>
          <path d="M205 15L212 8M208 12L215 12" stroke="#b45309" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="210" cy="22" r="2" fill="#ef4444"/> {/* Red nose */}

          {/* Reindeer 2 */}
          <path d="M145 22C150 17 160 17 165 24C163 30 157 34 150 32L148 44L142 44L144 32C140 32 137 27 140 22Z" fill="#b45309"/>
          <path d="M160 17L167 10M163 14L170 14" stroke="#b45309" strokeWidth="2" strokeLinecap="round"/>

          {/* Harness / Reins */}
          <path d="M85 28C110 32 140 30 190 24" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3"/>

          {/* Sleigh Body */}
          <path d="M40 24C45 15 70 15 85 25C88 32 80 40 50 40C35 40 32 30 40 24Z" fill="#c2252b"/>
          {/* Gold Trim */}
          <path d="M30 42C55 43 85 43 92 36C95 33 93 42 75 44C45 44 28 44 25 38C22 32 28 30 30 35" fill="#fbbf24"/>
          {/* Santa inside */}
          <circle cx="60" cy="18" r="8" fill="#fecaca"/> {/* Face */}
          <path d="M52 16C54 10 66 10 68 16Z" fill="#c2252b"/> {/* Hat */}
          <circle cx="70" cy="14" r="3" fill="#ffffff"/> {/* Pom pom */}
          <path d="M54 20C56 26 64 26 66 20C63 24 57 24 54 20Z" fill="#ffffff"/> {/* Beard */}
          {/* Toy Sack in back */}
          <path d="M38 20C34 14 46 12 48 20C48 26 40 26 38 20Z" fill="#15803d"/>
        </svg>
      </div>
    </div>
  );
}
