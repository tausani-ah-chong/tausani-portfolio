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
  const sounds = {
    kick: 'kick.wav',
    snare: 'snare.wav',
    hihat: 'hihat.wav',
    clap: 'clap.wav',
    fahhhhhhhhhhhhhh: 'fahhhhhhhhhhhhhh.mp3',
    ack: 'ack.mp3',
    thud: 'thud.mp3',
    applepay: 'applepay.mp3',
  };
  await Promise.all(Object.entries(sounds).map(async ([name, file]) => {
    const res = await fetch(`sounds/${file}`);
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
