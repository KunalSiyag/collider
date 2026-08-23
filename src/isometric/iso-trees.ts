export interface IsoTreesOptions {
  trunk?: string;
  leafA?: string;
  leafB?: string;
  grass?: string;
}

const K = 0.866;

function project(x: number, y: number, z: number): [number, number] {
  return [(x - y) * K, (x + y) * 0.5 - z];
}

function poly(points: Array<[number, number, number]>): string {
  const projected = points.map(([x, y, z]) => project(x, y, z));
  return projected.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ') + ' Z';
}

function box(
  ox: number,
  oy: number,
  oz: number,
  w: number,
  d: number,
  h: number,
  top: string,
  left: string,
  right: string,
): string {
  return [
    `    <path d="${poly([[ox, oy + d, oz + h], [ox + w, oy + d, oz + h], [ox + w, oy, oz + h], [ox, oy, oz + h]])}" fill="${top}" />`,
    `    <path d="${poly([[ox, oy + d, oz], [ox + w, oy + d, oz], [ox + w, oy + d, oz + h], [ox, oy + d, oz + h]])}" fill="${left}" />`,
    `    <path d="${poly([[ox + w, oy + d, oz], [ox + w, oy, oz], [ox + w, oy, oz + h], [ox + w, oy + d, oz + h]])}" fill="${right}" />`,
  ].join('\n');
}

function shade(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * factor));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * factor));
  const b = Math.min(255, Math.round((n & 255) * factor));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function tree(x: number, y: number, baseZ: number, scale: number, trunk: string, leaf: string): string {
  const t = 10 * scale;
  const parts: string[] = [];
  parts.push(box(x, y, baseZ, t, t, 26 * scale, shade(trunk, 1.2), shade(trunk, 0.85), shade(trunk, 0.6)));
  let canopyZ = baseZ + 26 * scale;
  for (let i = 0; i < 3; i++) {
    const s = (52 - i * 13) * scale;
    const offset = ((52 * scale) - s) / 2;
    parts.push(
      box(x - offset / 1.4, y - offset / 1.4, canopyZ, s, s, 20 * scale, shade(leaf, 1.25), shade(leaf, 0.9), shade(leaf, 0.62)),
    );
    canopyZ += 20 * scale;
  }
  return parts.join('\n');
}

export function createIsoTrees(options: IsoTreesOptions = {}): string {
  const { trunk = '#7c4a21', leafA = '#22c55e', leafB = '#16a34a', grass = '#3f6212' } = options;

  return `<svg viewBox="-260 -190 520 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="5" cy="128" rx="230" ry="50" fill="#000" opacity="0.35" />
${box(-150, -90, 0, 300, 220, 22, shade(grass, 1.35), shade(grass, 0.9), shade(grass, 0.6))}
${tree(-95, -55, 22, 0.9, trunk, leafB)}
${tree(20, -20, 22, 1.15, trunk, leafA)}
${tree(-35, 45, 22, 0.7, trunk, leafA)}
</svg>`;
}
