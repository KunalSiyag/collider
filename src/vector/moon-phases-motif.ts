export interface MoonPhasesOptions {
  size?: number;
  count?: number;
  base?: string;
  lit?: string;
}

export function createMoonPhases(options: MoonPhasesOptions = {}): string {
  const { size = 720, count = 8, base = '#27272a', lit = '#e4e4e7' } = options;
  const r = size * 0.045;
  const gapX = size / (count + 1);
  const cy = size / 2;
  const els: string[] = [];

  for (let i = 0; i < count; i++) {
    const cx = gapX * (i + 1);
    const phase = i / (count - 1);
    const k = Math.abs(Math.cos(phase * Math.PI));
    const rx = r * (1 - k) * (phase <= 0.5 ? -1 : 1);
    els.push(`      <circle cx="${cx.toFixed(1)}" cy="${cy}" r="${r.toFixed(1)}" fill="${base}" stroke="#3f3f46" stroke-width="1" />`);
    if (phase > 0 && phase < 1) {
      const sweep = rx < 0 ? 1 : 0;
      const arx = Math.abs(rx).toFixed(1);
      els.push(`      <path d="M${cx.toFixed(1)} ${(cy - r).toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 ${sweep} ${cx.toFixed(1)} ${(cy + r).toFixed(1)} A${arx} ${r.toFixed(1)} 0 0 ${1 - sweep} ${cx.toFixed(1)} ${(cy - r).toFixed(1)} Z" fill="${lit}" opacity="0.9">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="8s" begin="${(i * 0.4).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${els.join('\n')}
  </g>
</svg>`;
}
