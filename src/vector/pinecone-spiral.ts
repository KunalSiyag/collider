export interface PineconeSpiralOptions {
  size?: number;
  dotsPerSpiral?: number;
  spirals?: number;
  base?: string;
  accent?: string;
}

export function createPineconeSpiral(options: PineconeSpiralOptions = {}): string {
  const { size = 720, dotsPerSpiral = 26, spirals = 5, base = '#3f3f46', accent = '#fbbf24' } = options;
  const c = size / 2;
  const els: string[] = [];
  const R = size * 0.4;

  for (let k = 0; k < spirals; k++) {
    const offset = (k / spirals) * Math.PI * 2;
    for (let i = 0; i < dotsPerSpiral; i++) {
      const t = i / dotsPerSpiral;
      const th = offset + t * Math.PI * 2 * 1.6;
      const r = t * R;
      const x = c + Math.cos(th) * r;
      const y = c + Math.sin(th) * r * 1.25 - R * 0.12;
      if (y > c + R) continue;
      const isAccent = i === Math.floor(dotsPerSpiral * 0.6) && k === 2;
      els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + t * 7).toFixed(1)}" fill="${isAccent ? accent : base}" opacity="${(0.35 + t * 0.55).toFixed(2)}"${isAccent ? '>\n          <animate attributeName="r" values="9;11;9" dur="4s" repeatCount="indefinite" />\n        ' : ''} />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${els.join('\n')}
</svg>`;
}
