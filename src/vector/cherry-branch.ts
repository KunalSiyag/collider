export interface CherryBranchOptions {
  seed?: number;
  size?: number;
  blossoms?: number;
  branch?: string;
  accent?: string;
}

export function createCherryBranch(options: CherryBranchOptions = {}): string {
  const { seed = 91, size = 720, blossoms = 16, branch = '#3f3f46', accent = '#f472b6' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  const main = `M-10 ${size * 0.12} Q${size * 0.3} ${size * 0.18} ${size * 0.52} ${size * 0.34} T${size * 0.95} ${size * 0.62}`;
  els.push(`      <path d="${main}" fill="none" stroke="${branch}" stroke-width="7" stroke-linecap="round" />`);
  for (let i = 0; i < 5; i++) {
    const t = 0.15 + (i / 5) * 0.8;
    const px = -10 + (size + 20) * t;
    els.push(`      <path d="M${px.toFixed(1)} ${(size * 0.12 + (size * 0.5) * t * t).toFixed(1)} q${(20 + rnd() * 40).toFixed(1)} ${(-30 - rnd() * 50).toFixed(1)} ${(60 + rnd() * 60).toFixed(1)} ${(-20 - rnd() * 40).toFixed(1)}" fill="none" stroke="${branch}" stroke-width="3" />`);
  }

  const petals: string[] = [];
  for (let i = 0; i < blossoms; i++) {
    const x = rnd() * size;
    const y = size * 0.1 + rnd() * size * 0.55;
    const r = size * (0.006 + rnd() * 0.008);
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2;
      petals.push(`        <ellipse cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" rx="${(r * 0.75).toFixed(1)}" ry="${(r * 0.55).toFixed(1)}" fill="${accent}" opacity="0.55" transform="rotate(${((a * 180) / Math.PI).toFixed(0)} ${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)})" />`);
    }
    petals.push(`        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#fbbf24" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
  <g>
${petals.join('\n')}
  </g>
</svg>`;
}
