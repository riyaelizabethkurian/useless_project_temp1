import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Film, AlertCircle, Sparkles } from 'lucide-react';
import { playPopSound } from '../utils/soundEffects';

export default function MovieClipPlayer({ clip, onOpenClipManager }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    setHasVideoError(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy might require muted play initially
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [clip]);

  const handleReplay = () => {
    playPopSound();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTogglePlay = () => {
    playPopSound();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleToggleMute = () => {
    playPopSound();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!clip) return null;

  const videoSrc = clip.filename ? `/clips/${clip.filename}` : null;

  return (
    <div className="w-full bg-black rounded-3xl border-3 border-black overflow-hidden shadow-[6px_6px_0px_0px_#000]">
      {/* Header ribbon */}
      <div className="bg-brand-yellow px-4 py-2.5 border-b-3 border-black flex items-center justify-between text-black">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-black" />
          <span className="font-black text-xs uppercase tracking-wider">
            Matching Movie Reaction: {clip.title}
          </span>
        </div>
        <span className="badge-brutal bg-black text-brand-lime text-[10px]">
          {clip.movie || "Classic Cinema"}
        </span>
      </div>

      {/* Video or Fallback Area (NO external image) */}
      <div className="relative w-full aspect-video bg-neutral-900 flex items-center justify-center overflow-hidden">
        {!hasVideoError && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            onError={() => {
              console.warn(`Video file ${videoSrc} not found, displaying animated reaction fallback.`);
              setHasVideoError(true);
            }}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Sleek Graphic Movie Reaction Placeholder without images */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#180a2a] via-black to-[#0d1b2a]">
            {/* Ambient geometric grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-md bg-black/90 backdrop-blur-md p-5 rounded-2xl border-2 border-brand-yellow shadow-[4px_4px_0px_0px_#FFE600]">
              <div className="text-3xl mb-2">🎬</div>
              <h4 className="text-lg font-black text-white mb-1">
                "{clip.quote}"
              </h4>
              <p className="text-xs font-bold text-brand-lime mb-3">
                {clip.movie} &bull; Category: {clip.category}
              </p>
              <div className="text-[11px] font-semibold text-gray-300 bg-white/10 rounded-lg p-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>
                  Drop <code className="text-brand-lime font-mono">{clip.filename}</code> into <code className="text-brand-lime font-mono">public/clips/</code> to play your custom clip!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Video Overlay Quote */}
        {!hasVideoError && (
          <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl border border-white/20 inline-block font-black text-xs tracking-wide">
              “{clip.quote}”
            </div>
          </div>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="bg-black p-3 flex items-center justify-between gap-2 border-t-2 border-white/10 no-export">
        <div className="flex items-center gap-2">
          {!hasVideoError && (
            <button
              onClick={handleTogglePlay}
              className="p-2 rounded-xl bg-white hover:bg-gray-200 text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_#CCFF00] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          )}

          <button
            onClick={handleReplay}
            className="p-2 rounded-xl bg-brand-pink hover:bg-pink-600 text-white font-black text-xs border border-black shadow-[2px_2px_0px_0px_#FFE600] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Clip</span>
          </button>

          {!hasVideoError && (
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white border border-white/20 text-xs"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
            </button>
          )}
        </div>

        <button
          onClick={onOpenClipManager}
          className="text-[11px] font-bold text-gray-400 hover:text-brand-lime underline cursor-pointer"
        >
          Configure Clips ⚙️
        </button>
      </div>
    </div>
  );
}
