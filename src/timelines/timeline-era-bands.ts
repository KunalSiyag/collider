/** Era Bands — a horizontal history strip with colored era bands and markers. */
export interface EraBandsOptions {
  eras?: Array<{ name: string; span: number; color: string }>;
}

export function createEraBands(options: EraBandsOptions = {}): string {
  const {
    eras = [
      { name: 'Sketch', span: 2, color: '#52525b' },
      { name: 'Build', span: 4, color: '#8b5cf6' },
      { name: 'Growth', span: 3, color: '#22d3ee' },
      { name: 'Mature', span: 3, color: '#4ade80' },
    ],
  } = options;

  const w = 580;
  const total = eras.reduce((s, e) => s + e.span, 0);
  const bandY = 44;
  const bandH = 26;

  let x = 0;
  const bands = eras
    .map((e, i) => {
      const bw = (e.span / total) * (w - 80);
      const bx = 40 + x;
      x += bw;
      return `<g>
        <rect x="${bx}" y="${bandY}" width="0" height="${bandH}" fill="${e.color}" opacity="0">
          <animate attributeName="width" from="0" to="${(bw - 3).toFixed(1)}" dur="0.7s" begin="${(i * 0.18).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.25 0.8 0.3 1"/>
          <animate attributeName="opacity" from="0" to="0.9" dur="0.3s" begin="${(i * 0.18).toFixed(2)}s" fill="freeze"/>
        </rect>
        <text x="${bx + bw / 2}" y="${bandY - 10}" fill="#a1a1aa" font-size="11.5" text-anchor="middle" font-family="system-ui" opacity="0">
          ${e.name}<animate attributeName="opacity" from="0" to="1" dur="0.35s" begin="${(0.4 + i * 0.18).toFixed(2)}s" fill="freeze"/>
        </text>
      </g>`;
    })
    .join('');

  // Tick marks at each boundary.
  let ticks = '';
  let tx = 40;
  eras.forEach((e) => {
    ticks += `<line x1="${tx}" y1="${bandY - 6}" x2="${tx}" y2="${bandY + bandH + 6}" stroke="#3f3f46" stroke-width="2"/>`;
    tx += (e.span / total) * (w - 80);
  });
  ticks += `<line x1="${tx}" y1="${bandY - 6}" x2="${tx}" y2="${bandY + bandH + 6}" stroke="#3f3f46" stroke-width="2"/>`;

  return `<svg viewBox="0 0 ${w} 100" width="${w}" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${bands}${ticks}
</svg>`;
}
