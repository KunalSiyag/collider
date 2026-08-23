export interface StreamerCurlOptions {
  seed?: number;
  size?: number;
  ribbons?: number;
  base?: string;
  accents?: string[];
}

export function createStreamerCurl(options: StreamerCurlOptions = {}): string {
  const { seed = 82, size = 720, ribbons = 7, base = '#27272a', accents = ['#8b5cf6', '#22d3ee', '#f472b6'] } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  for (let i = 0; i < ribbons; i++) {
    let x = size * (0.1 + rnd() * 0.8);
    let y = -10;
    let d = `M${x.toFixed(1)} ${y}`;
    while (y < size + 10) {
      const swing = size * (0.03 + rnd() * 0.05);
      const dir = rnd() > 0.5 ? 1 : -1;
      d += ` q${(dir * swing).toFixed(1)} ${(swing * 0.9).toFixed(1)} 0 ${(swing * 1.8).toFixed(1)}`;
      y += swing * 1.8;
    }
    const color = rnd() > 0.55 ? accents[Math.floor(rnd() * accents.length)] : base;
    els.push(`      <path d="${d}" fill="none" stroke="${color}" stroke-width="${(2 + rnd() * 3).toFixed(1)}" stroke-linecap="round" opacity="${color === base ? 0.7 : 0.9}">
        <animateTransform attributeName="transform" type="rotate" values="-2 ${size / 2} 0; 2 ${size / 2} 0; -2 ${size / 2} 0" dur="${(6 + rnd() * 6).toFixed(1)}s" repeatCount="indefinite" />
      </path>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
