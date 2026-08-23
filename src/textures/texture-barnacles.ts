export interface TextureBarnacleOptions {
  rock?: string;
  shell?: string;
}

export function createTextureBarnacles(options: TextureBarnacleOptions = {}): string {
  const { rock = '#44403c', shell = '#d6d3d1' } = options;
  let s = 77;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const clusters: string[] = [];
  for (let c = 0; c < 7; c++) {
    const cx = rnd() * 320;
    const cy = rnd() * 320;
    const n = 5 + Math.floor(rnd() * 7);
    for (let i = 0; i < n; i++) {
      const x = cx + (rnd() - 0.5) * 90;
      const y = cy + (rnd() - 0.5) * 90;
      const r = 6 + rnd() * 9;
      clusters.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${shell}" opacity="${(0.75 + rnd() * 0.25).toFixed(2)}"/>`);
      for (let p = 0; p < 6; p++) {
        const ang = (p / 6) * Math.PI * 2 + rnd();
        clusters.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + Math.cos(ang) * r * 0.85).toFixed(1)}" y2="${(y + Math.sin(ang) * r * 0.85).toFixed(1)}" stroke="#78716c" stroke-width="1" opacity="0.7"/>`);
      }
      clusters.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.3).toFixed(1)}" fill="#292524"/>`);
    }
  }
  return `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="bc-r"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed="5"/></filter>
  </defs>
  <rect width="320" height="320" fill="${rock}"/>
  <rect width="320" height="320" filter="url(#bc-r)" opacity="0.18" style="mix-blend-mode:multiply"/>
  ${clusters.join('\n  ')}
</svg>`;
}
