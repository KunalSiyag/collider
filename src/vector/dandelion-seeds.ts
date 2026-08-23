export interface DandelionSeedsOptions {
  seed?: number;
  size?: number;
  seeds?: number;
  stemColor?: string;
  seedColor?: string;
}

export function createDandelionSeeds(options: DandelionSeedsOptions = {}): string {
  const { seed = 45, size = 720, seeds = 26, stemColor = '#3f3f46', seedColor = '#e4e4e7' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const cx = size * 0.42;
  const cy = size * 0.4;
  const R = size * 0.2;
  const els: string[] = [];
  for (let i = 0; i < seeds; i++) {
    const a = (i / seeds) * Math.PI * 2 + rnd() * 0.2;
    const rr = R * (0.85 + rnd() * 0.3);
    const ex = cx + Math.cos(a) * rr;
    const ey = cy + Math.sin(a) * rr;
    els.push(`      <line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="${stemColor}" stroke-width="0.9" opacity="0.8" />`);
    for (let b = -2; b <= 2; b++) {
      const ba = a + b * 0.35;
      els.push(`      <line x1="${ex.toFixed(1)}" y1="${ey.toFixed(1)}" x2="${(ex + Math.cos(ba) * 12).toFixed(1)}" y2="${(ey + Math.sin(ba) * 12).toFixed(1)}" stroke="${seedColor}" stroke-width="0.7" opacity="0.7" />`);
    }
    els.push(`      <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="1.6" fill="${seedColor}" />`);
  }
  for (let i = 0; i < 5; i++) {
    const dx = ((rnd() - 0.5) * size * 0.5).toFixed(0);
    els.push(`      <g>
        <animateTransform attributeName="transform" type="translate" from="${cx.toFixed(1)} ${cy.toFixed(1)}" to="${(+cx + +dx).toFixed(0)} ${(cy - size * 0.25).toFixed(0)}" dur="${(6 + rnd() * 6).toFixed(1)}s" repeatCount="indefinite" />
        <circle r="2" fill="${seedColor}" />
        <line x1="-8" x2="8" stroke="${seedColor}" stroke-width="0.6" opacity="0.7" />
        <line y1="-8" y2="8" stroke="${seedColor}" stroke-width="0.6" opacity="0.7" />
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
  <path d="M${cx} ${cy} q30 ${size * 0.18} 10 ${size * 0.55}" fill="none" stroke="#52525b" stroke-width="3" stroke-linecap="round" />
</svg>`;
}
