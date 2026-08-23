export interface ShapeRaindropsOptions {
  colors?: string[];
  size?: number;
  count?: number;
  seed?: number;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createShapeRaindrops(options: ShapeRaindropsOptions = {}): string {
  const { colors = ['#22d3ee', '#67e8f9', '#a78bfa'], size = 320, count = 14, seed = 5 } = options;
  const rand = mulberry32(seed);
  const drops: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = rand() * size;
    const s = 8 + rand() * 8;
    const dur = 2 + rand() * 2.5;
    const delay = (rand() * 3).toFixed(2);
    drops.push(
      `  <path d="M ${x.toFixed(0)} 0 c ${(-s / 2).toFixed(1)} ${(s).toFixed(1)} ${(-s / 2).toFixed(1)} ${(s * 1.4).toFixed(1)} 0 ${(s * 1.4).toFixed(1)} c ${(s / 2).toFixed(1)} ${(-s * 0.4).toFixed(1)} 0 ${(s * 0.6).toFixed(1)} 0 ${(-s * 1.4).toFixed(1)}" fill="${colors[i % colors.length]}" transform="rotate(12 ${x.toFixed(0)} 0)">
    <animate attributeName="cy" values="-40;${size + 40}" dur="${dur.toFixed(1)}s" begin="${delay}s" repeatCount="indefinite" />
    <animateTransform attributeName="transform" type="translate" from="${x.toFixed(0)} -40" to="${(x - 30).toFixed(0)} ${size + 40}" dur="${dur.toFixed(1)}s" begin="${delay}s" repeatCount="indefinite" additive="sum" />
  </path>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${drops.join('\n')}
</svg>`;
}
