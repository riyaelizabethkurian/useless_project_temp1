import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, ArrowRight, User, GraduationCap, CheckCircle2, AlertCircle, Sparkles, Upload } from 'lucide-react';
import { playPopSound, playWhooshSound } from '../utils/soundEffects';

export default function ParticipantStep({
  name,
  setName,
  participantClass,
  setParticipantClass,
  photo,
  setPhoto,
  onNext
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  // Initialize webcam
  const startCamera = async () => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Webcam access error:", err);
      setCameraError("Camera access was not granted or is unavailable. You can upload a photo or proceed without one!");
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (!photo) {
      startCamera();
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [photo]);

  // Click Photo / Take Mugshot
  const handleSnapCountdown = () => {
    playPopSound();
    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        playPopSound();
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);
        capturePhoto();
      }
    }, 800);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    
    // Mirror horizontally for natural selfie look
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
    // Flash animation
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 400);

    setPhoto(dataUrl);
    playPopSound();

    // Stop camera stream to conserve power
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      setCameraActive(false);
    }
  };

  const handleRetake = () => {
    playPopSound();
    setPhoto(null);
    startCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhoto(uploadEvent.target.result);
        playPopSound();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    playWhooshSound();
    onNext();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block bg-brand-yellow px-4 py-1.5 rounded-full border-2 border-black font-black text-xs uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_#000]">
          Step 1: Suspect Identification Intake
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-2">
          Who's Under Investigation? 🕵️‍♂️
        </h2>
        <p className="text-sm md:text-base font-bold text-gray-700">
          Enter your name and class, then snap your official mugshot photo for your report card!
        </p>
      </div>

      <form onSubmit={handleProceed} className="space-y-6">
        {/* Name & Class Form Card */}
        <div className="card-brutal bg-white p-6 border-3 border-black">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-pink" />
              <span>Participant / Suspect Name <span className="text-red-600">*</span></span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan / Serial Receipt Collector"
              className="w-full px-4 py-3 rounded-xl border-2 border-black font-bold text-base focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-amber-50 shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          {/* Class Field */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-800 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-brand-purple" />
              <span>Class / Grade / Department</span>
            </label>
            <input
              type="text"
              value={participantClass}
              onChange={(e) => setParticipantClass(e.target.value)}
              placeholder="e.g. Grade 12-B / CSE Final Year / Overthinkers Section 1"
              className="w-full px-4 py-3 rounded-xl border-2 border-black font-bold text-base focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-amber-50 shadow-[2px_2px_0px_0px_#000]"
            />
          </div>
        </div>

        {/* Webcam Section */}
        <div className="card-brutal bg-[#FFFDF7] p-6 border-3 border-black relative overflow-hidden">
          {/* White camera flash animation */}
          {isFlashing && (
            <div className="absolute inset-0 bg-white z-50 animate-camera-flash pointer-events-none" />
          )}

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-brand-pink" />
              <h3 className="font-black text-base md:text-lg text-black">
                Mugshot Camera Intake
              </h3>
            </div>
            {photo ? (
              <span className="badge-brutal bg-brand-lime text-black text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                MUGSHOT CAPTURED
              </span>
            ) : (
              <span className="badge-brutal bg-black text-brand-yellow text-[10px]">
                LIVE WEBCAM
              </span>
            )}
          </div>

          {/* Camera / Photo Display Container */}
          <div className="relative aspect-[4/3] w-full max-w-md mx-auto bg-black rounded-2xl border-3 border-black overflow-hidden shadow-[4px_4px_0px_0px_#000] flex items-center justify-center">
            {photo ? (
              /* Photo Display */
              <div className="relative w-full h-full">
                <img
                  src={photo}
                  alt="Captured Mugshot"
                  className="w-full h-full object-cover"
                />
                {/* Police Lineup Overlay */}
                <div className="absolute inset-0 border-4 border-black/30 pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-red-600 text-white font-black text-[11px] px-2 py-0.5 rounded border border-black rotate-[-3deg] shadow-[2px_2px_0px_0px_#000]">
                      EVIDENCE #849
                    </span>
                    <span className="bg-black/70 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <div className="bg-black/75 backdrop-blur-xs text-white p-2 rounded text-center">
                    <div className="font-black text-xs uppercase tracking-wider text-brand-yellow">
                      SUSPECT: {name || "UNIDENTIFIED"}
                    </div>
                    {participantClass && (
                      <div className="text-[10px] font-bold text-gray-300">
                        CLASS: {participantClass}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : cameraActive ? (
              /* Live Webcam Viewfinder */
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                {/* Target crosshair */}
                <div className="absolute inset-8 border-2 border-dashed border-brand-yellow/60 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="w-12 h-12 border border-brand-pink/60 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-pink rounded-full" />
                  </div>
                </div>

                {/* Countdown Overlay */}
                {countdown !== null && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
                    <span className="text-7xl font-black text-brand-yellow animate-ping">
                      {countdown}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              /* Camera Unavailable / Blocked View */
              <div className="p-6 text-center text-white flex flex-col items-center justify-center">
                <AlertCircle className="w-8 h-8 text-brand-yellow mb-2" />
                <p className="text-xs font-bold text-gray-300 mb-3 max-w-xs">
                  {cameraError || "Webcam is starting or was disabled. You can upload a photo or snap one now!"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="btn-brutal bg-brand-yellow text-black text-xs py-2 px-3"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Webcam Again
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {photo ? (
              <button
                type="button"
                onClick={handleRetake}
                className="btn-brutal bg-white hover:bg-gray-100 text-black text-sm px-5 py-2.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Photo</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSnapCountdown}
                  disabled={!cameraActive || countdown !== null}
                  className={`btn-brutal text-sm px-6 py-3 ${
                    cameraActive && countdown === null
                      ? 'bg-brand-pink hover:bg-pink-600 text-white cursor-pointer shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>{countdown !== null ? `Snapping in ${countdown}...` : '📸 Snap Mugshot Photo'}</span>
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-brutal bg-white hover:bg-gray-100 text-black text-xs px-4 py-3"
                  title="Upload a photo from your device"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Picture</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={!name.trim()}
            className={`btn-brutal text-lg px-8 py-4 ${
              name.trim()
                ? 'bg-brand-lime hover:bg-lime-400 text-black cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Proceed to Persona Selection</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
