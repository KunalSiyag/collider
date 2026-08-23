export interface TextureScanlinesOptions {
  glow?: string;
  line?: string;
}

export function createTextureScanlines(options: TextureScanlinesOptions = {}): string {
  const { glow = '#4ae8a0', line = '#062a18' } = options;
  const rows: string[] = [];
  for (let y = 0; y < 320; y += 4) {
    rows.push(`<rect x="0" y="${y}" width="320" height="1.6" fill="${line}" opacity="0.75"/>`);
    if (y % 16 === 0) {
      rows.push(`<rect x="0" y="${(y + 3.5).toFixed(1)}" width="320" height="0.6" fill="${glow}" opacity="0.25"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="scn-g" cx="50%" cy="50%" r="72%">
      <stop offset="0%" stop-color="#0e5c38"/>
      <stop offset="70%" stop-color="#07281a"/>
      <stop offset="100%" stop-color="#03120b"/>
    </radialGradient>
    <linearGradient id="scn-sweep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.14"/>
      <stop offset="0.12" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter id="scn-b"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <rect width="320" height="320" fill="url(#scn-g)"/>
  <rect x="60" y="-20" width="40" height="360" fill="${glow}" opacity="0.08" filter="url(#scn-b)"/>
  ${rows.join('\n  ')}
  <rect width="320" height="120" fill="url(#scn-sweep)"/>
</svg>`;
}
