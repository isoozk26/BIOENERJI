// Web Audio API ile Saf 432 Hz / 436 Hz Meditatif Rezonans Üreteci
class MeditativeSoundPlayer {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private autoStopTimer: ReturnType<typeof setTimeout> | null = null;
  private hasAutoPlayed: boolean = false;

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.isPlaying));
  }

  public toggle(): boolean {
    if (this.autoStopTimer) {
      clearTimeout(this.autoStopTimer);
      this.autoStopTimer = null;
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play(autoStopSeconds?: number): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // If already playing, stop previous oscillators safely
      this.cleanupOscillators();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      // Yumuşak fade in (1.5 saniye)
      this.gainNode.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 1.5);
      this.gainNode.connect(this.ctx.destination);

      // 432 Hz Ana Frekans (Doğal Evren Rezonansı)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(432, this.ctx.currentTime);
      this.osc1.connect(this.gainNode);
      this.osc1.start();

      // 436 Hz Çiftleyici (Binaural 4Hz Derin Teta Dalgası Hissi)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(436, this.ctx.currentTime);
      this.osc2.connect(this.gainNode);
      this.osc2.start();

      this.isPlaying = true;
      this.notify();

      // Opsiyonel otomatik kapanma süresi (Örn: açılışta 10 saniye)
      if (this.autoStopTimer) {
        clearTimeout(this.autoStopTimer);
        this.autoStopTimer = null;
      }

      if (autoStopSeconds && autoStopSeconds > 0) {
        this.autoStopTimer = setTimeout(() => {
          this.stop();
          this.autoStopTimer = null;
        }, autoStopSeconds * 1000);
      }
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop(): void {
    if (this.autoStopTimer) {
      clearTimeout(this.autoStopTimer);
      this.autoStopTimer = null;
    }

    try {
      if (this.gainNode && this.ctx) {
        // Yumuşak fade out (0.8 saniye)
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          this.cleanupOscillators();
          this.isPlaying = false;
          this.notify();
        }, 800);
      } else {
        this.cleanupOscillators();
        this.isPlaying = false;
        this.notify();
      }
    } catch {
      this.cleanupOscillators();
      this.isPlaying = false;
      this.notify();
    }
  }

  private cleanupOscillators(): void {
    try {
      this.osc1?.stop();
      this.osc1?.disconnect();
      this.osc2?.stop();
      this.osc2?.disconnect();
    } catch {
      // ignore
    }
    this.osc1 = null;
    this.osc2 = null;
  }

  public initAutoPlay(durationSeconds = 10): void {
    if (this.hasAutoPlayed) return;

    const startSession = () => {
      if (this.hasAutoPlayed) return;
      this.hasAutoPlayed = true;
      cleanup();
      this.play(durationSeconds);
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', startSession);
      window.removeEventListener('touchstart', startSession);
      window.removeEventListener('scroll', startSession);
      window.removeEventListener('keydown', startSession);
      window.removeEventListener('click', startSession);
    };

    // 1. Tarayıcı izin veriyorsa hemen başlat
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'running') {
        startSession();
        return;
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          if (this.ctx?.state === 'running') {
            startSession();
          }
        }).catch(() => {
          // Fallback to interaction
        });
      }
    } catch {
      // Tarayıcı doğrudan başlatmayı kısıtladıysa etkileşim beklenir
    }

    // 2. Tarayıcı kısıtlamasına karşı kullanıcının ilk hareketinde (tıklama, dokunma, kaydırma) 10 saniyelik sesi başlat
    window.addEventListener('pointerdown', startSession, { once: true, passive: true });
    window.addEventListener('touchstart', startSession, { once: true, passive: true });
    window.addEventListener('scroll', startSession, { once: true, passive: true });
    window.addEventListener('keydown', startSession, { once: true, passive: true });
    window.addEventListener('click', startSession, { once: true, passive: true });
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new MeditativeSoundPlayer();
