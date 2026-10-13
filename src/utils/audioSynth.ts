class DreamAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentBaseFreq: number = 108;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient channel
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

      // Low pass filter with subtle warmth
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
      this.filterNode.Q.setValueAtTime(2.0, this.ctx.currentTime);

      // LFO for filter breathing
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow 12s cycle
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);
      this.lfo.start();

      this.ambientGain.connect(this.filterNode);
      this.filterNode.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(volume: number = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (!this.isPlaying) {
      this.setupOscillators(this.currentBaseFreq);
      this.isPlaying = true;
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(Math.max(0.01, Math.min(volume, 1)) * 0.35, now + 1.8);
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);
  }

  public setVolume(volume: number) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(volume, 1)) * 0.35, now + 0.3);
  }

  public transitionMood(baseFreq: number) {
    this.currentBaseFreq = baseFreq;
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    // Morph frequencies smoothly over 3 seconds
    if (this.oscillators[0]) {
      this.oscillators[0].frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 0.5), now + 3);
    }
    if (this.oscillators[1]) {
      this.oscillators[1].frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 0.75), now + 3.2);
    }
    if (this.oscillators[2]) {
      this.oscillators[2].frequency.exponentialRampToValueAtTime(Math.max(20, baseFreq * 1.25), now + 3.4);
    }
  }

  private setupOscillators(baseFreq: number) {
    if (!this.ctx || !this.ambientGain) return;

    // Clean existing
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.oscillators = [];

    const freqs = [
      baseFreq * 0.5,    // Sub root
      baseFreq * 0.75,   // Fourth / Fifth harmonic
      baseFreq * 1.25    // Upper ethereal harmonic
    ];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx === 0 ? 'sine' : idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const gainVal = idx === 0 ? 0.35 : idx === 1 ? 0.18 : 0.1;
      oscGain.gain.setValueAtTime(gainVal, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.ambientGain);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  public playChime(freq: number = 528, duration: number = 1.2) {
    if (!this.ctx || this.ctx.state === 'suspended') {
      try {
        this.initContext();
      } catch {
        return;
      }
    }
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Audio autoplay policy or device limit
    }
  }

  public playPortalWarp() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.6);
      osc.frequency.exponentialRampToValueAtTime(80, now + 1.4);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch {
      // safe fallback
    }
  }
}

export const audioEngine = new DreamAudioEngine();
