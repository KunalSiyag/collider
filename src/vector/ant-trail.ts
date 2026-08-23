export interface AntTrailOptions {
  seed?: number;
  size?: number;
  ants?: number;
  path?: string;
  accent?: string;
}

export function createAntTrail(options: AntTrailOptions = {}): string {
  const { seed = 3, size = 720, ants = 14, path: pathColor = '#3f3f46', accent = '#fbbf24' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const pts: [number, number][] = [];
  let x = size * 0.08;
  let y = size * 0.85;
  while (x < size * 0.92) {
    pts.push([x, y]);
    x += size * 0.07 + rnd() * 20;
    y += (rnd() - 0.5) * size * 0.12;
    y = Math.max(size * 0.2, Math.min(size * 0.88, y));
  }
  const d = 'M' + pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L');

  const els: string[] = [];
  for (let i = 0; i < ants; i++) {
    const dur = (6 + rnd() * 8).toFixed(1);
    els.push(`      <g>
        <ellipse rx="5" ry="3" fill="${i % 5 === 0 ? accent : '#a1a1aa'}" />
        <circle cx="-4" r="2" fill="${i % 5 === 0 ? accent : '#a1a1aa'}" />
        <animateMotion dur="${dur}s" repeatCount="indefinite" rotate="auto" path="${d}" />
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <path d="${d}" fill="none" stroke="${pathColor}" stroke-width="1.4" stroke-dasharray="2 7" opacity="0.7" />
${els.join('\n')}
</svg>`;
}
