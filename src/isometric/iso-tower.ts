export interface IsoTowerOptions {
  body?: string;
  windowColor?: string;
  accent?: string;
  floors?: number;
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

export function createIsoTower(options: IsoTowerOptions = {}): string {
  const { body = '#27272a', windowColor = '#fbbf24', accent = '#22d3ee', floors = 6 } = options;

  const W = 110;
  const D = 110;
  const H = floors * 34;

  const windows: string[] = [];
  for (let floor = 0; floor < floors; floor++) {
    for (let col = 0; col < 4; col++) {
      const lit = (floor * 7 + col * 3) % 5 !== 0;
      if (!lit) continue;
      const wx = 12 + col * 24;
      const wz = 14 + floor * 34;
      windows.push(
        `    <path d="${poly([[wx, D, wz], [wx + 13, D, wz], [wx + 13, D, wz + 18], [wx, D, wz + 18]])}" fill="${windowColor}" opacity="0.92" />`,
      );
      const rx = 12 + col * 24;
      windows.push(
        `    <path d="${poly([[W, rx, wz], [W, rx + 13, wz], [W, rx + 13, wz + 18], [W, rx, wz + 18]])}" fill="${accent}" opacity="0.55" />`,
      );
    }
  }

  return `<svg viewBox="-190 -330 400 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="10" cy="128" rx="180" ry="40" fill="#000" opacity="0.35" />
${box(-20, -20, 0, W + 40, D + 40, 14, '#3f3f46', '#2d2d31', '#202024')}
${box(0, 0, 14, W, D, H, shade(body, 1.25), shade(body, 0.95), shade(body, 0.7))}
${box(30, 30, H + 14, W - 60, D - 60, 26, shade(accent, 1.1), shade(accent, 0.75), shade(accent, 0.5))}
${windows.join('\n')}
</svg>`;
}
