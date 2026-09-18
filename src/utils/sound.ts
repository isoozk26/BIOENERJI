// Web Audio API ile Saf 432 Hz / 436 Hz Meditatif Rezonans Üreteci (Mobil ve Masaüstü Uyumlu)
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

  private ensureContext(): AudioContext {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioCtx();
    }
    return this.ctx;
  }

  private unlockIOS(ctx: AudioContext): void {
    try {
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // ignore
    }
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
      const ctx = this.ensureContext();

      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      this.unlockIOS(ctx);

      // Önceki osilatörleri güvenle temizle
      this.cleanupOscillators();

      // Master Gain
      this.gainNode = ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      // Yumuşak fade-in (1.5 saniye)
      this.gainNode.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 1.5);
      this.gainNode.connect(ctx.destination);

      // 432 Hz Ana Frekans (Doğal Evren Rezonansı)
      this.osc1 = ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(432, ctx.currentTime);
      this.osc1.connect(this.gainNode);
      this.osc1.start();

      // 436 Hz Çiftleyici (Binaural 4Hz Derin Teta Dalgası Hissi)
      this.osc2 = ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(436, ctx.currentTime);
      this.osc2.connect(this.gainNode);
      this.osc2.start();

      this.isPlaying = true;
      this.notify();

      // 10 saniye sonra otomatik yumuşak kapanma
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
      if (this.gainNode && this.ctx && this.ctx.state === 'running') {
        // Yumuşak fade-out (0.8 saniye)
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

    const triggerPlay = () => {
      if (this.hasAutoPlayed) return;
      this.hasAutoPlayed = true;
      cleanup();

      const ctx = this.ensureContext();
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          this.play(durationSeconds);
        }).catch(() => {
          this.play(durationSeconds);
        });
      } else {
        this.play(durationSeconds);
      }
    };

    const cleanup = () => {
      document.removeEventListener('touchstart', triggerPlay);
      document.removeEventListener('touchend', triggerPlay);
      document.removeEventListener('pointerdown', triggerPlay);
      document.removeEventListener('click', triggerPlay);
      document.removeEventListener('scroll', triggerPlay);
      window.removeEventListener('scroll', triggerPlay);
    };

    // 1. Masaüstü/Tarayıcı izin veriyorsa hemen başlatmayı dene
    try {
      const ctx = this.ensureContext();
      if (ctx.state === 'running') {
        triggerPlay();
        return;
      }
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          if (ctx.state === 'running') {
            triggerPlay();
          }
        }).catch(() => {
          // Mobil kısıtlama durumunda dokunma etkileşimi beklenir
        });
      }
    } catch {
      // Mobil tarayıcı ilk jesti bekler
    }

    // 2. Mobil tarayıcılar (iOS Safari / Android Chrome) için ilk ekrana dokunma anında 10 saniyelik sesi tetikle
    document.addEventListener('touchstart', triggerPlay, { once: true, passive: true });
    document.addEventListener('touchend', triggerPlay, { once: true, passive: true });
    document.addEventListener('pointerdown', triggerPlay, { once: true, passive: true });
    document.addEventListener('click', triggerPlay, { once: true, passive: true });
    document.addEventListener('scroll', triggerPlay, { once: true, passive: true });
    window.addEventListener('scroll', triggerPlay, { once: true, passive: true });
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new MeditativeSoundPlayer();
