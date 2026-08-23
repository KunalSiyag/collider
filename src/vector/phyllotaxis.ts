export interface PhyllotaxisOptions {
  size?: number;
  count?: number;
  angleDeg?: number;
  base?: string;
  accent?: string;
}

export function createPhyllotaxis(options: PhyllotaxisOptions = {}): string {
  const { size = 720, count = 420, angleDeg = 137.508, base = '#3f3f46', accent = '#8b5cf6' } = options;
  const c = size / 2;
  const golden = (angleDeg * Math.PI) / 180;
  const els: string[] = [];

  for (let i = 1; i <= count; i++) {
    const th = i * golden;
    const r = Math.sqrt(i) * (size * 0.021);
    if (r > c) break;
    const x = c + Math.cos(th) * r;
    const y = c + Math.sin(th) * r;
    const rad = 1.5 + i * 0.012;
    const isAccent = i % 34 === 0;
    els.push(`      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(2)}" fill="${isAccent ? accent : base}" opacity="${(0.4 + (i / count) * 0.6).toFixed(2)}"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="1;0.35;1" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${els.join('\n')}
</svg>`;
}
