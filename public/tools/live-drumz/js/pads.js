import { playSound } from './audio/synth.js';

const KEY_MAP = {
  q: 'kick',
  w: 'clap',
  e: 'snare',
  r: 'hihat',
};

function triggerPad(el) {
  const sound = el.dataset.sound;
  // Instant playback from pre-rendered buffer
  playSound(sound);

  // Visual flash — remove then re-add to re-trigger on rapid taps
  el.classList.remove('pad--active');
  void el.offsetWidth;
  el.classList.add('pad--active');
  setTimeout(() => el.classList.remove('pad--active'), 80);
}

export function initPads() {
  const pads = document.querySelectorAll('.pad');

  pads.forEach((pad) => {
    // touchstart for lowest latency on mobile
    pad.addEventListener('touchstart', (e) => {
      e.preventDefault();
      triggerPad(pad);
    }, { passive: false });

    // pointerdown for mouse (skip touch pointers to avoid double-trigger)
    pad.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      e.preventDefault();
      triggerPad(pad);
    });
  });

  // Keyboard fallback
  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const sound = KEY_MAP[e.key.toLowerCase()];
    if (!sound) return;
    const pad = document.querySelector(`.pad[data-sound="${sound}"]`);
    if (pad) triggerPad(pad);
  });
}
