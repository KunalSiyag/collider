/** Alternating Timeline — events alternate sides of a center spine. */
export interface AlternatingTimelineOptions {
  events?: Array<{ title: string; date: string }>;
  accent?: string;
}

export function createAlternatingTimeline(options: AlternatingTimelineOptions = {}): string {
  const {
    events = [
      { title: 'Idea', date: '2023' },
      { title: 'Prototype', date: '2024' },
      { title: 'Seed round', date: '2025' },
      { title: 'Scale-up', date: '2026' },
    ],
    accent = '#22d3ee',
  } = options;

  const rowH = 78;
  const height = events.length * rowH + 16;
  const cx = 210;

  return `<svg viewBox="0 0 420 ${height}" width="420" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <line x1="${cx}" y1="10" x2="${cx}" y2="${height - 10}" stroke="#27272a" stroke-width="2.5"/>
  ${events
    .map((e, i) => {
      const y = 34 + i * rowH;
      const left = i % 2 === 0;
      const bx = left ? 24 : 246;
      return `<g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.45s" begin="${(0.2 + i * 0.3).toFixed(2)}s" fill="freeze"/>
        <animateTransform attributeName="transform" type="translate" from="${left ? -18 : 18} 0" to="0 0" dur="0.45s" begin="${(0.2 + i * 0.3).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.25 0.9 0.3 1"/>
        <circle cx="${cx}" cy="${y}" r="7" fill="${accent}"/>
        <circle cx="${cx}" cy="${y}" r="12" fill="none" stroke="${accent}" opacity="0.35"/>
        <rect x="${bx}" y="${y - 20}" width="150" height="40" rx="10" fill="#18181b" stroke="#3f3f46"/>
        <text x="${bx + 14}" y="${y - 2}" fill="#fafafa" font-size="13.5" font-weight="600" font-family="system-ui">${e.title}</text>
        <text x="${bx + 14}" y="${y + 13}" fill="#71717a" font-size="11.5" font-family="system-ui">${e.date}</text>
      </g>`;
    })
    .join('')}
</svg>`;
}
