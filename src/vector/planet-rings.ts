export interface PlanetRingsOptions {
  size?: number;
  body?: string;
  ring?: string;
  accent?: string;
}

export function createPlanetRings(options: PlanetRingsOptions = {}): string {
  const { size = 720, body = '#18181b', ring = '#3f3f46', accent = '#8b5cf6' } = options;
  const c = size / 2;
  const r = size * 0.22;
  const bands: string[] = [];
  for (let i = 0; i < 5; i++) {
    const ry = r * (1.35 + i * 0.14);
    const rx = ry * 2.15;
    const color = i === 2 ? accent : ring;
    bands.push(
      `      <ellipse cx="${c}" cy="${c}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${i === 2 ? 4 : 2}" opacity="${i % 2 ? 0.85 : 0.55}" />`,
    );
  }
  const spots: string[] = [];
  for (let i = 0; i < 4; i++) {
    const y = c - r * 0.5 + i * (r * 0.34);
    const w = r * (1.5 - i * 0.18) * ((i * 37) % 10 / 10 + 0.5);
    spots.push(`      <ellipse cx="${c - r * 0.2 + i * 8}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="4" fill="#27272a" opacity="0.7" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${bands.slice(0, 2).join('\n')}
  <circle cx="${c}" cy="${c}" r="${r}" fill="${body}" stroke="#3f3f46" stroke-width="1.5">
    <animate attributeName="stroke" values="#3f3f46;#27272a;#3f3f46" dur="6s" repeatCount="indefinite" />
  </circle>
${spots.join('\n')}
${bands.slice(2).join('\n')}
</svg>`;
}
