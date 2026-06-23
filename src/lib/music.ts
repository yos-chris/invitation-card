/**
 * Background music engine — plays audio from a YouTube video via the hidden
 * IFrame Player API. Starts only after user interaction (language selection)
 * to respect browser autoplay policies. Loops continuously.
 *
 * Fallback: upload an mp3 version of the selected music and set
 * BACKGROUND_MUSIC_URL below if YouTube background playback is blocked.
 */

// YouTube video ID for the background music.
const YOUTUBE_VIDEO_ID = "Tqa2d8I82Fc";

// Fallback: upload mp3 version of selected music if YouTube background
// playback is blocked. Set this to a /audio/*.mp3 path to use an <audio>
// element instead of the YouTube IFrame.
const BACKGROUND_MUSIC_URL = ""; // e.g. "/music/background.mp3"

// Minimal YT IFrame API type
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  setLoop: (loop: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (s: number, allow: boolean) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoading = false;
let apiReady = false;

function loadYouTubeAPI(): Promise<void> {
  if (apiReady) return Promise.resolve();
  return new Promise((resolve) => {
    if (typeof window === "undefined") return;
    if (window.YT && window.YT.Player) {
      apiReady = true;
      resolve();
      return;
    }
    // Set the ready callback before injecting the script
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      apiReady = true;
      prev?.();
      resolve();
    };
    if (!apiLoading) {
      apiLoading = true;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    }
  });
}

export class AmbientMusic {
  private player: YTPlayer | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private container: HTMLDivElement | null = null;
  private _isPlaying = false;
  private ready = false;
  private _volume = 60;

  get isPlaying() {
    return this._isPlaying;
  }

  get volume() {
    return this._volume;
  }

  setVolume(v: number) {
    this._volume = v;
    try {
      this.player?.setVolume(v);
      if (this.audioEl) this.audioEl.volume = v / 100;
    } catch {
      /* ignore */
    }
  }

  async start() {
    if (this._isPlaying) return;

    // Fallback to <audio> if a local file is configured
    if (BACKGROUND_MUSIC_URL) {
      if (!this.audioEl) {
        this.audioEl = new Audio(BACKGROUND_MUSIC_URL);
        this.audioEl.loop = true;
        this.audioEl.volume = this._volume / 100;
      }
      try {
        await this.audioEl.play();
        this._isPlaying = true;
      } catch {
        /* play blocked */
      }
      return;
    }

    // YouTube IFrame path
    try {
      await loadYouTubeAPI();
      if (!window.YT) return;

      if (!this.player) {
        // Hidden container — 1px, off-screen, pointer-events none
        this.container = document.createElement("div");
        this.container.style.cssText =
          "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;";
        const host = document.createElement("div");
        host.style.cssText = "width:1px;height:1px;";
        this.container.appendChild(host);
        document.body.appendChild(this.container);

        this.player = new window.YT.Player(host, {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID, // required for loop to work
          },
          events: {
            onReady: (e) => {
              this.ready = true;
              e.target.setVolume(this._volume);
              e.target.playVideo();
            },
            onStateChange: (e) => {
              // 0 = ended → restart to simulate loop
              if (e.data === 0) {
                e.target.seekTo(0, true);
                e.target.playVideo();
              }
            },
          },
        });
      } else if (this.ready) {
        this.player.playVideo();
      }
      this._isPlaying = true;
    } catch {
      /* YT API unavailable */
    }
  }

  stop() {
    this._isPlaying = false;
    try {
      this.player?.pauseVideo();
    } catch {
      /* ignore */
    }
    if (this.audioEl) {
      try {
        this.audioEl.pause();
      } catch {
        /* ignore */
      }
    }
  }
}

let engine: AmbientMusic | null = null;
export function getMusicEngine() {
  if (typeof window === "undefined") return null;
  if (!engine) engine = new AmbientMusic();
  return engine;
}
