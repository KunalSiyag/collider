export interface FoldedPlanesOptions {
  size?: number;
  planes?: number;
  base?: string;
  accent?: string;
}

export function createFoldedPlanes(options: FoldedPlanesOptions = {}): string {
  const { size = 720, planes = 6, base = '#1c1c24', accent = '#8b5cf6' } = options;
  const els: string[] = [];
  const cx = size / 2;
  const cy = size / 2;

  for (let i = 0; i < planes; i++) {
    const t = i / planes;
    const angle = -Math.PI / 4 + Math.sin(t * Math.PI) * 0.3;
    const len = size * (0.2 + t * 0.28);
    const w = size * (0.05 + t * 0.06);
    const ox = cx + (t - 0.5) * size * 0.4;
    const oy = cy + (0.5 - t) * size * 0.35;
    const isAccent = i === Math.floor(planes / 2);
    const color = isAccent ? accent : base;
    const ux = Math.cos(angle), uy = Math.sin(angle);
    const vx = -uy, vy = ux;
    const p = (a: number, b: number): [number, number] => [ox + ux * a + vx * b, oy + uy * a + vy * b];
    const [x1, y1] = p(0, 0);
    const [x2, y2] = p(len, -w);
    const [x3, y3] = p(len * 1.15, 0);
    const [x4, y4] = p(len, w);
    const poly = [x1, x2, x3, x4].map((_, idx) => {
      const ptsArr = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]][idx];
      return `${ptsArr[0].toFixed(1)},${ptsArr[1].toFixed(1)}`;
    }).join(' ');
    els.push(`      <polygon points="${poly}" fill="${color}" fill-opacity="${isAccent ? 0.4 : 0.9}" stroke="#3f3f46" stroke-width="1.2"${isAccent ? '>\n        <animate attributeName="fill-opacity" values="0.4;0.7;0.4" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
    els.push(`      <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x3.toFixed(1)}" y2="${y3.toFixed(1)}" stroke="#52525b" stroke-width="1" />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
