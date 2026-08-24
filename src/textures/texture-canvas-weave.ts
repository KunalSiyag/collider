/** Canvas Weave — coarse artist-canvas texture with a warm primed tone. */
export interface CanvasWeaveOptions {
  threadColor?: string;
  primingColor?: string;
  background?: string;
}

export function createCanvasWeave(options: CanvasWeaveOptions = {}): string {
  const { threadColor = '#c9b48f', primingColor = '#e8dcc2', background = 'transparent' } = options;
  const step = 9;

  let weave = '';
  for (let y = 0; y < 720; y += step) {
    for (let x = 0; x < 1440; x += step) {
      const on = (Math.floor(x / step) + Math.floor(y / step)) % 2 === 0;
      weave += `<rect x="${x}" y="${y}" width="${step - 1.4}" height="${step - 1.4}"
        fill="${on ? threadColor : primingColor}" opacity="${on ? 0.55 : 0.9}"/>`;
    }
  }

  return `<svg viewBox="0 0 1440 720" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="1440" height="720" fill="${primingColor}"/>
  ${weave}
  <rect width="1440" height="720" fill="url(#cw-sheen)"/>
  <defs>
    <linearGradient id="cw-sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.1"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#8a6f4d" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
</svg>`;
}
