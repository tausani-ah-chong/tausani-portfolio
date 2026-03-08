let player = null;
let btDelayMs = 0;

const BASE_VARS = {
  autoplay: 1,
  controls: 0,
  modestbranding: 1,
  rel: 0,
  playsinline: 1,
  disablekb: 1,
  fs: 0,
  iv_load_policy: 3,
};

function onStateChange(event) {
  const btn = document.getElementById('btn-play-pause');
  if (!btn) return;
  const playing = event.data === YT.PlayerState.PLAYING;
  btn.querySelector('.icon-pause').style.display = playing ? 'block' : 'none';
  btn.querySelector('.icon-play').style.display  = playing ? 'none' : 'block';
}

function buildPlayer(extraVars, videoId) {
  const opts = {
    playerVars: { ...BASE_VARS, ...extraVars },
    events: {
      onReady(event) { event.target.playVideo(); },
      onStateChange,
    },
  };
  if (videoId) opts.videoId = videoId;
  player = new YT.Player('yt-player', opts);
}

function loadAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) { resolve(); return; }
    window.onYouTubeIframeAPIReady = resolve;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
}

export async function initPlayer() {
  await loadAPI();
  buildPlayer({ list: 'PLy20ZxgzTUAk3pVjCvRA-QCOzZ35k8re2', listType: 'playlist', mute: 1 });
}

export function unMute() {
  if (!player) return;
  player.unMute();
  player.setVolume(100);
}

export function togglePlay() {
  if (!player) return;
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

export function ensurePlaying() {
  if (!player) return;
  if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
    player.playVideo();
  }
}

export function prevVideo() {
  if (!player) return;
  player.previousVideo();
}

export function nextVideo() {
  if (!player) return;
  player.nextVideo();
}

function parseYouTubeUrl(input) {
  if (!input) return null;
  input = input.trim();

  // Bare playlist ID  (starts with PL, FL, RD, UU, … then alphanumeric)
  if (/^[A-Z]{2}[A-Za-z0-9_-]{10,}$/.test(input)) {
    return { type: 'playlist', id: input };
  }
  // Bare video ID (exactly 11 url-safe chars)
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) {
    return { type: 'video', id: input };
  }

  let url;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  const list = url.searchParams.get('list');
  const v    = url.searchParams.get('v');

  // youtu.be/VIDEO_ID[?list=…]
  if (url.hostname === 'youtu.be') {
    const id = url.pathname.slice(1).split('/')[0];
    if (list) return { type: 'playlist', id: list };
    if (id)   return { type: 'video',    id };
  }

  if (url.hostname.includes('youtube.com')) {
    if (list) return { type: 'playlist', id: list };
    if (v)    return { type: 'video',    id: v };
  }

  return null;
}

export function loadFromUrl(raw) {
  const parsed = parseYouTubeUrl(raw);
  if (!parsed || !player) return false;

  // Destroy and rebuild — loadPlaylist is unreliable during active playback
  player.destroy();
  const container = document.getElementById('video-container');
  const div = document.createElement('div');
  div.id = 'yt-player';
  container.appendChild(div);

  if (parsed.type === 'playlist') {
    buildPlayer({ list: parsed.id, listType: 'playlist' });
  } else {
    buildPlayer({}, parsed.id);
  }
  return true;
}

export function applyBtDelay(ms) {
  if (!player) return;
  const delta = ms - btDelayMs;
  btDelayMs = ms;
  if (delta === 0) return;
  player.seekTo(Math.max(0, (player.getCurrentTime() || 0) + delta / 1000), true);
}
