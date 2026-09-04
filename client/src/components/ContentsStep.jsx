import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Flame, Check, Plus, Zap } from 'lucide-react';
import { BAG_CONTENTS } from '../data/bagContents';
import BagVisualizer from './BagVisualizer';
import { playPopSound, playDeselectSound, playWhooshSound } from '../utils/soundEffects';

export default function ContentsStep({
  selectedBag,
  selectedContents,
  onToggleContent,
  onRemoveContent,
  onAnalyze,
  onBack
}) {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleToggle = (item) => {
    const isAlreadySelected = selectedContents.includes(item.id);
    if (isAlreadySelected) {
      playDeselectSound();
    } else {
      playPopSound();
    }
    onToggleContent(item.id);
  };

  const handleAnalyze = () => {
    playWhooshSound();
    onAnalyze();
  };

  // Find active item roast for top banner
  const activeItem = hoveredItem || BAG_CONTENTS.find(i => i.id === selectedContents[selectedContents.length - 1]) || BAG_CONTENTS[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-brand-cyan px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_#000]">
          Step 3: Confess Your Sins
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-3">
          What is lurking in your bag? 🗃️
        </h2>
        <p className="text-base md:text-lg font-bold text-gray-700 max-w-xl mx-auto">
          Select everything currently occupying space inside your bag. Don't lie, we will find out anyway.
        </p>
      </div>

      {/* Live Visualizer */}
      <BagVisualizer
        selectedBag={selectedBag}
        selectedContents={selectedContents}
        onRemoveItem={onRemoveContent}
      />

      {/* Item Roast Banner */}
      <div className="max-w-2xl mx-auto mb-8 bg-brand-pink text-white p-4 rounded-2xl border-3 border-black shadow-[5px_5px_0px_0px_#000] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white text-black border-2 border-black flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_#000]">
          {activeItem.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-black uppercase tracking-wider text-brand-yellow">
            Item Diagnosis &bull; {activeItem.name}
          </div>
          <div className="text-sm md:text-base font-extrabold italic truncate">
            “{activeItem.roast}”
          </div>
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {BAG_CONTENTS.map((item) => {
          const isSelected = selectedContents.includes(item.id);
          const isHovered = hoveredItem?.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`option-card-sidelines group p-4 rounded-2xl cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'is-selected bg-brand-yellow shadow-[5px_5px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-white hover:bg-amber-50 shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
            >
              {/* Dynamic Side Lines: Visible only when cursor moves towards the option */}
              <div className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md transition-all duration-200 ${
                isSelected ? 'bg-black opacity-100 scale-y-100' : 'bg-black opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100'
              }`} />
              <div className={`absolute right-0 top-3 bottom-3 w-1.5 rounded-l-md transition-all duration-200 ${
                isSelected ? 'bg-black opacity-100 scale-y-100' : 'bg-black opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100'
              }`} />

              {/* Checkbox indicator */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.emoji ? <span className="text-3xl">{item.emoji}</span> : null}
                  <span className="font-black text-lg text-black">{item.name}</span>
                </div>
                <div className={`w-7 h-7 rounded-xl border-2 border-black flex items-center justify-center font-black transition-colors ${
                  isSelected ? 'bg-black text-brand-lime shadow-[2px_2px_0px_0px_#000]' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>

              {/* Tag */}
              <div className="mb-2">
                <span className="badge-brutal bg-white text-gray-800 text-[10px]">
                  {item.badge}
                </span>
              </div>

              {/* Roast Callout */}
              <div className={`quote-hover p-2 rounded-xl border-2 border-black font-bold text-xs transition-all ${
                isSelected || isHovered
                  ? 'bg-brand-lime text-black shadow-[2px_2px_0px_0px_#000]'
                  : 'bg-gray-100 text-gray-700 hover:bg-brand-yellow hover:text-black'
              }`}>
                “{item.roast}”
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="btn-brutal bg-white hover:bg-gray-100 text-black text-base px-6 py-3.5"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleAnalyze}
          disabled={selectedContents.length === 0}
          className={`btn-brutal text-lg px-8 py-4 ${
            selectedContents.length > 0
              ? 'bg-brand-pink hover:bg-pink-600 text-white cursor-pointer animate-pulse-fast'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
          }`}
        >
          <Zap className="w-6 h-6 fill-brand-yellow text-black" />
          <span>Analyze My Bag ({selectedContents.length} items)</span>
        </button>
      </div>
    </div>
  );
}
