import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { BAG_TYPES } from '../data/bagTypes';
import { playPopSound, playWhooshSound } from '../utils/soundEffects';

export default function BagTypeStep({ selectedBag, onSelectBag, onNext, onBack }) {
  const [hoveredBag, setHoveredBag] = useState(null);

  const handleSelect = (bag) => {
    playPopSound();
    onSelectBag(bag);
  };

  const handleNext = () => {
    playWhooshSound();
    onNext();
  };

  // Active roast to display in the banner or speech bubble
  const activeBagForRoast = hoveredBag || selectedBag || BAG_TYPES[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-brand-pink text-white px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_#000]">
          Step 2: Choose Your Weapon of Portability
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-3">
          What bag are you dragging around? 👜
        </h2>
        <p className="text-base md:text-lg font-bold text-gray-700 max-w-xl mx-auto">
          Hover over or click each bag to preview what society secretly thinks about your life choices.
        </p>
      </div>

      {/* Live Hover Roast Banner */}
      <div className="max-w-2xl mx-auto mb-8 bg-black text-white p-4 rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_#FFE600] flex items-center gap-3 transition-all">
        <div className="w-10 h-10 rounded-xl bg-brand-pink border border-white flex items-center justify-center text-xl shrink-0">
          <Flame className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-black uppercase tracking-wider text-brand-lime">
            Live Roast Preview &bull; {activeBagForRoast.name}
          </div>
          <div className="text-sm md:text-base font-extrabold italic text-white truncate">
            “{activeBagForRoast.roast}”
          </div>
        </div>
      </div>

      {/* Bag Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {BAG_TYPES.map((bag) => {
          const isSelected = selectedBag?.id === bag.id;
          const isHovered = hoveredBag?.id === bag.id;

          return (
            <div
              key={bag.id}
              onClick={() => handleSelect(bag)}
              onMouseEnter={() => setHoveredBag(bag)}
              onMouseLeave={() => setHoveredBag(null)}
              className={`option-card-sidelines group p-5 rounded-3xl cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'is-selected bg-brand-lime shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-white hover:bg-amber-50 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
            >
              {/* Dynamic Side Lines: Visible only when cursor moves towards the option */}
              <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md transition-all duration-200 ${
                isSelected ? 'bg-black opacity-100 scale-y-100' : 'bg-black opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100'
              }`} />
              <div className={`absolute right-0 top-3 bottom-3 w-1.5 rounded-l-md transition-all duration-200 ${
                isSelected ? 'bg-black opacity-100 scale-y-100' : 'bg-black opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100'
              }`} />

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute -top-3 -right-2 bg-black text-brand-lime font-black text-[11px] px-2.5 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  LOCKED IN
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl filter drop-shadow-sm">{bag.emoji}</span>
                  <span className="badge-brutal bg-brand-yellow text-black text-[10px]">
                    {bag.badgeText}
                  </span>
                </div>

                <h3 className="font-black text-xl text-black mb-1">
                  {bag.name}
                </h3>
                <p className="text-xs font-semibold text-gray-600 mb-3">
                  {bag.tagline}
                </p>
              </div>

              {/* Roast Speech Bubble */}
              <div className={`quote-hover mt-2 p-2.5 rounded-xl border-2 border-black font-black text-xs transition-all ${
                isSelected || isHovered 
                  ? 'bg-brand-pink text-white shadow-[2px_2px_0px_0px_#000]' 
                  : 'bg-gray-100 text-gray-800 hover:bg-brand-yellow hover:text-black'
              }`}>
                “{bag.roast}”
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-xl mx-auto">
        <button
          onClick={onBack}
          className="btn-brutal bg-white hover:bg-gray-100 text-black text-base px-6 py-3.5"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedBag}
          className={`btn-brutal text-base px-8 py-3.5 ${
            selectedBag
              ? 'bg-brand-yellow hover:bg-yellow-400 text-black cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
          }`}
        >
          <span>Pack This Bag</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
