import React from 'react';
import { ShoppingBag, Weight, ShieldAlert, Sparkles, X } from 'lucide-react';
import { BAG_CONTENTS } from '../data/bagContents';

export default function BagVisualizer({ selectedBag, selectedContents, onRemoveItem }) {
  const packedItems = selectedContents.map(id => BAG_CONTENTS.find(i => i.id === id)).filter(Boolean);
  const totalWeight = packedItems.reduce((sum, item) => sum + (item.weight || 0.5), 0).toFixed(1);

  // Funny capacity state calculation
  const count = selectedContents.length;
  let statusText = "Practically empty. Suspicious.";
  let statusColor = "bg-green-300";
  if (count >= 1 && count <= 3) {
    statusText = "Reasonable human being.";
    statusColor = "bg-brand-lime";
  } else if (count >= 4 && count <= 6) {
    statusText = "Mild hoarder tendencies.";
    statusColor = "bg-brand-yellow";
  } else if (count >= 7 && count <= 9) {
    statusText = "Severe structural hazard.";
    statusColor = "bg-brand-orange";
  } else if (count >= 10) {
    statusText = "Walking environmental disaster.";
    statusColor = "bg-brand-pink text-white";
  }

  return (
    <div className="bg-white border-3 border-black rounded-3xl p-5 shadow-[5px_5px_0px_0px_#000] mb-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-yellow rounded-2xl border-2 border-black flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#000]">
            {selectedBag?.emoji || "👜"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg text-black">
                {selectedBag?.name || "Your Bag"}
              </h3>
              <span className="badge-brutal bg-black text-white text-[10px]">
                {packedItems.length} items packed
              </span>
            </div>
            <p className="text-xs font-bold text-gray-500">
              Estimated Weight: ~{totalWeight} kg
            </p>
          </div>
        </div>

        {/* Hazard Badge */}
        <div className={`badge-brutal ${statusColor} text-xs font-black py-1.5 px-3`}>
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>{statusText}</span>
        </div>
      </div>

      {/* Visual Bag Inventory Container */}
      <div className="min-h-[90px] bg-[#FFFBEA] rounded-2xl border-2 border-dashed border-black/30 p-3 flex flex-wrap gap-2 items-center justify-center sm:justify-start">
        {packedItems.length === 0 ? (
          <div className="text-xs font-bold text-gray-400 py-4 text-center w-full">
            Your bag is totally empty. Click any item below to throw it in! 🎒
          </div>
        ) : (
          packedItems.map(item => (
            <div
              key={item.id}
              className="bg-white px-3 py-1.5 rounded-xl border-2 border-black font-black text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] animate-bounce-slight"
            >
              <span>{item.emoji}</span>
              <span className="text-black">{item.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(item.id);
                }}
                className="hover:bg-red-200 text-red-600 rounded-md p-0.5 ml-0.5 transition-colors"
                title="Remove item"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
