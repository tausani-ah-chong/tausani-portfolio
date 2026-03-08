import { getContext } from './context.js';

// ─── Master bus ────────────────────────────────────────────
let masterGain = null;
let compressor = null;

function getMaster() {
  const ctx = getContext();
  if (!masterGain) {
    compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -12;
    compressor.knee.value = 6;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.15;
    compressor.connect(ctx.destination);

    masterGain = ctx.createGain();
    masterGain.gain.value = 0.9;
    masterGain.connect(compressor);
  }
  return masterGain;
}

// ─── Pre-loaded buffers ────────────────────────────────────

const buffers = {};

export async function prerender() {
  const ctx = getContext();
  const names = ['kick', 'snare', 'hihat', 'clap'];
  await Promise.all(names.map(async (name) => {
    const res = await fetch(`sounds/${name}.wav`);
    const arrayBuffer = await res.arrayBuffer();
    buffers[name] = await ctx.decodeAudioData(arrayBuffer);
  }));
}

// ─── Instant playback from pre-loaded buffer ───────────────

export function playSound(name) {
  const buf = buffers[name];
  if (!buf) return;
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(getMaster());
  src.start();
}
