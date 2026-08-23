export interface JellyfishDriftOptions {
  size?: number;
  count?: number;
  body?: string;
  accent?: string;
}

export function createJellyfishDrift(options: JellyfishDriftOptions = {}): string {
  const { size = 720, count = 5, body = '#a78bfa', accent = '#67e8f9' } = options;
  const els: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = size * (0.15 + ((i * 41) % 70) / 100);
    const baseY = size * (0.2 + ((i * 29) % 50) / 100);
    const r = size * (0.05 + ((i * 13) % 6) / 100);
    const color = i % 2 === 0 ? body : accent;
    const dur = (7 + i * 1.3).toFixed(1);
    const tentacles: string[] = [];
    for (let t = -3; t <= 3; t++) {
      const tx = t * r * 0.28;
      tentacles.push(`        <path d="M${(x + tx).toFixed(1)} ${(baseY + r * 0.4).toFixed(1)} q${(tx * 0.8).toFixed(1)} ${r.toFixed(1)} 0 ${(r * 2.4).toFixed(1)}" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.55" />`);
    }
    els.push(`      <g>
        <animateTransform attributeName="transform" type="translate" values="0 30; 0 -30; 0 30" dur="${dur}s" repeatCount="indefinite" />
        <path d="M${(x - r).toFixed(1)} ${baseY.toFixed(1)} A${r.toFixed(1)} ${(r * 0.85).toFixed(1)} 0 0 1 ${(x + r).toFixed(1)} ${baseY.toFixed(1)} Q${x.toFixed(1)} ${(baseY + r * 0.5).toFixed(1)} ${(x - r).toFixed(1)} ${baseY.toFixed(1)} Z" fill="${color}" fill-opacity="0.16" stroke="${color}" stroke-width="1.6">
          <animate attributeName="fill-opacity" values="0.08;0.25;0.08" dur="${dur}s" repeatCount="indefinite" />
        </path>
${tentacles.join('\n')}
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
