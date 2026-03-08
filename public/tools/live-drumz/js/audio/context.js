let ctx = null;

export function getContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'interactive',
    });
  }
  return ctx;
}

// Call this inside a user gesture handler. Resolves when the context is running.
export async function resumeContext() {
  const c = getContext();
  if (c.state !== 'running') {
    await c.resume();
  }
  return c;
}
