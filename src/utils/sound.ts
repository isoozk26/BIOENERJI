// Web Audio API ile Saf 432 Hz / 528 Hz Meditatif Rezonans Üreteci
class MeditativeSoundPlayer {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play(): void {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      // Yumuşak fade in
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);
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
    } catch {
      this.isPlaying = false;
    }
  }

  public stop(): void {
    try {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.isPlaying = false;
        }, 1000);
      } else {
        this.isPlaying = false;
      }
    } catch {
      this.isPlaying = false;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new MeditativeSoundPlayer();
