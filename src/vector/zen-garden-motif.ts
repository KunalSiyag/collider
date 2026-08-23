export interface ZenGardenOptions {
  size?: number;
  lines?: number;
  stroke?: string;
  accent?: string;
}

export function createZenGarden(options: ZenGardenOptions = {}): string {
  const { size = 720, lines = 26, stroke = '#3f3f46', accent = '#8b5cf6' } = options;
  const cx = size * 0.62;
  const cy = size * 0.55;
  const rockRx = size * 0.16;
  const rockRy = size * 0.1;
  const els: string[] = [];

  for (let i = 0; i < lines; i++) {
    const t = i / (lines - 1);
    const y = size * 0.08 + t * size * 0.84;
    const distY = Math.abs(y - cy) / rockRy;
    const bulge = distY < 1.6 ? Math.sqrt(Math.max(0, 1.6 * 1.6 - distY * distY)) * rockRx * 0.9 : 0;
    els.push(`      <path d="M${(size * 0.06 - bulge).toFixed(1)} ${y.toFixed(1)} L${(size * 0.94 + bulge).toFixed(1)} ${y.toFixed(1)}" stroke="${stroke}" stroke-width="1" opacity="${(0.5 + t * 0.4).toFixed(2)}">
        <animate attributeName="opacity" values="${(0.4).toFixed(2)};${(0.85).toFixed(2)};${(0.4).toFixed(2)}" dur="${(7 + i % 6).toFixed(1)}s" begin="${(i * 0.12).toFixed(2)}s" repeatCount="indefinite" />
      </path>`);
  }
  els.push(`      <ellipse cx="${cx}" cy="${cy}" rx="${rockRx}" ry="${rockRy}" fill="#18181b" stroke="#52525b" stroke-width="1.5" />`);
  els.push(`      <path d="M${cx - rockRx * 0.5} ${cy - rockRy * 0.35} q${rockRx * 0.5} ${-rockRy * 0.6} ${rockRx} 0" fill="none" stroke="#3f3f46" stroke-width="1" />`);
  void accent;

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
