export interface FishSchoolOptions {
  seed?: number;
  size?: number;
  fish?: number;
  base?: string;
  accent?: string;
}

export function createFishSchool(options: FishSchoolOptions = {}): string {
  const { seed = 34, size = 720, fish = 22, base = '#3f3f46', accent = '#67e8f9' } = options;

  let s = seed >>> 0;
  const rnd = () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const els: string[] = [];
  const cx = size * 0.5;
  const cy = size * 0.52;
  for (let i = 0; i < fish; i++) {
    const a = rnd() * Math.PI * 2;
    const d = Math.pow(rnd(), 0.7) * size * 0.3;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d * 0.8;
    const len = size * (0.02 + rnd() * 0.03);
    const ang = (Math.atan2(cy - y, cx - x) * 180 / Math.PI).toFixed(1);
    const color = rnd() > 0.85 ? accent : base;
    els.push(`      <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang})">
        <ellipse rx="${len.toFixed(1)}" ry="${(len * 0.42).toFixed(1)}" fill="${color}" />
        <path d="M${(-len).toFixed(1)} 0 l${(-len * 0.55).toFixed(1)} -${(len * 0.4).toFixed(1)} v${(len * 0.8).toFixed(1)} Z" fill="${color}" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="-12;12;-12" dur="${(0.8 + rnd()).toFixed(2)}s" repeatCount="indefinite" />
        </path>
      </g>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
