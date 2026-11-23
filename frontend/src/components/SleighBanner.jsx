import React from 'react';
import SantaCap from './SantaCap';
import JingleBell from './JingleBell';

export default function SleighBanner() {
  return (
    <div className="festive-banner-strip" aria-hidden="true">
      <div className="banner-strip-content">
        <JingleBell size={24} />
        <span className="strip-stars">✨ 🦌 🛷 🎅 ⭐</span>
        <span className="strip-text">Holiday Gift Exchange</span>
        <SantaCap size={22} />
      </div>
    </div>
  );
}
