export interface TextureGuillocheOptions {
  paper?: string;
  line?: string;
}

export function createTextureGuilloche(options: TextureGuillocheOptions = {}): string {
  const { paper = '#f4efdf', line = '#2a5a8a' } = options;
  const curves: string[] = [];
  for (let k = 0; k < 14; k++) {
    let d = '';
    for (let t = 0; t <= Math.PI * 2 + 0.02; t += 0.05) {
      const r = 120 + Math.sin(t * 7 + k * 0.45) * 26 + Math.cos(t * 3 - k) * 10;
      const x = 160 + Math.cos(t + k * 0.1) * r;
      const y = 160 + Math.sin(t + k * 0.1) * r;
      d += `${t === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
    }
    curves.push(`<path d="${d}Z" fill="none" stroke="${line}" stroke-width="0.9" opacity="0.65"/>`);
    if (k % 4 === 0) {
      curves.push(`<path d="${d}Z" fill="none" stroke="#c8862e" stroke-width="1.4" opacity="0.5"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="gil-g" cx="50%" cy="48%" r="70%">
      <stop offset="0%" stop-color="#fdf9ec"/>
      <stop offset="100%" stop-color="#e8e0c8"/>
    </radialGradient>
  </defs>
  <rect width="320" height="320" fill="${paper}"/>
  <circle cx="160" cy="160" r="150" fill="url(#gil-g)" stroke="${line}" stroke-width="1.5"/>
  ${curves.join('\n  ')}
</svg>`;
}
