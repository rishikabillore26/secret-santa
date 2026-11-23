import React from 'react';
import SantaRath from './SantaRath';

/**
 * Global Sky Layer: Santa's Flying Rath (Reindeer Chariot)
 * Glides smoothly across the upper sky with a magical star trail.
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

        <SantaRath mode="flying" width={440} />
      </div>
    </div>
  );
}
