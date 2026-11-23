import React from 'react';

export default function ChristmasLights() {
  const bulbColors = ['light-red', 'light-green', 'light-gold', 'light-blue', 'light-pink', 'light-emerald'];
  const bulbs = Array.from({ length: 34 });

  return (
    <div className="lights-string" aria-hidden="true">
      {bulbs.map((_, i) => (
        <div key={i} className={`light-bulb ${bulbColors[i % bulbColors.length]}`}>
          <div className="light-glow-halo" />
        </div>
      ))}
    </div>
  );
}
