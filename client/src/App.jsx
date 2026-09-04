import React, { useState } from 'react';
import Header from './components/Header';
import Stepper from './components/Stepper';
import ParticipantStep from './components/ParticipantStep';
import PreferenceStep from './components/PreferenceStep';
import BagTypeStep from './components/BagTypeStep';
import ContentsStep from './components/ContentsStep';
import LoadingScreen from './components/LoadingScreen';
import ResultCard from './components/ResultCard';
import ClipManagerModal from './components/ClipManagerModal';
import DancingDetective from './components/DancingDetective';
import { PREFERENCES } from './data/preferences';
import { BAG_TYPES } from './data/bagTypes';
import { stopMovieAudio } from './utils/soundEffects';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [participantName, setParticipantName] = useState('');
  const [participantClass, setParticipantClass] = useState('');
  const [participantPhoto, setPhoto] = useState(null);

  // Initialize with no pre-selected options so the user starts fresh
  const [selectedPreference, setSelectedPreference] = useState(null);
  const [selectedBag, setSelectedBag] = useState(null);
  const [selectedContents, setSelectedContents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [roastData, setRoastData] = useState(null);
  const [isClipManagerOpen, setIsClipManagerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Content toggle handlers
  const handleToggleContent = (itemId) => {
    setSelectedContents(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleRemoveContent = (itemId) => {
    setSelectedContents(prev => prev.filter(id => id !== itemId));
  };

  // Trigger analysis
  const handleAnalyze = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    // Ensure at least 2.4s of funny scanning animation for dramatic comedic timing
    const minWait = new Promise(res => setTimeout(res, 2400));

    try {
      const fetchPromise = fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          participantName: participantName || "Anonymous Suspect",
          participantClass: participantClass || "Unspecified",
          genderPreference: selectedPreference?.label || "Casual Chaos",
          bagType: selectedBag?.id || "backpack",
          selectedContents
        })
      }).then(res => res.json());

      const [_, responseData] = await Promise.all([minWait, fetchPromise]);

      if (responseData.success && responseData.data) {
        setRoastData(responseData.data);
        setCurrentStep(4); // Result / Report Card Step
      } else {
        throw new Error(responseData.error || "Failed to generate diagnosis");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setErrorMessage("Couldn't connect to server, but we know your bag is a disaster anyway!");
      setRoastData({
        personalityName: "Dashamoolam Damu (ദശമൂലം ദാമു)",
        characterMovie: "Chattambinadu",
        famousDialogue: "Enthaada mwone jaada aano? Njan aaraannu ninakkariyilla!",
        dialogueMalayalam: "എന്താടാ മോനേ ജാഡയാണോ? ഞാൻ ആരാണ് എന്ന് നിനക്കറിയില്ലേ?!",
        audioFile: "/audio/damu.m4a",
        roastTitle: selectedBag?.roast || "Respectfully… what happened?",
        roastParagraph: "Your bag is a black hole of deferred responsibilities, ancient receipts, and pure entropy. Science cannot explain how you survive each day.",
        psychologicalBreakdown: "You carry enough emergency supplies for an alien invasion, yet you lack basic administrative stability.",
        verdict: "High Hazard Class IV",
        scores: {
          bp: "170/115 mmHg (Dangerously High)",
          stressLevel: "99.2% (Critical Overload)",
          stupidity: "98.7% (Weaponized)",
          lackOf: "Lack of Common Sense & Boundaries",
          chaosLevel: "99%",
          survivalOdds: "3%"
        }
      });
      setCurrentStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete reset when someone clicks Try Again or Start Over:
  // Wipes all participant details, photo, and previous selections across all steps
  const handleReset = () => {
    stopMovieAudio();
    setCurrentStep(0);
    setParticipantName('');
    setParticipantClass('');
    setPhoto(null);
    setSelectedPreference(null);
    setSelectedBag(null);
    setSelectedContents([]);
    setRoastData(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF9EA] bg-grid-pattern text-[#121212] flex flex-col font-sans selection:bg-brand-pink selection:text-white relative">
      {/* Sticky Header */}
      <Header
        currentStep={currentStep}
        onReset={handleReset}
        onOpenClipManager={() => setIsClipManagerOpen(true)}
      />

      {/* Progress Stepper (visible on steps 0, 1, 2, 3) */}
      {!isLoading && currentStep < 4 && (
        <Stepper
          currentStep={currentStep}
          onJumpStep={(stepIdx) => setCurrentStep(stepIdx)}
        />
      )}

      {/* Main Quiz Flow */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {isLoading ? (
          <LoadingScreen
            selectedBag={selectedBag}
            selectedContents={selectedContents}
          />
        ) : currentStep === 0 ? (
          /* Step 0: Name, Class & Webcam Mugshot */
          <ParticipantStep
            name={participantName}
            setName={setParticipantName}
            participantClass={participantClass}
            setParticipantClass={setParticipantClass}
            photo={participantPhoto}
            setPhoto={setPhoto}
            onNext={() => setCurrentStep(1)}
          />
        ) : currentStep === 1 ? (
          /* Step 1: Persona Selection */
          <PreferenceStep
            selectedPreference={selectedPreference}
            onSelectPreference={setSelectedPreference}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        ) : currentStep === 2 ? (
          /* Step 2: Bag Type Selection */
          <BagTypeStep
            selectedBag={selectedBag}
            onSelectBag={setSelectedBag}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        ) : currentStep === 3 ? (
          /* Step 3: Bag Contents Packer */
          <ContentsStep
            selectedBag={selectedBag}
            selectedContents={selectedContents}
            onToggleContent={handleToggleContent}
            onRemoveContent={handleRemoveContent}
            onAnalyze={handleAnalyze}
            onBack={() => setCurrentStep(2)}
          />
        ) : currentStep === 4 && roastData ? (
          /* Step 4: Final Dossier Report Card */
          <ResultCard
            participantName={participantName}
            participantClass={participantClass}
            participantPhoto={participantPhoto}
            roastData={roastData}
            selectedBag={selectedBag}
            selectedContents={selectedContents}
            selectedPreference={selectedPreference}
            onTryAgain={handleReset}
            onOpenClipManager={() => setIsClipManagerOpen(true)}
          />
        ) : null}
      </main>

      {/* The Dancing Detective Companion */}
      <DancingDetective currentStep={currentStep} />

      {/* Footer */}
      <footer className="w-full border-t-3 border-black bg-white py-4 px-4 text-center text-xs font-bold text-gray-700 shadow-[0_-3px_0px_0px_#000]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>👜 WHAT'S IN MY BAG?</span>
            <span>&bull;</span>
            <span>Built with React + Node.js</span>
          </div>
          <p className="text-gray-500 text-[11px]">
            Official Suspect Bag Inspection Unit &bull; Dancing Detective On Duty 🕺🕵️
          </p>
        </div>
      </footer>

      {/* Clip Manager / Replacement Guide Modal */}
      <ClipManagerModal
        isOpen={isClipManagerOpen}
        onClose={() => setIsClipManagerOpen(false)}
      />
    </div>
  );
}
