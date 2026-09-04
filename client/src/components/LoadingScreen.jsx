import React, { useState, useEffect } from 'react';
import { Scan, Radio, Sparkles, Flame } from 'lucide-react';
import { playScannerBeep } from '../utils/soundEffects';

const FUNNY_LOGS = [
  "Interrogating your 47 crinkled receipts...",
  "Running forensic analysis on mysterious cable...",
  "Questioning your life choices with FBI behavioral unit...",
  "Calculating emotional baggage in metric tons...",
  "Testing which of your 9 pens has 0.1% ink remaining...",
  "Analyzing 3-year-old mystery pill stuck at the bottom...",
  "Consulting world-renowned bag psychologists...",
  "Converting loose change into blunt weapon defense rating...",
  "Generating a roast hot enough to melt titanium..."
];

export default function LoadingScreen({ selectedBag, selectedContents }) {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    // Play scanner beep
    playScannerBeep();

    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % FUNNY_LOGS.length);
      playScannerBeep();
    }, 1200);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return prev;
        return prev + Math.floor(Math.random() * 14) + 6;
      });
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
      {/* Scanner Box */}
      <div className="relative w-64 h-64 bg-black rounded-3xl border-4 border-black p-6 shadow-[8px_8px_0px_0px_#FFE600] flex flex-col items-center justify-center overflow-hidden mb-8">
        {/* Animated Scan Line */}
        <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-brand-lime to-transparent shadow-[0_0_15px_#CCFF00] animate-scanline z-20" />

        {/* Radar concentric rings */}
        <div className="absolute inset-4 rounded-2xl border border-brand-lime/20 animate-pulse pointer-events-none" />
        <div className="absolute inset-10 rounded-2xl border border-brand-lime/30 pointer-events-none" />

        {/* Bag Icon inside scanner */}
        <div className="text-7xl filter drop-shadow-[0_0_12px_rgba(204,255,0,0.6)] animate-bounce z-10">
          {selectedBag?.emoji || "👜"}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-bold text-brand-lime/80 z-10">
          <span>X-RAY: ACTIVE</span>
          <span>HAZARD: 99.4%</span>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-black text-black mb-3">
        INTERROGATING YOUR BAG...
      </h2>

      {/* Progress bar */}
      <div className="w-full max-w-md bg-white rounded-full border-3 border-black h-7 p-1 shadow-[3px_3px_0px_0px_#000] mb-4">
        <div 
          className="h-full bg-brand-pink rounded-full transition-all duration-300 border border-black"
          style={{ width: `${Math.min(progress, 98)}%` }}
        />
      </div>

      {/* Dynamic Log Ticker */}
      <div className="bg-white border-2 border-black rounded-xl px-4 py-2 font-mono font-bold text-sm text-gray-800 shadow-[2px_2px_0px_0px_#000] min-h-[42px] flex items-center justify-center">
        <span className="text-brand-pink mr-2">▶</span>
        <span>{FUNNY_LOGS[currentLogIndex]}</span>
      </div>
    </div>
  );
}
