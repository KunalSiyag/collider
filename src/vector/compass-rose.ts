export interface CompassRoseOptions {
  size?: number;
  points?: number;
  ring?: string;
  needle?: string;
}

export function createCompassRose(options: CompassRoseOptions = {}): string {
  const { size = 720, points = 16, ring = '#3f3f46', needle = '#f472b6' } = options;
  const c = size / 2;
  const R = size * 0.42;
  const els: string[] = [];

  for (let i = 1; i <= 3; i++) {
    els.push(`      <circle cx="${c}" cy="${c}" r="${(R * i / 3).toFixed(1)}" fill="none" stroke="${ring}" stroke-width="1.2" />`);
  }
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const long = i % 4 === 0;
    const r2 = long ? R : R * 0.82;
    els.push(`      <line x1="${c}" y1="${c}" x2="${(c + Math.cos(a) * r2).toFixed(1)}" y2="${(c + Math.sin(a) * r2).toFixed(1)}" stroke="${ring}" stroke-width="${long ? 1.6 : 0.8}" />`);
    if (long) {
      const tipX = c + Math.cos(a) * R;
      const tipY = c + Math.sin(a) * R;
      const b1A = a + 0.22, b2A = a - 0.22;
      els.push(`      <polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ${(c + Math.cos(b1A) * R * 0.75).toFixed(1)},${(c + Math.sin(b1A) * R * 0.75).toFixed(1)} ${c},${c} ${(c + Math.cos(b2A) * R * 0.75).toFixed(1)},${(c + Math.sin(b2A) * R * 0.75).toFixed(1)}" fill="none" stroke="#52525b" stroke-width="1" />`);
    }
  }
  els.push(`      <g>
        <animateTransform attributeName="transform" type="rotate" values="-8 ${c} ${c}; 8 ${c} ${c}; -8 ${c} ${c}" dur="6s" repeatCount="indefinite" />
        <path d="M${c} ${(c - R * 0.9).toFixed(1)} L${(c - R * 0.12).toFixed(1)} ${c} L${c} ${(c + R * 0.35).toFixed(1)} Z" fill="${needle}" fill-opacity="0.85" />
        <path d="M${c} ${(c + R * 0.55).toFixed(1)} L${(c + R * 0.12).toFixed(1)} ${c} L${c} ${(c - R * 0.3).toFixed(1)} Z" fill="none" stroke="#52525b" stroke-width="1.4" />
      </g>`);
  els.push(`      <circle cx="${c}" cy="${c}" r="6" fill="#e4e4e7" />`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
