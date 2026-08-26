/** Horizontal Milestones — a progress track with a dot travelling between stops. */
export interface HorizontalMilestonesOptions {
  milestones?: string[];
  accent?: string;
}

export function createHorizontalMilestones(options: HorizontalMilestonesOptions = {}): string {
  const {
    milestones = ['Discovery', 'Alpha', 'Beta', 'GA'],
    accent = '#4ade80',
  } = options;

  const w = 560;
  const pad = 60;
  const y = 56;
  const gap = (w - pad * 2) / (milestones.length - 1);

  const stops = milestones
    .map((m, i) => {
      const x = pad + gap * i;
      return `<g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="${(0.3 + i * 0.35).toFixed(2)}s" fill="freeze"/>
        <circle cx="${x}" cy="${y}" r="9" fill="#0b0b10" stroke="${accent}" stroke-width="2.5"/>
        <circle cx="${x}" cy="${y}" r="3.4" fill="${accent}">
          <animate attributeName="r" values="3.4;4.4;3.4" dur="2.2s" begin="${(0.5 + i * 0.35).toFixed(2)}s" repeatCount="indefinite"/>
        </circle>
        <text x="${x}" y="${y - 20}" fill="#fafafa" font-size="12.5" font-weight="600" text-anchor="middle" font-family="system-ui">${m}</text>
      </g>`;
    })
    .join('');

  return `<svg viewBox="0 0 ${w} 100" width="${w}" height="100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="#27272a" stroke-width="3"/>
  <line x1="${pad}" y1="${y}" x2="${w - pad}" y2="${y}" stroke="${accent}" stroke-width="3"
    stroke-dasharray="${w - pad * 2}" stroke-dashoffset="${w - pad * 2}">
    <animate attributeName="stroke-dashoffset" from="${w - pad * 2}" to="0" dur="1.8s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
  </line>
  <!-- traveller dot looping end-to-end -->
  <circle r="6" fill="${accent}" opacity="0.85">
    <animate attributeName="cx" values="${pad};${w - pad}" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.1;0.9;1" dur="4s" repeatCount="indefinite"/>
  </circle>
  ${stops}
</svg>`;
}
