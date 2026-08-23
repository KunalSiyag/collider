export interface StepPyramidOptions {
  size?: number;
  steps?: number;
  base?: string;
  accent?: string;
}

export function createStepPyramid(options: StepPyramidOptions = {}): string {
  const { size = 720, steps = 9, base = '#1c1c24', accent = '#fbbf24' } = options;
  const els: string[] = [];
  const baseW = size * 0.86;
  const stepH = size * 0.62 / steps;
  const cx = size / 2;

  for (let i = 0; i < steps; i++) {
    const w = baseW * (1 - i / steps);
    const y = size * 0.94 - (i + 1) * stepH;
    const isTop = i === steps - 1;
    const color = isTop ? accent : base;
    els.push(`      <rect x="${(cx - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${stepH.toFixed(1)}" fill="${color}" fill-opacity="${isTop ? 0.35 : 1}" stroke="#3f3f46" stroke-width="1"${isTop ? '>\n        <animate attributeName="fill-opacity" values="0.35;0.7;0.35" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
    if (!isTop && i % 2 === 0) {
      for (let b = 1; b < 4; b++) {
        const bx = cx - w / 2 + (w * b) / 4;
        els.push(`      <line x1="${bx.toFixed(1)}" y1="${y.toFixed(1)}" x2="${bx.toFixed(1)}" y2="${(y + stepH).toFixed(1)}" stroke="#27272a" stroke-width="0.8" />`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
