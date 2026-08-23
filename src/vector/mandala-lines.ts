export interface MandalaLinesOptions {
  size?: number;
  rings?: number;
  symmetry?: number;
  stroke?: string;
  accent?: string;
}

export function createMandalaLines(options: MandalaLinesOptions = {}): string {
  const { size = 720, rings = 5, symmetry = 12, stroke = '#3f3f46', accent = '#8b5cf6' } = options;
  const c = size / 2;
  const els: string[] = [];

  for (let ring = 1; ring <= rings; ring++) {
    const R = (size * 0.44 * ring) / rings;
    const petalsOnRing = symmetry + (ring % 2) * 4;
    for (let i = 0; i < petalsOnRing; i++) {
      const a = (i / petalsOnRing) * Math.PI * 2;
      const tipR = R;
      const sideA1 = a - Math.PI / petalsOnRing;
      const sideA2 = a + Math.PI / petalsOnRing;
      const rBase = R * 0.55;
      const color = (ring === 2 && i % 6 === 0) ? accent : stroke;
      els.push(`      <path d="M${(c + Math.cos(sideA1) * rBase).toFixed(1)} ${(c + Math.sin(sideA1) * rBase).toFixed(1)} Q${(c + Math.cos(a - 0.12) * tipR).toFixed(1)} ${(c + Math.sin(a - 0.12) * tipR).toFixed(1)} ${(c + Math.cos(a) * tipR).toFixed(1)} ${(c + Math.sin(a) * tipR).toFixed(1)} Q${(c + Math.cos(a + 0.12) * tipR).toFixed(1)} ${(c + Math.sin(a + 0.12) * tipR).toFixed(1)} ${(c + Math.cos(sideA2) * rBase).toFixed(1)} ${(c + Math.sin(sideA2) * rBase).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${ring === 1 ? 1.8 : 1.1}"${color === accent ? '>\n          <animate attributeName="stroke-opacity" values="1;0.35;1" dur="6s" repeatCount="indefinite" />\n        ' : ''} />`);
    }
    els.push(`      <circle cx="${c}" cy="${c}" r="${(R * 0.55).toFixed(1)}" fill="none" stroke="#27272a" stroke-width="0.7" />`);
  }
  els.push(`      <circle cx="${c}" cy="${c}" r="${size * 0.04}" fill="${accent}" fill-opacity="0.25" stroke="${accent}" stroke-width="1.5">
    <animate attributeName="r" values="${size * 0.04};${size * 0.05};${size * 0.04}" dur="5s" repeatCount="indefinite" />
  </circle>`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${els.join('\n')}
</svg>`;
}
