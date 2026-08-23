export interface GlassShardsOptions {
  seed?: number;
  size?: number;
  shards?: number;
  base?: string;
  accents?: string[];
}

export function createGlassShards(options: GlassShardsOptions = {}): string {
  const { seed = 77, size = 720, shards = 26, base = '#15151d', accents = ['#8b5cf6', '#67e8f9', '#f472b6'] } = options;

  let t = seed >>> 0;
  const rand = () => {
    t |= 0; t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const cx = size / 2;
  const cy = size / 2;
  const polys: string[] = [];
  for (let i = 0; i < shards; i++) {
    const a0 = rand() * Math.PI * 2;
    const a1 = a0 + 0.35 + rand() * 0.7;
    const r0 = size * (0.06 + rand() * 0.2);
    const r1 = size * (0.3 + rand() * 0.22);
    const pts: string[] = [];
    for (const [a, r] of [[a0, r0], [a1, r0], [(a0 + a1) / 2, r1]] as const) {
      pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
    }
    const color = i % 4 === 3 ? accents[i % accents.length] : base;
    polys.push(
      `    <polygon points="${pts.join(' ')}" fill="${color}" fill-opacity="${color === base ? 0.9 : 0.28}" stroke="#3f3f46" stroke-width="1" />`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${polys.join('\n')}
</svg>`;
}
