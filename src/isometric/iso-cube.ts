export interface IsoCubesOptions {
  colorA?: string;
  colorB?: string;
  colorC?: string;
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

export function createIsoCubes(options: IsoCubesOptions = {}): string {
  const { colorA = '#8b5cf6', colorB = '#22d3ee', colorC = '#f472b6' } = options;
  const s = 70;

  return `<svg viewBox="-230 -160 460 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="10" cy="150" rx="200" ry="46" fill="#000" opacity="0.35" />
${box(-s * 2, 0, 0, s, s, s, shade(colorA, 1.15), shade(colorA, 0.85), shade(colorA, 0.62))}
${box(-s, -s, 0, s, s, s, shade(colorB, 1.15), shade(colorB, 0.85), shade(colorB, 0.62))}
${box(0, -s * 2, 0, s, s, s, shade(colorC, 1.15), shade(colorC, 0.85), shade(colorC, 0.62))}
${box(-s, 0, s, s, s, s, shade('#fafafa', 1.05), shade('#e4e4e7', 0.95), shade('#a1a1aa', 0.75))}
</svg>`;
}
