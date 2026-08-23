export interface WormholeStripesOptions {
  size?: number;
  bands?: number;
  colors?: string[];
}

export function createWormholeStripes(options: WormholeStripesOptions = {}): string {
  const { size = 720, bands = 26, colors = ['#27272a', '#3f3f46', '#22d3ee', '#8b5cf6'] } = options;
  const c = size / 2;
  const els: string[] = [];

  for (let i = bands; i >= 1; i--) {
    const t = i / bands;
    const rx = Math.pow(t, 1.7) * c * 1.05;
    const ry = Math.pow(t, 1.7) * c * 0.38;
    const color = colors[(bands - i) % colors.length];
    const op = 0.25 + t * 0.65;
    const dur = (2 + (1 - t) * 4).toFixed(1);
    els.push(`      <ellipse cx="${c}" cy="${c}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(1 + (1 - t) * 2).toFixed(1)}" opacity="${op.toFixed(2)}">
        <animateTransform attributeName="transform" type="scale" values="1;1.04;1" additive="sum" dur="${dur}s" repeatCount="indefinite" />
      </ellipse>`);
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect width="${size}" height="${size}" fill="#0b0b10" />
  <g>
${els.join('\n')}
  </g>
  <circle cx="${c}" cy="${c}" r="6" fill="#e4e4e7">
    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>`;
}
