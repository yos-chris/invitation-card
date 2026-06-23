/**
 * Ambient music engine using the Web Audio API.
 * Generates a slow, elegant evolving pad chord progression — no external
 * audio files required. Designed to feel like a premium cinematic underscore.
 */

type Chord = number[]; // frequencies in Hz

// Note frequencies (Hz)
const N = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0,
};

// Soft, warm chord progression (maj7 / add9 voicings) — Cmaj7 · Fmaj7 · Am7 · G
const PROGRESSION: Chord[] = [
  [N.C3, N.G3, N.E4, N.B4, N.E5],
  [N.F3, N.A3, N.F4, N.C5, N.E5],
  [N.A3, N.E4, N.A4, N.C5, N.E5],
  [N.G3, N.D4, N.G4, N.B4, N.D5],
];

const CHORD_DURATION = 9.0; // seconds per chord

export class AmbientMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: { osc: OscillatorNode; gain: GainNode }[] = [];
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private step = 0;
  private playing = false;
  private _volume = 0.16;

  get isPlaying() {
    return this.playing;
  }

  get volume() {
    return this._volume;
  }

  setVolume(v: number) {
    this._volume = v;
    if (this.master && this.ctx) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 0.6);
    }
  }

  async start() {
    if (this.playing) return;
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    this.ctx = new Ctor();
    if (this.ctx.state === "suspended") {
      try {
        await this.ctx.resume();
      } catch {
        /* ignore */
      }
    }

    this.master = this.ctx.createGain();
    this.master.gain.setValueAtTime(0, this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(
      this._volume,
      this.ctx.currentTime + 2.5,
    );

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(0.6, this.ctx.currentTime);

    // Slow LFO to gently open/close the filter for movement
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.06, this.ctx.currentTime);
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(520, this.ctx.currentTime);
    this.lfo.connect(this.lfoGain).connect(this.filter.frequency);
    this.lfo.start();

    this.filter.connect(this.master);
    this.master.connect(this.ctx.destination);

    this.playing = true;
    this.step = 0;
    this.scheduleChord();
  }

  private scheduleChord() {
    if (!this.ctx || !this.filter || !this.playing) return;
    const chord = PROGRESSION[this.step % PROGRESSION.length];
    const now = this.ctx.currentTime;

    chord.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = i === 0 ? "sine" : i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now);
      // subtle detune drift
      const detune = (Math.random() - 0.5) * 6;
      osc.detune.setValueAtTime(detune, now);

      const g = this.ctx!.createGain();
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.18 / chord.length + 0.04, now + 2.2);
      g.gain.linearRampToValueAtTime(0, now + CHORD_DURATION);

      osc.connect(g).connect(this.filter!);
      osc.start(now);
      osc.stop(now + CHORD_DURATION + 0.3);
      this.voices.push({ osc, gain: g });
    });

    // Cleanup ended voices
    this.voices = this.voices.filter((v) => {
      return v.osc.context.currentTime < now + CHORD_DURATION + 0.4;
    });

    this.step++;
    this.timer = setTimeout(() => this.scheduleChord(), CHORD_DURATION * 1000);
  }

  stop() {
    this.playing = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.master) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.linearRampToValueAtTime(0, now + 1.2);
    }
    setTimeout(() => {
      this.voices.forEach((v) => {
        try {
          v.osc.stop();
        } catch {
          /* already stopped */
        }
      });
      this.voices = [];
      try {
        this.lfo?.stop();
      } catch {
        /* ignore */
      }
      this.lfo = null;
      if (this.ctx && this.ctx.state !== "closed") {
        this.ctx.close().catch(() => {});
      }
      this.ctx = null;
    }, 1400);
  }
}

let engine: AmbientMusic | null = null;
export function getMusicEngine() {
  if (typeof window === "undefined") return null;
  if (!engine) engine = new AmbientMusic();
  return engine;
}
