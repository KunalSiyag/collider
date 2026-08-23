export interface RoseWindowOptions {
  size?: number;
  petals?: number;
  rings?: number;
  stroke?: string;
  accent?: string;
}

export function createRoseWindow(options: RoseWindowOptions = {}): string {
  const { size = 720, petals = 16, rings = 4, stroke = '#3f3f46', accent = '#fbbf24' } = options;
  const c = size / 2;
  const R = size * 0.44;
  const els: string[] = [];

  for (let ring = 1; ring <= rings; ring++) {
    const r = (R * ring) / rings;
    els.push(`      <circle cx="${c}" cy="${c}" r="${r.toFixed(1)}" fill="none" stroke="${ring === rings ? accent : stroke}" stroke-width="${ring === rings ? 2 : 1}" />`);
    const n = petals * ring;
    for (let i = 0; i < n; i++) {
      if (ring % 2 === 0) continue;
      const a = (i / n) * Math.PI * 2;
      const a1 = a + Math.PI / n;
      els.push(`      <line x1="${(c + Math.cos(a) * r).toFixed(1)}" y1="${(c + Math.sin(a) * r).toFixed(1)}" x2="${(c + Math.cos(a1) * r).toFixed(1)}" y2="${(c + Math.sin(a1) * r).toFixed(1)}" stroke="${stroke}" stroke-width="0.9" />`);
      els.push(`      <line x1="${c}" y1="${c}" x2="${(c + Math.cos(a) * r).toFixed(1)}" y2="${(c + Math.sin(a) * r).toFixed(1)}" stroke="#27272a" stroke-width="0.6" />`);
    }
  }
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const isAccent = i % 4 === 0;
    els.push(`      <circle cx="${(c + Math.cos(a) * R * 0.5).toFixed(1)}" cy="${(c + Math.sin(a) * R * 0.5).toFixed(1)}" r="7" fill="${isAccent ? accent : '#18181b'}" fill-opacity="${isAccent ? 0.5 : 1}" stroke="#52525b" stroke-width="1"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.5;0.15;0.5" dur="6s" repeatCount="indefinite" />\n      ' : ''} />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
