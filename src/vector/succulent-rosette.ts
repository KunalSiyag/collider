export interface SucculentRosetteOptions {
  size?: number;
  layers?: number;
  perLayer?: number;
  base?: string;
  accent?: string;
}

export function createSucculentRosette(options: SucculentRosetteOptions = {}): string {
  const { size = 720, layers = 5, perLayer = 8, base = '#27272a', accent = '#67e8f9' } = options;
  const c = size / 2;
  const petals: string[] = [];

  for (let l = layers; l >= 1; l--) {
    const count = perLayer + (layers - l) * 3;
    const rOut = size * 0.44 * (l / layers);
    const rIn = rOut * 0.25;
    const width = Math.PI / count * (0.9 + l * 0.05);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + l * 0.35;
      const tipX = c + Math.cos(a) * rOut;
      const tipY = c + Math.sin(a) * rOut;
      const b1 = a - width, b2 = a + width;
      const p1x = c + Math.cos(b1) * rIn, p1y = c + Math.sin(b1) * rIn;
      const p2x = c + Math.cos(b2) * rIn, p2y = c + Math.sin(b2) * rIn;
      const color = (l === 1 && i === 0) ? accent : base;
      petals.push(`      <path d="M${p1x.toFixed(1)} ${p1y.toFixed(1)} Q${(c + Math.cos(a - width * 0.4) * rOut).toFixed(1)} ${(c + Math.sin(a - width * 0.4) * rOut).toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)} Q${(c + Math.cos(a + width * 0.4) * rOut).toFixed(1)} ${(c + Math.sin(a + width * 0.4) * rOut).toFixed(1)} ${p2x.toFixed(1)} ${p2y.toFixed(1)} Z" fill="${color}" fill-opacity="${l % 2 ? 0.85 : 0.55}" stroke="#3f3f46" stroke-width="1"${color === accent ? '>\n          <animate attributeName="fill-opacity" values="0.6;1;0.6" dur="6s" repeatCount="indefinite" />\n        ' : ''} />`);
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${petals.join('\n')}
</svg>`;
}
