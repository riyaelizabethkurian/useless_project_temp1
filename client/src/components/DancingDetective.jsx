import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Search, Heart } from 'lucide-react';
import { playPopSound } from '../utils/soundEffects';

const FUNNY_DETECTIVE_THOUGHTS = [
  "Tracking your thermal paper receipts... 🕺",
  "Dancing on your lack of self-control! 🕵️",
  "I detect 0% chance of innocence! 🔍",
  "Magnifying glass says: Highly Guilty! 🔎",
  "Doing the forensic tango! 💃",
  "Your bag is a crime against humanity! 🚨",
  "Grooving through your expired medicine! 💊",
  "Look at these moves, suspect! 🕶️"
];

export default function DancingDetective({ currentStep }) {
  const [thoughtIndex, setThoughtIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % FUNNY_DETECTIVE_THOUGHTS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handlePoke = () => {
    playPopSound();
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 800);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble */}
      <div className="mb-2 bg-white border-3 border-black rounded-2xl px-3.5 py-1.5 shadow-[4px_4px_0px_0px_#000] text-xs font-black text-black pointer-events-auto transition-all animate-bounce-slight max-w-[200px] text-center">
        <span className="text-brand-pink mr-1">🕵️:</span>
        <span>{FUNNY_DETECTIVE_THOUGHTS[thoughtIndex]}</span>
      </div>

      {/* Dancing Detective Character Card */}
      <div 
        onClick={handlePoke}
        title="Click to make the detective spin!"
        className={`pointer-events-auto cursor-pointer p-3 bg-brand-yellow border-3 border-black rounded-3xl shadow-[5px_5px_0px_0px_#000] flex items-center gap-2 transition-transform duration-200 ${
          isSpinning ? 'rotate-[360deg] scale-125' : 'hover:scale-105 active:scale-95'
        }`}
      >
        {/* Animated Detective Rig */}
        <div className="relative w-16 h-20 flex flex-col items-center justify-center animate-detective-groove">
          {/* Floating musical note */}
          <div className="absolute -top-3 -right-2 text-purple-600 animate-bounce">
            <Music className="w-4 h-4" />
          </div>

          {/* Fedora Hat */}
          <div className="relative z-20 flex flex-col items-center -mb-2">
            <div className="w-9 h-3.5 bg-amber-900 border-2 border-black rounded-t-lg shadow-sm" />
            <div className="w-13 h-1.5 bg-amber-950 border-2 border-black rounded-full -mt-0.5" />
          </div>

          {/* Detective Head & Sunglasses */}
          <div className="relative z-10 w-9 h-8 bg-[#FFDFBA] border-2 border-black rounded-full flex flex-col items-center justify-center shadow-inner">
            {/* Cool Sunglasses */}
            <div className="flex items-center gap-0.5 -mt-1">
              <div className="w-3 h-2 bg-black rounded-sm border border-gray-700" />
              <div className="w-1 h-0.5 bg-black" />
              <div className="w-3 h-2 bg-black rounded-sm border border-gray-700" />
            </div>
            {/* Smirk */}
            <div className="w-3 h-1 border-b-2 border-black rounded-full mt-0.5" />
          </div>

          {/* Trench Coat Body */}
          <div className="relative z-10 w-11 h-8 bg-amber-700 border-2 border-black rounded-t-md flex items-center justify-center -mt-1 shadow-sm">
            {/* Belt */}
            <div className="w-full h-1.5 bg-black border-y border-amber-900 absolute bottom-1 flex items-center justify-center">
              <div className="w-2.5 h-2 bg-brand-yellow border border-black rounded-xs" />
            </div>

            {/* Left Arm swinging magnifying glass */}
            <div className="absolute -left-3 top-1 animate-magnifying-swing">
              <div className="w-4 h-1.5 bg-amber-800 border border-black rounded-full" />
              <Search className="w-4 h-4 text-black -ml-1.5 -mt-1 filter drop-shadow-sm" />
            </div>

            {/* Right Arm groove */}
            <div className="absolute -right-2.5 top-2 w-3.5 h-1.5 bg-amber-800 border border-black rounded-full rotate-45" />
          </div>

          {/* Dancing Legs */}
          <div className="flex gap-2 -mt-0.5 animate-detective-legs">
            <div className="w-2.5 h-4 bg-gray-900 border border-black rounded-b-xs" />
            <div className="w-2.5 h-4 bg-gray-900 border border-black rounded-b-xs" />
          </div>
        </div>

        {/* Small badge */}
        <div className="flex flex-col">
          <span className="badge-brutal bg-black text-brand-lime text-[9px] py-0.5 px-2">
            GROOVY DETECTIVE
          </span>
          <span className="text-[10px] font-black text-gray-800 mt-0.5">
            Tap to Spin 🕺
          </span>
        </div>
      </div>
    </div>
  );
}
