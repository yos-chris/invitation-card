/**
 * One-shot sound effects using the Web Audio API.
 * No external audio files. Designed to be subtle and elegant.
 */

let sharedCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    sharedCtx = new Ctor();
  }
  if (sharedCtx.state === "suspended") {
    sharedCtx.resume().catch(() => {});
  }
  return sharedCtx;
}

/**
 * Paper rustle — a short filtered-noise sweep, like an envelope flap opening.
 * Subtle, soft, ~0.5s.
 */
export function playPaperRustle() {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  // White noise buffer
  const dur = 0.55;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    // amplitude envelope: quick attack, slow decay
    const t = i / data.length;
    const env = Math.exp(-t * 4) * (1 - Math.exp(-t * 40));
    data[i] = (Math.random() * 2 - 1) * env * 0.5;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Bandpass filter to make it sound like paper (mid-high frequencies)
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(2200, now);
  bp.frequency.exponentialRampToValueAtTime(900, now + dur);
  bp.Q.setValueAtTime(0.8, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  noise.connect(bp).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + dur);
}

/**
 * Soft chime — a gentle two-note bell (like a premium notification).
 * Uses sine oscillators with a slow decay envelope.
 */
export function playChime() {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Two notes: E6 then A6 (a perfect fourth, warm and resolving)
  const notes = [
    { freq: 1318.51, start: 0, dur: 0.9 }, // E6
    { freq: 1760.0, start: 0.12, dur: 1.1 }, // A6
  ];

  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(n.freq, now + n.start);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now + n.start);
    gain.gain.exponentialRampToValueAtTime(0.12, now + n.start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + n.start + n.dur);

    // gentle lowpass for warmth
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(4000, now + n.start);

    osc.connect(lp).connect(gain).connect(ctx.destination);
    osc.start(now + n.start);
    osc.stop(now + n.start + n.dur + 0.1);
  });
}
