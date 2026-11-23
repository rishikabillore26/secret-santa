import React, { useMemo } from 'react';

export default function Snowfall() {
  const flakes = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 7,
      delay: Math.random() * 5,
      size: 10 + Math.random() * 14,
      char: ['❄', '❅', '•'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  return (
    <div className="snowfall-layer" aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
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
