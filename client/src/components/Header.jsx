import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Clapperboard, Sparkles } from 'lucide-react';
import { toggleSound, isSoundEnabled, playPopSound } from '../utils/soundEffects';

export default function Header({ onReset, currentStep, onOpenClipManager }) {
  const [muted, setMuted] = useState(!isSoundEnabled());

  const handleToggleSound = () => {
    const newState = !muted;
    toggleSound(!newState);
    setMuted(newState);
    if (!newState) {
      playPopSound();
    }
  };

  return (
    <header className="w-full bg-brand-yellow border-b-4 border-black px-4 py-3 sticky top-0 z-40 shadow-[0_4px_0px_0px_#000]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 bg-white rounded-2xl border-3 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#000] group-hover:rotate-6 transition-transform">
            👜
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-xl md:text-2xl tracking-tight text-black leading-none">
                WHAT'S IN MY BAG?
              </h1>
              <span className="hidden sm:inline-block bg-brand-pink text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_#000]">
                ROAST EDITION
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-800 tracking-wide">
              The Brutally Honest Personality Test
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-2">
          {/* Movie Clip Manager Button */}
          <button
            onClick={() => {
              playPopSound();
              onOpenClipManager();
            }}
            title="Manage reaction clips"
            className="flex items-center gap-1.5 bg-white hover:bg-brand-lime text-black font-black text-xs px-3 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Clapperboard className="w-4 h-4 text-purple-600" />
            <span className="hidden md:inline">Reaction Clips</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={muted ? "Unmute sound effects" : "Mute sound effects"}
            className={`p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              muted ? 'bg-gray-200 text-gray-500' : 'bg-brand-lime text-black'
            }`}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset / Start Over */}
          {currentStep > 0 && (
            <button
              onClick={() => {
                playPopSound();
                onReset();
              }}
              title="Start over"
              className="flex items-center gap-1 bg-brand-pink text-white font-black text-xs px-3 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-pink-600 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
