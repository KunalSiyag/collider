export interface IsoBoxesOptions {
  cardboard?: string;
  tape?: string;
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

function parcel(ox: number, oy: number, oz: number, s: number, h: number, cardboard: string, tape: string): string {
  const parts: string[] = [];
  parts.push(box(ox, oy, oz, s, s, h, shade(cardboard, 1.18), shade(cardboard, 0.88), shade(cardboard, 0.62)));
  parts.push(`    <path d="${poly([[ox + s / 2 - 5, oy, oz + h], [ox + s / 2 + 5, oy, oz + h], [ox + s / 2 + 5, oy + s, oz + h], [ox + s / 2 - 5, oy + s, oz + h]])}" fill="${tape}" />`);
  parts.push(`    <path d="${poly([[ox, oy + s / 2 - 5, oz + h], [ox + s, oy + s / 2 - 5, oz + h], [ox + s, oy + s / 2 + 5, oz + h], [ox, oy + s / 2 + 5, oz + h]])}" fill="${tape}" opacity="0.85" />`);
  return parts.join('\n');
}

export function createIsoBoxes(options: IsoBoxesOptions = {}): string {
  const { cardboard = '#b48a5a', tape = '#d4a373' } = options;

  return `<svg viewBox="-230 -170 460 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="8" cy="140" rx="200" ry="44" fill="#000" opacity="0.35" />
${parcel(-130, -20, 0, 110, 80, cardboard, tape)}
${parcel(-15, -95, 0, 100, 70, shade(cardboard, 0.92), tape)}
${parcel(-30, 10, 80, 90, 62, shade(cardboard, 1.06), tape)}
</svg>`;
}
