/** Vertical Timeline — a classic left-rail timeline with staggered reveals. */
export interface VerticalTimelineOptions {
  events?: Array<{ title: string; date: string }>;
  accent?: string;
}

export function createVerticalTimeline(options: VerticalTimelineOptions = {}): string {
  const {
    events = [
      { title: 'Project kickoff', date: 'Jan 12' },
      { title: 'Design system frozen', date: 'Feb 03' },
      { title: 'Private beta', date: 'Mar 21' },
      { title: 'Public launch', date: 'May 08' },
    ],
    accent = '#8b5cf6',
  } = options;

  const rowH = 74;
  const height = events.length * rowH + 20;

  return `<svg viewBox="0 0 420 ${height}" width="420" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="30" y1="16" x2="30" y2="${height - 16}" stroke="#27272a" stroke-width="2.5"/>
  <line x1="30" y1="16" x2="30" y2="${height - 16}" stroke="${accent}" stroke-width="2.5"
    stroke-dasharray="${height}" stroke-dashoffset="${height}">
    <animate attributeName="stroke-dashoffset" from="${height}" to="0" dur="1.6s" fill="freeze" calcMode="spline" keySplines="0.3 0 0.2 1"/>
  </line>
  ${events
    .map((e, i) => {
      const y = 30 + i * rowH;
      return `<g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.45s" begin="${(0.25 + i * 0.28).toFixed(2)}s" fill="freeze"/>
        <circle cx="30" cy="${y}" r="8" fill="#0b0b10" stroke="${accent}" stroke-width="2.5">
          <animate attributeName="r" values="0;8" dur="0.35s" begin="${(0.25 + i * 0.28).toFixed(2)}s" fill="freeze"/>
        </circle>
        <text x="52" y="${y - 4}" fill="#fafafa" font-size="14.5" font-weight="600" font-family="system-ui">${e.title}</text>
        <text x="52" y="${y + 15}" fill="#71717a" font-size="12" font-family="system-ui">${e.date}</text>
      </g>`;
    })
    .join('')}
</svg>`;
}
