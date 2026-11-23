import React, { useMemo } from 'react';

/**
 * Enchanting Holiday Ambience Layer:
 * - Gentle falling snowflakes
 * - Floating festive ornaments: golden bells 🔔, gingerbread cookies 🍪, sparkling stars ⭐,
 *   holiday gifts 🎁, candy canes 🍬, and festive baubles
 * - Non-intrusive background drift with varied depth and gentle sway
 */
export default function HolidayAmbience() {
  // Generate a fixed set of falling snowflakes
  const snowflakes = useMemo(() => {
    const chars = ['❄', '❅', '❆', '•'];
    return Array.from({ length: 42 }).map((_, i) => ({
      id: `snow-${i}`,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 6,
      size: 11 + Math.random() * 16,
      opacity: 0.35 + Math.random() * 0.5,
      char: chars[Math.floor(Math.random() * chars.length)]
    }));
  }, []);

  // Generate floating holiday magic elements (bells, stars, gifts, cookies, ornaments)
  const floatingMagic = useMemo(() => {
    const items = [
      { icon: '🔔', label: 'bell', size: 20 },
      { icon: '⭐', label: 'star', size: 18 },
      { icon: '✨', label: 'sparkle', size: 16 },
      { icon: '🎁', label: 'gift', size: 22 },
      { icon: '🍪', label: 'cookie', size: 20 },
      { icon: '🍬', label: 'candy', size: 18 },
      { icon: '🌟', label: 'star2', size: 22 },
      { icon: '🎄', label: 'tree', size: 24 },
      { icon: '🔔', label: 'bell2', size: 18 },
      { icon: '⭐', label: 'star3', size: 16 }
    ];

    return Array.from({ length: 18 }).map((_, i) => {
      const template = items[i % items.length];
      return {
        id: `magic-${i}`,
        left: 3 + Math.random() * 94,
        top: Math.random() * 100,
        duration: 9 + Math.random() * 12,
        delay: Math.random() * 7,
        size: template.size + Math.floor(Math.random() * 6),
        icon: template.icon,
        driftX: (Math.random() - 0.5) * 50
      };
    });
  }, []);

  return (
    <div className="holiday-ambience-layer" aria-hidden="true">
      {/* Falling Snowflakes */}
      {snowflakes.map((f) => (
        <span
          key={f.id}
          className="ambient-snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`
          }}
        >
          {f.char}
        </span>
      ))}

      {/* Floating Holiday Magic Ornaments */}
      {floatingMagic.map((item) => (
        <span
          key={item.id}
          className="ambient-floating-item"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
