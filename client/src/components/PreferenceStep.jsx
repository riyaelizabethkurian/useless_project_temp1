import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, MessageSquareQuote } from 'lucide-react';
import { PREFERENCES } from '../data/preferences';
import { playPopSound, playWhooshSound } from '../utils/soundEffects';

export default function PreferenceStep({ selectedPreference, onSelectPreference, onNext, onBack }) {
  const handleSelect = (pref) => {
    playPopSound();
    onSelectPreference(pref);
  };

  const handleProceed = () => {
    playWhooshSound();
    onNext();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Hero title */}
      <div className="text-center mb-8">
        <div className="inline-block bg-brand-yellow px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_#000]">
          Step 2: Choose Your Persona
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-3">
          Who is carrying this bag of secrets? 🕵️
        </h2>
        <p className="text-base md:text-lg font-bold text-gray-700 max-w-xl mx-auto">
          Hover over the quotes to read their confessions, then pick your daily archetype!
        </p>
      </div>

      {/* Grid of choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {PREFERENCES.map((pref) => {
          const isSelected = selectedPreference?.id === pref.id;
          return (
            <div
              key={pref.id}
              onClick={() => handleSelect(pref)}
              className={`option-card-sidelines group rounded-2xl cursor-pointer select-none flex flex-col justify-between p-5 ${
                isSelected
                  ? 'is-selected bg-brand-yellow shadow-[6px_6px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]'
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

              {isSelected && (
                <div className="absolute -top-3 -right-3 bg-black text-brand-lime font-black text-xs px-2.5 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-1 z-10">
                  <Sparkles className="w-3.5 h-3.5" />
                  SELECTED
                </div>
              )}

              <div>
                <div className="text-4xl mb-3">{pref.emoji}</div>
                <h3 className="font-black text-xl text-black leading-snug">
                  {pref.label}
                </h3>
                <div className="inline-block bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded-md mt-1 mb-3">
                  {pref.subtitle}
                </div>
              </div>

              {/* Interactive Hover Quote Box */}
              <div 
                className="quote-hover mt-2 p-3 bg-[#FFFDF0] hover:bg-white rounded-xl border-2 border-black/80 hover:border-black shadow-[2px_2px_0px_0px_#000] group"
                title="Hovered Quote!"
              >
                <div className="flex items-center gap-1 text-[10px] font-black uppercase text-gray-500 mb-0.5">
                  <MessageSquareQuote className="w-3 h-3 text-brand-pink" />
                  <span>Confession Quote:</span>
                </div>
                <p className="text-xs font-bold text-gray-900 italic">
                  "{pref.quote}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between max-w-xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="btn-brutal bg-white hover:bg-gray-100 text-black text-base px-6 py-3.5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Intake</span>
          </button>
        )}

        <button
          onClick={handleProceed}
          disabled={!selectedPreference}
          className={`btn-brutal text-lg px-8 py-3.5 ml-auto ${
            selectedPreference
              ? 'bg-brand-lime hover:bg-lime-400 text-black cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
          }`}
        >
          <span>Choose My Bag Type</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
