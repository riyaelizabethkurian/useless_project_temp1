import React from 'react';
import { Camera, User, ShoppingBag, PackagePlus, Zap } from 'lucide-react';

const STEPS = [
  { label: "Intake", icon: Camera },
  { label: "Archetype", icon: User },
  { label: "Bag Type", icon: ShoppingBag },
  { label: "Pack Bag", icon: PackagePlus },
  { label: "Report", icon: Zap },
];

export default function Stepper({ currentStep, onJumpStep }) {
  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-2 bg-black rounded-full -z-0" />
        
        {STEPS.map((step, idx) => {
          const isCompleted = currentStep > idx;
          const isCurrent = currentStep === idx;
          const Icon = step.icon;

          return (
            <div 
              key={step.label} 
              className="flex flex-col items-center relative z-10 select-none cursor-pointer"
              onClick={() => {
                if (isCompleted && onJumpStep) {
                  onJumpStep(idx);
                }
              }}
            >
              <div 
                className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl border-3 border-black flex items-center justify-center font-black transition-all duration-200 ${
                  isCurrent 
                    ? 'bg-brand-yellow scale-110 shadow-[4px_4px_0px_0px_#000] rotate-[-3deg]' 
                    : isCompleted
                    ? 'bg-brand-lime shadow-[2px_2px_0px_0px_#000]'
                    : 'bg-white text-gray-400 shadow-[2px_2px_0px_0px_#000]'
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isCurrent ? 'text-black' : isCompleted ? 'text-black' : 'text-gray-400'}`} />
              </div>
              <span className={`text-[10px] md:text-xs mt-1.5 font-bold px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_0px_#000] ${
                isCurrent 
                  ? 'bg-black text-white' 
                  : isCompleted 
                  ? 'bg-brand-lime text-black' 
                  : 'bg-white text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
