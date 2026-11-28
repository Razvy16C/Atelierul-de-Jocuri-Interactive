// ==========================================================================
// REAL-TIME SYNTHESIZED AUDIO ENGINE (WEB AUDIO API — NO EXTERNAL FILES)
// ==========================================================================
const CalmAudio = (() => {
    let ctx = null;
    let masterGain = null;
    let ambientNodes = null;
    let currentAmbientPreset = null;
    let lastHoverTime = 0;

    function ensureContext() {
        if (!ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return null;
            ctx = new AudioCtx();
            masterGain = ctx.createGain();
            masterGain.gain.value = (prefs.soundVolume ?? 45) / 100;
            masterGain.connect(ctx.destination);
        }
        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }
        return ctx;
    }

    function createPinkNoiseBuffer(audioCtx, seconds = 4) {
        const bufferSize = audioCtx.sampleRate * seconds;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
            b6 = white * 0.115926;
        }
        return noiseBuffer;
    }

    function setVolume(volPercent) {
        if (masterGain && ctx) {
            masterGain.gain.setTargetAtTime(volPercent / 100, ctx.currentTime, 0.08);
        }
    }

    // 1. Soft click for UI interactions
    function playSoftClick(pitchScale = 1) {
        if (!prefs.soundEnabled) return;
        const audioCtx = ensureContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(340 * pitchScale, now);
        osc.frequency.exponentialRampToValueAtTime(160 * pitchScale, now + 0.065);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.085);
    }

    // 2. Subtle hover tone for cards and buttons
    function playSoftHover() {
        if (!prefs.soundEnabled) return;
        const nowMs = performance.now();
        if (nowMs - lastHoverTime < 140) return;
        lastHoverTime = nowMs;

        const audioCtx = ensureContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const notes = [440, 493.88, 523.25, 587.33, 659.25];
        const freq = notes[Math.floor(Math.random() * notes.length)];

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    // 3. Melodic transition when changing the theme (light / dark)
    function playThemeShift(isDark) {
        if (!prefs.soundEnabled) return;
        const audioCtx = ensureContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const freqs = isDark ? [440, 329.63] : [329.63, 440];

        freqs.forEach((f, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const start = now + idx * 0.09;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, start);

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.linearRampToValueAtTime(0.045, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(start);
            osc.stop(start + 0.38);
        });
    }

    // 4. Ascending chord when opening an experience
    function playOpenChord() {
        if (!prefs.soundEnabled) return;
        const audioCtx = ensureContext();
        if (!audioCtx) return;

        const now = audioCtx.currentTime;
        const chord = [329.63, 392.00, 493.88, 659.25];

        chord.forEach((f, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const start = now + idx * 0.055;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, start);

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.linearRampToValueAtTime(0.038, start + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(start);
            osc.stop(start + 0.48);
        });
    }

    // 5. Calm ambience cu 4 peisaje sonore selectabile
    function stopAmbient() {
        if (!ambientNodes) return;
        const { nodes, gainNode } = ambientNodes;
        try {
            if (ctx && gainNode) {
                gainNode.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.25);
            }
            setTimeout(() => {
                nodes.forEach(n => {
                    try { if (n.stop) n.stop(); } catch (e) {}
                    try { if (n.disconnect) n.disconnect(); } catch (e) {}
                });
            }, 400);
        } catch (e) {}
        ambientNodes = null;
        currentAmbientPreset = null;
    }

    function startAmbient(preset = prefs.ambientPreset || 'breeze') {
        if (!prefs.soundEnabled || !prefs.ambientEnabled) return;
        const audioCtx = ensureContext();
        if (!audioCtx) return;

        if (ambientNodes && currentAmbientPreset === preset) return;
        stopAmbient();

        const now = audioCtx.currentTime;
        const ambGain = audioCtx.createGain();
        ambGain.gain.setValueAtTime(0.0001, now);
        ambGain.connect(masterGain);

        const nodes = [ambGain];

        if (preset === 'rain') {
            // Soft rain: gently filtered pink noise
            const noise = audioCtx.createBufferSource();
            noise.buffer = createPinkNoiseBuffer(audioCtx, 5);
            noise.loop = true;

            const lowpass = audioCtx.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.setValueAtTime(1100, now);

            const highpass = audioCtx.createBiquadFilter();
            highpass.type = 'highpass';
            highpass.frequency.setValueAtTime(220, now);

            noise.connect(highpass);
            highpass.connect(lowpass);
            lowpass.connect(ambGain);

            noise.start(now);
            ambGain.gain.linearRampToValueAtTime(0.28, now + 1.4);
            nodes.push(noise, lowpass, highpass);
        } else if (preset === 'waves') {
            // Gentle waves: pink noise slowly modulated by an LFO
            const noise = audioCtx.createBufferSource();
            noise.buffer = createPinkNoiseBuffer(audioCtx, 6);
            noise.loop = true;

            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(480, now);

            const waveGain = audioCtx.createGain();
            waveGain.gain.setValueAtTime(0.18, now);

            const lfo = audioCtx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.11, now); // one wave every ~9 seconds

            const lfoDepth = audioCtx.createGain();
            lfoDepth.gain.setValueAtTime(0.14, now);

            lfo.connect(lfoDepth);
            lfoDepth.connect(waveGain.gain);

            noise.connect(filter);
            filter.connect(waveGain);
            waveGain.connect(ambGain);

            noise.start(now);
            lfo.start(now);
            ambGain.gain.linearRampToValueAtTime(0.32, now + 1.5);
            nodes.push(noise, filter, waveGain, lfo, lfoDepth);
        } else if (preset === 'nocturne') {
            // Warm nocturne: deep D major 9 chord (D3, A3, E4, F#4)
            const freqs = [146.83, 220.00, 329.63, 369.99];
            freqs.forEach((f, idx) => {
                const osc = audioCtx.createOscillator();
                const oscGain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now);

                oscGain.gain.setValueAtTime(0.022 / (idx * 0.35 + 1), now);
                osc.connect(oscGain);
                oscGain.connect(ambGain);
                osc.start(now);
                nodes.push(osc, oscGain);
            });
            ambGain.gain.linearRampToValueAtTime(0.35, now + 1.8);
        } else {
            // Default ('breeze'): gentle breeze & warm A minor 9 chord (A2, E3, B3, C5)
            const freqs = [110.00, 164.81, 246.94, 523.25];
            freqs.forEach((f, idx) => {
                const osc = audioCtx.createOscillator();
                const oscGain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, now);

                oscGain.gain.setValueAtTime(0.018 / (idx * 0.4 + 1), now);
                osc.connect(oscGain);
                oscGain.connect(ambGain);
                osc.start(now);
                nodes.push(osc, oscGain);
            });

            const breeze = audioCtx.createBufferSource();
            breeze.buffer = createPinkNoiseBuffer(audioCtx, 5);
            breeze.loop = true;

            const bandpass = audioCtx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.setValueAtTime(380, now);
            bandpass.Q.setValueAtTime(0.8, now);

            const breezeGain = audioCtx.createGain();
            breezeGain.gain.setValueAtTime(0.06, now);

            breeze.connect(bandpass);
            bandpass.connect(breezeGain);
            breezeGain.connect(ambGain);
            breeze.start(now);

            ambGain.gain.linearRampToValueAtTime(0.34, now + 1.6);
            nodes.push(breeze, bandpass, breezeGain);
        }

        ambientNodes = { nodes, gainNode: ambGain };
        currentAmbientPreset = preset;
    }

    function syncAmbientState() {
        if (prefs.soundEnabled && prefs.ambientEnabled) {
            startAmbient(prefs.ambientPreset);
        } else {
            stopAmbient();
        }
    }

    return {
        setVolume,
        playSoftClick,
        playSoftHover,
        playThemeShift,
        playOpenChord,
        syncAmbientState
    };
})();
