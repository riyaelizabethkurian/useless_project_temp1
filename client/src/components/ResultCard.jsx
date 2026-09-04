import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Share2, 
  Download, 
  RotateCcw, 
  Copy, 
  Check, 
  Flame, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  AlertTriangle, 
  Brain,
  Skull,
  Clapperboard,
  User,
  GraduationCap,
  Camera,
  MessageSquareQuote,
  Volume2,
  VolumeX,
  Radio,
  Film,
  Play,
  Pause
} from 'lucide-react';
import { BAG_CONTENTS } from '../data/bagContents';
import { copyRoastText, downloadCardImage, shareResultNative } from '../utils/shareHelper';
import { playFanfareSound, playPopSound, playMovieAudio, stopMovieAudio } from '../utils/soundEffects';

export default function ResultCard({
  participantName,
  participantClass,
  participantPhoto,
  roastData,
  selectedBag,
  selectedContents,
  selectedPreference,
  onTryAgain,
  onOpenClipManager
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef(null);

  // Exact movie audio file path
  const movieAudioPath = roastData?.audioFile || (roastData?.characterId ? `/audio/${roastData.characterId}.m4a` : '/audio/damu.m4a');

  useEffect(() => {
    playFanfareSound();
    try {
      confetti({
        particleCount: 95,
        spread: 85,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Automatically trigger the authentic Malayalam movie dialogue audio from the film!
    if (movieAudioPath) {
      const audio = playMovieAudio(
        movieAudioPath,
        () => setIsPlayingAudio(false),
        (err) => {
          console.warn("Autoplay needs click:", err);
          setIsPlayingAudio(false);
          setAutoplayBlocked(true);
        }
      );
      if (audio) {
        audioRef.current = audio;
        setIsPlayingAudio(true);
        setAutoplayBlocked(false);
      }
    }

    return () => {
      stopMovieAudio();
    };
  }, [movieAudioPath]);

  const toggleDialogueAudio = () => {
    playPopSound();
    if (isPlayingAudio) {
      stopMovieAudio();
      setIsPlayingAudio(false);
    } else {
      setAutoplayBlocked(false);
      const audio = playMovieAudio(
        movieAudioPath,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
      if (audio) {
        audioRef.current = audio;
        setIsPlayingAudio(true);
      }
    }
  };

  const handleCopy = async () => {
    playPopSound();
    const ok = await copyRoastText(roastData, selectedBag, selectedContents, participantName, participantClass);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = async () => {
    playPopSound();
    setDownloading(true);
    await downloadCardImage('roast-result-card');
    setDownloading(false);
  };

  const handleNativeShare = async () => {
    playPopSound();
    await shareResultNative(roastData, participantName);
  };

  const packedItems = selectedContents
    .map(id => BAG_CONTENTS.find(i => i.id === id))
    .filter(Boolean);

  const scores = roastData.scores || {
    bp: "165/110 mmHg (Dangerously High)",
    stressLevel: "99.4% (Vibrating at 50Hz)",
    stupidity: "98.9% (Weaponized Incompetence)",
    lackOf: "Lack of Common Sense & Boundaries",
    chaosLevel: "94%",
    survivalOdds: "4%"
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Result Card Export Container */}
      <div 
        id="roast-result-card"
        className="card-brutal p-6 md:p-8 bg-[#FFFDF7] border-4 border-black mb-8 relative overflow-hidden"
      >
        {/* Police Dossier Tape Header */}
        <div className="bg-black text-white p-3 rounded-2xl border-2 border-black flex flex-wrap items-center justify-between gap-3 mb-6 shadow-[3px_3px_0px_0px_#CCFF00]">
          <div className="flex items-center gap-3">
            <div className="bg-brand-pink text-white text-[10px] font-black uppercase px-2.5 py-1 rounded border border-white rotate-[-2deg]">
              OFFICIAL POLICE DOSSIER
            </div>
            <div className="text-xs md:text-sm font-black text-brand-lime truncate">
              CASE FILE #{Math.abs((participantName || '404').split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0) % 9000) + 1000}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-gray-300">
            <span>STATUS: INDICTED</span>
            <span>VERDICT: {roastData.verdict || "Felony Disorder"}</span>
          </div>
        </div>

        {/* Suspect Profile Grid (Mugshot Photo + Name & Class) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 border-b-3 border-dashed border-black/20 pb-6">
          {/* Polaroid Mugshot Photo */}
          <div className="relative shrink-0">
            <div className="w-36 sm:w-44 bg-white p-2.5 pb-4 rounded-xl border-3 border-black shadow-[5px_5px_0px_0px_#000] rotate-[-2deg] transition-transform hover:rotate-0">
              {/* Tape on top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-200/80 border border-black/20 rotate-2" />

              <div className="aspect-[4/3] w-full bg-black rounded-lg overflow-hidden border-2 border-black relative flex items-center justify-center">
                {participantPhoto ? (
                  <img
                    src={participantPhoto}
                    alt="Suspect Mugshot"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <User className="w-10 h-10 text-gray-500 mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-gray-400">NO PHOTO LOGGED</span>
                  </div>
                )}

                {/* Stamped Badge */}
                <div className="absolute bottom-1 right-1 bg-red-600 text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded border border-black rotate-[-6deg] shadow-sm">
                  MUGSHOT
                </div>
              </div>

              <div className="text-center mt-2">
                <div className="font-mono text-[10px] font-black uppercase text-gray-700 tracking-wider">
                  DEPT. OF DISASTER
                </div>
              </div>
            </div>
          </div>

          {/* Suspect Identity Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-block bg-brand-yellow px-3 py-1 rounded-full border-2 border-black font-black text-xs uppercase mb-2 shadow-[2px_2px_0px_0px_#000]">
              Identified Suspect
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-none mb-2">
              {participantName || "Anonymous Offender"}
            </h1>
            
            {participantClass && (
              <div className="inline-flex items-center gap-1.5 bg-black text-brand-lime font-black text-xs px-3 py-1 rounded-lg border border-black shadow-[2px_2px_0px_0px_#000] mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Class / Unit: {participantClass}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mt-1">
              <span className="badge-brutal bg-white text-gray-800 text-[11px]">
                {selectedPreference?.label || "Chaos Archetype"}
              </span>
              <span className="badge-brutal bg-brand-lime text-black text-[11px]">
                Carrier of: {selectedBag?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosed Malayalam Movie Character Personality */}
        <div className="mb-6 bg-[#FAF5FF] border-3 border-purple-950 p-5 rounded-3xl shadow-[5px_5px_0px_0px_#8B5CF6]">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="badge-brutal bg-purple-900 text-white text-[10px] font-black uppercase">
              മലയാളം സിനിമാ കഥാപാത്രം &bull; MALAYALAM CHARACTER
            </span>
            {roastData.characterMovie && (
              <span className="badge-brutal bg-brand-yellow text-black text-[10px] font-black">
                <Film className="w-3 h-3 inline mr-1" />
                {roastData.characterMovie}
              </span>
            )}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-purple-950 tracking-tight leading-tight my-2">
            {roastData.personalityName}
          </h2>
          <p className="text-xs font-bold text-purple-800">
            Based on the evidence extracted from your bag, you have been convicted as this iconic Malayalam character!
          </p>
        </div>

        {/* Famous Malayalam Authentic Movie Audio Dialogue Player */}
        <div className="quote-hover mb-6 bg-brand-yellow border-3 border-black p-5 rounded-3xl shadow-[6px_6px_0px_0px_#000] relative">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className={`w-3.5 h-3.5 rounded-full ${isPlayingAudio ? 'bg-red-600 animate-ping' : 'bg-gray-400'}`} />
              <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-black" />
                <span>Original Movie Dialogue Audio (സിനിമാ ശബ്ദം)</span>
              </span>
            </div>

            {/* Audio Toggle / Replay Button */}
            <button
              onClick={toggleDialogueAudio}
              className={`btn-brutal text-xs px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-red-600 text-white shadow-[2px_2px_0px_0px_#000]' 
                  : 'bg-black text-brand-lime shadow-[2px_2px_0px_0px_#FF2A85] hover:bg-gray-900'
              }`}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlayingAudio ? 'Pause Movie Audio ⏸️' : 'Play Original Dialogue 🔊'}</span>
            </button>
          </div>

          {/* Autoplay prompt notification if browser blocked initial autoplay */}
          {autoplayBlocked && !isPlayingAudio && (
            <div 
              onClick={toggleDialogueAudio}
              className="mb-3 p-2.5 bg-black text-brand-yellow font-black text-xs rounded-xl border border-black cursor-pointer flex items-center justify-between animate-bounce"
            >
              <span>🔊 Tap here to hear the original movie audio dialogue by {roastData.personalityName}!</span>
              <span className="underline text-brand-lime">Click to Listen</span>
            </div>
          )}

          {/* Malayalam Script Dialogue */}
          {roastData.dialogueMalayalam && (
            <div className="text-xl md:text-2xl font-black text-black leading-snug mb-1 font-display">
              “{roastData.dialogueMalayalam}”
            </div>
          )}

          {/* Manglish Dialogue */}
          <div className="text-base md:text-lg font-extrabold text-gray-900 italic mb-2">
            “{roastData.famousDialogue}”
          </div>

          {/* Audio Equalizer Visualizer Bars */}
          <div className="flex items-center gap-1.5 pt-2 border-t-2 border-black/20 mt-2">
            {[40, 75, 30, 95, 60, 100, 45, 85, 55, 90, 35, 70, 50, 80, 65, 95].map((height, i) => (
              <div
                key={i}
                className={`w-1.5 bg-black rounded-full transition-all duration-200 ${
                  isPlayingAudio ? 'animate-pulse' : 'opacity-30'
                }`}
                style={{ height: `${isPlayingAudio ? (height * 0.26 + 6) : 6}px` }}
              />
            ))}
            <span className="text-[10px] font-mono font-bold text-gray-800 ml-2 uppercase">
              {isPlayingAudio ? '🔊 Original Film Audio Playing' : '▶️ Click Button to Play Character Audio'}
            </span>
          </div>
        </div>

        {/* Savage Roast Callout Box with Hover Quote Animation */}
        <div className="quote-hover bg-brand-pink text-white border-3 border-black rounded-2xl p-5 md:p-6 mb-6 shadow-[5px_5px_0px_0px_#000] relative">
          <div className="flex items-center gap-2 text-brand-yellow font-black text-sm uppercase tracking-wider mb-2">
            <Flame className="w-5 h-5 text-brand-yellow fill-current animate-bounce" />
            <span>The Brutal Truth</span>
          </div>
          <p className="text-lg md:text-xl font-black text-white italic leading-relaxed mb-3">
            “{roastData.roastTitle || roastData.roastParagraph}”
          </p>
          <p className="text-sm md:text-base font-bold text-pink-50 leading-relaxed">
            {roastData.roastParagraph}
          </p>
        </div>

        {/* Mock Psychological Breakdown with Hover Effect */}
        <div className="quote-hover bg-white border-2 border-black rounded-2xl p-4 mb-6 shadow-[3px_3px_0px_0px_#000]">
          <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wider text-gray-500 mb-1">
            <MessageSquareQuote className="w-3.5 h-3.5 text-brand-purple" />
            <span>Clinical Bag Psychology Notes:</span>
          </div>
          <p className="text-sm font-semibold text-gray-800 italic">
            "{roastData.psychologicalBreakdown || "Subject exhibits acute symptoms of chronic overconfidence masked by catastrophic administrative failure."}"
          </p>
        </div>

        {/* Funny Vitals & Disasters Grid: BP, Stress, Stupidity, Lack of, Chaos, Survival */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {/* Blood Pressure */}
          <div className="bg-red-50 border-2 border-black rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_0px_#000] transition-transform hover:scale-105">
            <div className="text-red-600 text-[11px] font-black uppercase flex items-center justify-center gap-1.5 mb-1">
              <Activity className="w-4 h-4" />
              <span>Blood Pressure (BP)</span>
            </div>
            <div className="text-lg md:text-xl font-black text-black">
              {scores.bp || "165/110 mmHg (Dangerously High)"}
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-orange-50 border-2 border-black rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_0px_#000] transition-transform hover:scale-105">
            <div className="text-orange-600 text-[11px] font-black uppercase flex items-center justify-center gap-1.5 mb-1">
              <Flame className="w-4 h-4" />
              <span>Stress Level</span>
            </div>
            <div className="text-lg md:text-xl font-black text-black">
              {scores.stressLevel || "99.4% (Vibrating at 50Hz)"}
            </div>
          </div>

          {/* Stupidity Score */}
          <div className="bg-purple-50 border-2 border-black rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_0px_#000] transition-transform hover:scale-105">
            <div className="text-purple-600 text-[11px] font-black uppercase flex items-center justify-center gap-1.5 mb-1">
              <Brain className="w-4 h-4" />
              <span>Stupidity Index</span>
            </div>
            <div className="text-lg md:text-xl font-black text-black">
              {scores.stupidity || "98.9% (Weaponized)"}
            </div>
          </div>

          {/* Lack of Something (Critical Deficiency) */}
          <div className="bg-amber-50 border-2 border-black rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_0px_#000] sm:col-span-2 lg:col-span-1 transition-transform hover:scale-105">
            <div className="text-amber-700 text-[11px] font-black uppercase flex items-center justify-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Critical Deficiency</span>
            </div>
            <div className="text-sm md:text-base font-black text-black">
              {scores.lackOf || "Lack of Common Sense & Boundaries"}
            </div>
          </div>

          {/* Chaos Level */}
          <div className="bg-yellow-50 border-2 border-black rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_0px_#000] transition-transform hover:scale-105">
            <div className="text-gray-800 text-[11px] font-black uppercase flex items-center justify-center gap-1.5 mb-1">
              <ShieldAlert className="w-4 h-4 text-brand-pink" />
              <span>Chaos Level</span>
            </div>
            <div className="text-lg md:text-xl font-black text-black">
              {scores.chaosLevel || "96%"}
            </div>
          </div>

          {/* Survival Odds */}
          <div className="bg-lime-50 border-2 border-black rounded-2xl p-3.5 text-center shadow-[3px_3px_0px_0px_#000] transition-transform hover:scale-105">
            <div className="text-emerald-700 text-[11px] font-black uppercase flex items-center justify-center gap-1.5 mb-1">
              <Skull className="w-4 h-4" />
              <span>Survival Odds</span>
            </div>
            <div className="text-lg md:text-xl font-black text-black">
              {scores.survivalOdds || "4%"}
            </div>
          </div>
        </div>

        {/* Selected Bag & Items Visual Evidence */}
        <div className="border-t-2 border-dashed border-black/20 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-black text-xs uppercase tracking-wider text-gray-600">
              Evidence Logged ({packedItems.length} items from {selectedBag?.name}):
            </h4>
          </div>

          <div className="flex flex-wrap gap-2">
            {packedItems.map(item => (
              <div
                key={item.id}
                className="bg-white px-3 py-1.5 rounded-xl border-2 border-black font-black text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000]"
              >
                {item.emoji ? <span>{item.emoji}</span> : null}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {/* Copy Text */}
        <button
          onClick={handleCopy}
          className="btn-brutal bg-white hover:bg-gray-100 text-black text-sm px-5 py-3.5"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Dossier!' : 'Copy Roast Text'}</span>
        </button>

        {/* Download Result Card PNG */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-brutal bg-brand-yellow hover:bg-yellow-400 text-black text-sm px-5 py-3.5"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Exporting...' : 'Save Dossier Card (PNG)'}</span>
        </button>

        {/* Native Share on mobile */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            onClick={handleNativeShare}
            className="btn-brutal bg-brand-cyan hover:bg-cyan-300 text-black text-sm px-5 py-3.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        )}

        {/* Try Again */}
        <button
          onClick={onTryAgain}
          className="btn-brutal bg-brand-lime hover:bg-lime-400 text-black text-sm px-6 py-3.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Indict Someone Else (Try Again)</span>
        </button>
      </div>

      {/* Reaction Clips Helper Button */}
      <div className="text-center">
        <button
          onClick={() => {
            playPopSound();
            onOpenClipManager();
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors underline cursor-pointer"
        >
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Want to add or preview custom reaction videos? Open Clip Manager</span>
        </button>
      </div>
    </div>
  );
}
