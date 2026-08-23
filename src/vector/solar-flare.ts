export interface SolarFlareOptions {
  size?: number;
  rays?: number;
  disc?: string;
  flare?: string;
}

export function createSolarFlare(options: SolarFlareOptions = {}): string {
  const { size = 720, rays = 18, disc = '#fbbf24', flare = '#f472b6' } = options;
  const c = size / 2;
  const R = size * 0.2;
  const els: string[] = [];

  for (let i = 0; i < rays; i++) {
    const a0 = (i / rays) * Math.PI * 2;
    const len = size * (0.28 + ((i * 29) % 10) / 10 * 0.16);
    const x1 = c + Math.cos(a0) * (R + 6);
    const y1 = c + Math.sin(a0) * (R + 6);
    const x2 = c + Math.cos(a0) * (R + 6 + len);
    const y2 = c + Math.sin(a0) * (R + 6 + len);
    els.push(`      <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i % 3 === 0 ? flare : '#f59e0b'}" stroke-width="${i % 3 === 0 ? 2.4 : 1.4}" opacity="0.7">
        <animate attributeName="opacity" values="0.25;0.85;0.25" dur="${(3 + (i % 5)).toFixed(1)}s" begin="${(i * 0.15).toFixed(2)}s" repeatCount="indefinite" />
      </line>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${els.join('\n')}
    <animateTransform attributeName="transform" type="rotate" from="0 ${c} ${c}" to="360 ${c} ${c}" dur="60s" repeatCount="indefinite" />
  </g>
  <circle cx="${c}" cy="${c}" r="${R * 1.35}" fill="${disc}" opacity="0.12">
    <animate attributeName="r" values="${R * 1.3};${R * 1.45};${R * 1.3}" dur="4s" repeatCount="indefinite" />
  </circle>
  <circle cx="${c}" cy="${c}" r="${R}" fill="${disc}" />
</svg>`;
}
