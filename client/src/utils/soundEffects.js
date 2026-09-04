// Procedural Sound Effects & Authentic Malayalam Movie Dialogue Audio Player

let audioCtx = null;
let soundEnabled = true;
let currentMovieAudio = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(force) {
  if (typeof force === 'boolean') {
    soundEnabled = force;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (!soundEnabled) {
    stopMovieAudio();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
  return soundEnabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

// Bouncy pop sound for item selection
export function playPopSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {}
}

// Lower "unpop" sound for deselection
export function playDeselectSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;
    
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {}
}

// Transition whoosh / chime
export function playWhooshSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {}
}

// Scanner diagnostic beep
export function playScannerBeep() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    const now = ctx.currentTime;
    
    const randomFreq = 500 + Math.random() * 400;
    osc.frequency.setValueAtTime(randomFreq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch (e) {}
}

// Victory Fanfare when roast is revealed
export function playFanfareSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  } catch (e) {}
}

// Play authentic Malayalam movie character dialogue audio (original audio track from the film)
export function playMovieAudio(audioUrl, onEnd, onError) {
  if (!soundEnabled || !audioUrl) return null;
  
  try {
    if (currentMovieAudio) {
      currentMovieAudio.pause();
      currentMovieAudio.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    currentMovieAudio = audio;
    audio.volume = 1.0;

    audio.onended = () => {
      if (onEnd) onEnd();
    };

    audio.onerror = (e) => {
      console.warn("Audio file error:", e);
      if (onError) onError(e);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay was prevented by browser policy:", err);
        if (onError) onError(err);
      });
    }

    return audio;
  } catch (err) {
    console.warn("Error playing movie audio:", err);
    if (onError) onError(err);
    return null;
  }
}

export function stopMovieAudio() {
  if (currentMovieAudio) {
    currentMovieAudio.pause();
    currentMovieAudio.currentTime = 0;
  }
}
