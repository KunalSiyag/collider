/** Journey Curve — a winding dotted road with stops lighting up in order. */
export interface JourneyCurveOptions {
  stops?: string[];
  accent?: string;
}

export function createJourneyCurve(options: JourneyCurveOptions = {}): string {
  const {
    stops = ['Sign up', 'First project', 'Invite team', 'Ship'],
    accent = '#fbbf24',
  } = options;
  const w = 560, h = 300;
  const path = 'M60 250 C 180 250 140 90 280 90 C 420 90 380 210 500 210';
  // Even-ish sample points along the curve for stop placement.
  const pts = stops.map((_, i) => {
    const t = i / (stops.length - 1);
    // Approximate positions matching the bezier above.
    const x = 60 + t * 440;
    const y = t < 0.5 ? 250 - Math.sin(t * 2 * Math.PI) * 0 - (t < 0.5 ? (1 - Math.cos(t * Math.PI * 1.0)) * 0 : 0) : 210;
    return { x: [60, 210, 350, 500][i] ?? x, y: [250, 90, 210, 210][i] ?? y };
  });

  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="${path}" fill="none" stroke="#27272a" stroke-width="4" stroke-linecap="round"/>
  <path d="${path}" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"
    stroke-dasharray="10 12" stroke-dashoffset="600">
    <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2.4s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
  </path>
  ${pts
    .map((p, i) => `<g opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${(0.5 + i * 0.55).toFixed(2)}s" fill="freeze"/>
      <circle cx="${p.x}" cy="${p.y}" r="9" fill="#0b0b10" stroke="${accent}" stroke-width="3"/>
      <text x="${p.x}" y="${p.y + (i === 1 ? -18 : 30)}" fill="#e4e4e7" font-size="13" font-weight="600" text-anchor="middle" font-family="system-ui">${stops[i]}</text>
    </g>`)
    .join('')}
</svg>`;
}
