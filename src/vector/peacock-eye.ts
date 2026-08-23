export interface PeacockEyeOptions {
  size?: number;
  rings?: number;
  colors?: string[];
}

export function createPeacockEye(options: PeacockEyeOptions = {}): string {
  const { size = 720, rings = 6, colors = ['#22d3ee', '#67e8f9', '#8b5cf6', '#f472b6', '#fbbf24', '#a78bfa'] } = options;
  const c: [number, number] = [size / 2, size * 0.58];
  const els: string[] = [];
  const barbs = 26;

  for (let i = 0; i < barbs; i++) {
    const a = -Math.PI / 2 + (i / (barbs - 1) - 0.5) * Math.PI * 1.5;
    const len = size * 0.44 * Math.cos((i / (barbs - 1) - 0.5) * 2.2);
    els.push(`      <line x1="${c[0]}" y1="${c[1]}" x2="${(c[0] + Math.cos(a) * len).toFixed(1)}" y2="${(c[1] + Math.sin(a) * len).toFixed(1)}" stroke="#27272a" stroke-width="3" stroke-linecap="round" opacity="0.8" />`);
  }
  for (let i = rings; i >= 1; i--) {
    const r = size * 0.06 * i * 0.85 + 4;
    const color = colors[(rings - i) % colors.length];
    els.push(`      <ellipse cx="${c[0]}" cy="${c[1]}" rx="${(r * 0.82).toFixed(1)}" ry="${r.toFixed(1)}" fill="${color}" fill-opacity="${i === 1 ? 0.9 : 0.28}" stroke="${color}" stroke-width="1.4"${i === 1 ? '>\n        <animate attributeName="fill-opacity" values="0.9;0.45;0.9" dur="5s" repeatCount="indefinite" />\n      ' : ''} />`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
${els.join('\n')}
</svg>`;
}
