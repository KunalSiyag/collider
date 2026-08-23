export interface ShapeConfettiOptions {
  colors?: string[];
  count?: number;
  size?: number;
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

export function createShapeConfetti(options: ShapeConfettiOptions = {}): string {
  const {
    colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#facc15', '#4ade80'],
    count = 42,
    size = 600,
    seed = 11,
  } = options;

  const rand = mulberry32(seed);
  const pieces: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = (rand() * size).toFixed(0);
    const y = (rand() * size).toFixed(0);
    const color = colors[Math.floor(rand() * colors.length)]!;
    const rotation = Math.floor(rand() * 360);
    const kind = i % 3;
    const s = 6 + rand() * 10;
    const delay = (rand() * 3).toFixed(2);

    if (kind === 0) {
      pieces.push(
        `    <rect x="${x}" y="${y}" width="${s.toFixed(1)}" height="${(s * 0.55).toFixed(1)}" rx="2" fill="${color}" transform="rotate(${rotation} ${x} ${y})"><animateTransform attributeName="transform" type="rotate" values="${rotation} ${x} ${y};${rotation + 40} ${x} ${y};${rotation} ${x} ${y}" dur="${(3 + rand() * 3).toFixed(1)}s" begin="${delay}s" repeatCount="indefinite" /></rect>`,
      );
    } else if (kind === 1) {
      pieces.push(
        `    <circle cx="${x}" cy="${y}" r="${(s * 0.45).toFixed(1)}" fill="${color}"><animate attributeName="cy" values="${y};${Number(y) - 10};${y}" dur="${(2.5 + rand() * 3).toFixed(1)}s" begin="${delay}s" repeatCount="indefinite" /></circle>`,
      );
    } else {
      const h = (s * 0.866).toFixed(1);
      pieces.push(
        `    <polygon points="${x},${Number(y) - Number(h) / 2} ${Number(x) - Number(s) / 2},${Number(y) + Number(h) / 2} ${Number(x) + Number(s) / 2},${Number(y) + Number(h) / 2}" fill="${color}" transform="rotate(${rotation} ${x} ${y})"><animateTransform attributeName="transform" type="rotate" values="${rotation} ${x} ${y};${rotation - 35} ${x} ${y};${rotation} ${x} ${y}" dur="${(3 + rand() * 3).toFixed(1)}s" begin="${delay}s" repeatCount="indefinite" /></polygon>`,
      );
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${pieces.join('\n')}
</svg>`;
}
