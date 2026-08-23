export interface IsoServerOptions {
  body?: string;
  leds?: string[];
  bays?: number;
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

export function createIsoServer(options: IsoServerOptions = {}): string {
  const { body = '#27272a', leds = ['#22c55e', '#22d3ee', '#8b5cf6', '#e4e4e7'], bays = 7 } = options;

  const W = 120;
  const D = 70;
  const bayH = 26;
  const H = bays * bayH;

  const details: string[] = [];
  for (let i = 0; i < bays; i++) {
    const z = 10 + i * bayH;
    details.push(
      `    <path d="${poly([[14, D - 4, z], [W - 26, D - 4, z], [W - 26, D - 4, z + bayH - 8], [14, D - 4, z + bayH - 8]])}" fill="#09090b" opacity="0.85" />`,
    );
    for (let slot = 0; slot < 5; slot++) {
      details.push(
        `    <path d="${poly([[24 + slot * 15, D - 3, z + 6], [32 + slot * 15, D - 3, z + 6], [32 + slot * 15, D - 3, z + 12], [24 + slot * 15, D - 3, z + 12]])}" fill="${shade(body, 1.6)}" opacity="0.9" />`,
      );
    }
    const ledColor = leds[(i * 2 + 1) % leds.length];
    details.push(
      `      <circle cx="${project(W - 12, D - 3, z + bayH / 2)[0].toFixed(1)}" cy="${project(W - 12, D - 3, z + bayH / 2)[1].toFixed(1)}" r="4" fill="${ledColor}">${i % 2 === 0 ? `<animate attributeName="opacity" values="1;0.25;1" dur="${(1.2 + i * 0.35).toFixed(2)}s" repeatCount="indefinite" />` : ''}</circle>`,
    );
  }

  return `<svg viewBox="-140 -260 300 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="5" cy="130" rx="130" ry="34" fill="#000" opacity="0.35" />
${box(-16, -16, 0, W + 32, D + 32, 10, '#3f3f46', '#2d2d31', '#202024')}
${box(0, 0, 10, W, D, H, shade(body, 1.25), shade(body, 0.95), shade(body, 0.7))}
${details.join('\n')}
</svg>`;
}
