import React, { useMemo } from 'react';

/**
 * Enchanting Holiday Night Atmosphere:
 * - Subtle, realistic falling snowflakes with natural drift and depth
 * - Gentle twinkling celestial stars in the night sky
 * - Pure CSS animations with low CPU overhead
 */
export default function HolidayAmbience() {
  // Generate falling snowflakes with gentle swaying and varied depth
  const snowflakes = useMemo(() => {
    const chars = ['❄', '❅', '❆', '•'];
    return Array.from({ length: 48 }).map((_, i) => ({
      id: `snow-${i}`,
      left: Math.random() * 100,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 6,
      size: 9 + Math.random() * 15,
      opacity: 0.25 + Math.random() * 0.55,
      char: chars[Math.floor(Math.random() * chars.length)]
    }));
  }, []);

  // Generate twinkling celestial stars in the background
  const stars = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: `star-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 65, // upper sky
      size: 2 + Math.random() * 3,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7
    }));
  }, []);

  return (
    <div className="holiday-ambience-layer" aria-hidden="true">
      {/* Background Starfield */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="ambient-sky-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity
          }}
        />
      ))}

      {/* Gentle Falling Snowflakes */}
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
    </div>
  );
}
