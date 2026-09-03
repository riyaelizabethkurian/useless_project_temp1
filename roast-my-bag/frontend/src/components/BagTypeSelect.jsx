import { useState } from "react";
import { BAG_TYPES } from "../data.js";

export default function BagTypeSelect({ onSelect, onBack }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="screen">
      <button className="btn-back" onClick={onBack}>← Back</button>
      <h2 className="step-title">What's carrying your chaos today?</h2>
      <p className="step-subtitle">Hover (or tap) to see what we already think of you.</p>

      <div className="option-grid bag-grid">
        {BAG_TYPES.map((bag) => (
          <button
            key={bag.id}
            className="option-card bag-card"
            onMouseEnter={() => setHovered(bag.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(bag.id)}
            onBlur={() => setHovered(null)}
            onClick={() => onSelect(bag)}
          >
            <span className="option-emoji big-emoji">{bag.emoji}</span>
            <span className="option-label">{bag.label}</span>

            {hovered === bag.id && (
              <span className="roast-popup">{bag.roast}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
