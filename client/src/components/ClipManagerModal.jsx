import React, { useState, useEffect } from 'react';
import { X, Clapperboard, FolderPlus, Film, Play, Check, ExternalLink } from 'lucide-react';
import { playPopSound } from '../utils/soundEffects';

export default function ClipManagerModal({ isOpen, onClose }) {
  const [clips, setClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/clips')
        .then(res => res.json())
        .then(data => {
          setClips(data.clips || []);
          if (data.clips && data.clips.length > 0) {
            setSelectedClip(data.clips[0]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load clips registry:", err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FFFDF7] w-full max-w-3xl rounded-3xl border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-brand-pink text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-pink-600 active:translate-x-0.5 active:translate-y-0.5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-yellow border-3 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#000]">
            🎬
          </div>
          <div>
            <h3 className="text-2xl font-black text-black">
              Movie Reaction Clips System
            </h3>
            <p className="text-xs font-bold text-gray-600">
              Easily connect your own short movie clips to personality archetypes
            </p>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-brand-lime border-3 border-black rounded-2xl p-4 mb-6 shadow-[3px_3px_0px_0px_#000]">
          <h4 className="font-black text-sm uppercase tracking-wide text-black flex items-center gap-2 mb-1.5">
            <FolderPlus className="w-4 h-4" />
            How to add or replace clips:
          </h4>
          <ol className="text-xs font-bold text-gray-900 space-y-1.5 list-decimal list-inside">
            <li>
              Drop your <code className="bg-white px-1.5 py-0.5 rounded border border-black font-mono">.mp4</code> or <code className="bg-white px-1.5 py-0.5 rounded border border-black font-mono">.webm</code> video files into the <code className="bg-white px-1.5 py-0.5 rounded border border-black font-mono">client/public/clips/</code> folder.
            </li>
            <li>
              Match the filename with the categories below (e.g. <code className="bg-white px-1.5 py-0.5 rounded border border-black font-mono">corporate.mp4</code> or <code className="bg-white px-1.5 py-0.5 rounded border border-black font-mono">relocating.mp4</code>).
            </li>
            <li>
              When a user's roast matches that personality category, your custom video clip will automatically play on the result screen!
            </li>
          </ol>
        </div>

        {/* Categories List */}
        <div className="mb-6">
          <h4 className="font-black text-xs uppercase tracking-wider text-gray-500 mb-3">
            Registered Categories & Filename Mappings:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clips.map((clip) => {
              const isSelected = selectedClip?.id === clip.id;
              return (
                <div
                  key={clip.id}
                  onClick={() => {
                    playPopSound();
                    setSelectedClip(clip);
                  }}
                  className={`p-3.5 rounded-2xl border-2 border-black cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-yellow shadow-[4px_4px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_#000]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-sm text-black">{clip.title}</span>
                    <span className="badge-brutal bg-black text-brand-lime text-[10px]">
                      {clip.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-brand-pink mb-1">
                    File: {clip.filename}
                  </div>
                  <div className="text-xs font-semibold text-gray-600 italic">
                    "{clip.quote}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Clip Preview Drawer */}
        {selectedClip && (
          <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000]">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-black text-xs uppercase tracking-wider text-gray-500">
                Category Preview: {selectedClip.category}
              </h5>
              <span className="text-xs font-bold text-gray-700">
                Movie: {selectedClip.movie}
              </span>
            </div>

            <div className="aspect-video w-full rounded-xl bg-black overflow-hidden border-2 border-black relative flex items-center justify-center">
              <video
                key={selectedClip.filename}
                src={`/clips/${selectedClip.filename}`}
                controls
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="p-4 text-center text-white">
                <p className="font-black text-base text-brand-lime mb-1">
                  "{selectedClip.quote}"
                </p>
                <p className="text-xs text-gray-300">
                  Target file path: <code className="text-brand-yellow font-mono">public/clips/{selectedClip.filename}</code>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="btn-brutal bg-brand-yellow text-black text-sm px-6 py-2.5"
          >
            Got It, Looks Awesome!
          </button>
        </div>
      </div>
    </div>
  );
}
