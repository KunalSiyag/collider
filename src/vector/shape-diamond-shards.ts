export interface ShapeDiamondShardsOptions {
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

export function createShapeDiamondShards(options: ShapeDiamondShardsOptions = {}): string {
  const { colors = ['#8b5cf6', '#22d3ee', '#f472b6', '#a78bfa'], size = 320, count = 16, seed = 61 } = options;
  const rand = mulberry32(seed);
  const shards: string[] = [];

  for (let i = 0; i < count; i++) {
    const cx = 30 + rand() * (size - 60);
    const cy = 30 + rand() * (size - 60);
    const s = 12 + rand() * 26;
    const rot = Math.floor(rand() * 90);
    const color = colors[Math.floor(rand() * colors.length)]!;
    shards.push(
      `  <polygon points="${cx},${cy - s} ${cx + s * 0.55},${cy} ${cx},${cy + s} ${cx - s * 0.55},${cy}" fill="${color}" opacity="${(0.55 + rand() * 0.45).toFixed(2)}" transform="rotate(${rot} ${cx.toFixed(0)} ${cy.toFixed(0)})"><animateTransform attributeName="transform" type="rotate" from="${rot} ${cx.toFixed(0)} ${cy.toFixed(0)}" to="${rot + 180} ${cx.toFixed(0)} ${cy.toFixed(0)}" dur="${(8 + rand() * 8).toFixed(1)}s" repeatCount="indefinite" /></polygon>`,
    );
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<rect width="${size}" height="${size}" fill="#0b0b10" />
${shards.join('\n')}
</svg>`;
}
