export interface SeismographTraceOptions {
  seed?: number;
  size?: number;
  rows?: number;
  base?: string;
  accent?: string;
}

export function createSeismographTrace(options: SeismographTraceOptions = {}): string {
  const { seed = 55, size = 720, rows = 6, base = '#3f3f46', accent = '#22d3ee' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let row = 0; row < rows; row++) {
    const cy = (row + 0.5) * (size / rows);
    els.push(`      <line x1="0" y1="${cy.toFixed(1)}" x2="${size}" y2="${cy.toFixed(1)}" stroke="#27272a" stroke-width="0.8" />`);
    const isMain = row === Math.floor(rows / 2);
    let d = `M0 ${cy.toFixed(1)}`;
    for (let x = 0; x <= size; x += 6) {
      const quakeZone = x > size * 0.3 && x < size * 0.62;
      const amp = quakeZone ? rnd() * size * 0.055 : rnd() * 3;
      d += ` L${x} ${(cy - amp).toFixed(1)}`;
    }
    els.push(`      <path d="${d}" fill="none" stroke="${isMain ? accent : base}" stroke-width="${isMain ? 2 : 1.2}" opacity="${isMain ? 1 : 0.65}">
        <animate attributeName="stroke-opacity" values="1;0.5;1" dur="${(3 + row).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${els.join('\n')}
  </g>
</svg>`;
}
