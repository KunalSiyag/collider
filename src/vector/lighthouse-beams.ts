export interface LighthouseBeamsOptions {
  size?: number;
  beams?: number;
  tower?: string;
  light?: string;
}

export function createLighthouseBeams(options: LighthouseBeamsOptions = {}): string {
  const { size = 720, beams = 3, tower = '#27272a', light = '#fbbf24' } = options;
  const cx = size / 2;
  const lampY = size * 0.34;
  const els: string[] = [];

  for (let b = 0; b < beams; b++) {
    const begin = (b * (12 / beams)).toFixed(1);
    const span = (360 / beams) * 0.6;
    const start = -90 - span / 2 + (b * 0);
    els.push(`      <path d="M${cx} ${lampY} L${(cx - size).toFixed(1)} ${(lampY - size * 0.5).toFixed(1)} A${size} ${size} 0 0 1 ${(cx - size * 0.2).toFixed(1)} ${(lampY - size * 0.98).toFixed(1)} Z" fill="${light}" opacity="0">
        <animateTransform attributeName="transform" type="rotate" from="${start} ${cx} ${lampY}" to="${start + 360} ${cx} ${lampY}" dur="12s" begin="-${begin}s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.22;0.05;0;0" keyTimes="0;0.08;0.25;0.35;1" dur="12s" begin="-${begin}s" repeatCount="indefinite" />
      </path>`);
  }
  els.push(`      <path d="M${(cx - size * 0.09).toFixed(1)} ${size} L${(cx - size * 0.06).toFixed(1)} ${(lampY + size * 0.03).toFixed(1)} h${(size * 0.12).toFixed(1)} L${(cx + size * 0.09).toFixed(1)} ${size} Z" fill="${tower}" stroke="#52525b" stroke-width="1.5" />`);
  for (let i = 0; i < 4; i++) {
    const y = size * 0.48 + i * size * 0.11;
    const w = size * (0.07 + i * 0.008);
    els.push(`      <rect x="${(cx - w).toFixed(1)}" y="${y.toFixed(1)}" width="${(w * 2).toFixed(1)}" height="${(size * 0.02).toFixed(1)}" fill="#18181b" />`);
  }
  els.push(`      <rect x="${(cx - size * 0.075).toFixed(1)}" y="${(lampY - size * 0.045).toFixed(1)}" width="${(size * 0.15).toFixed(1)}" height="${(size * 0.075).toFixed(1)}" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5" />`);
  els.push(`      <circle cx="${cx}" cy="${lampY.toFixed(1)}" r="7" fill="${light}">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>`);

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
