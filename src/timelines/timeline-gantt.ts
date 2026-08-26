/** Gantt Bars — task bars growing along a shared time axis with today marker. */
export interface GanttBarsOptions {
  tasks?: Array<{ name: string; start: number; span: number; color: string }>;
  weeks?: number;
}

export function createGanttBars(options: GanttBarsOptions = {}): string {
  const {
    tasks = [
      { name: 'Research', start: 0, span: 3, color: '#8b5cf6' },
      { name: 'Design', start: 2, span: 4, color: '#22d3ee' },
      { name: 'Build', start: 4, span: 6, color: '#4ade80' },
      { name: 'QA + launch', start: 8, span: 3, color: '#fbbf24' },
    ],
    weeks = 12,
  } = options;

  const labelW = 96;
  const trackW = 460;
  const rowH = 46;
  const height = tasks.length * rowH + 44;
  const colW = trackW / weeks;
  const today = 7;

  const grid = Array.from({ length: weeks + 1 }, (_, i) =>
    `<line x1="${labelW + i * colW}" y1="26" x2="${labelW + i * colW}" y2="${height - 26}" stroke="#1c1c22" stroke-width="1"/>`).join('');

  return `<svg viewBox="0 0 ${labelW + trackW} ${height}" width="${labelW + trackW}" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${grid}
  ${tasks
    .map((t, i) => {
      const y = 34 + i * rowH;
      const x = labelW + t.start * colW;
      const w = t.span * colW;
      return `<g>
        <text x="0" y="${y + 16}" fill="#a1a1aa" font-size="12.5" font-family="system-ui">${t.name}</text>
        <rect x="${x}" y="${y}" width="0" height="24" rx="7" fill="${t.color}" opacity="0">
          <animate attributeName="width" from="0" to="${w.toFixed(1)}" dur="0.8s" begin="${(i * 0.15).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.25 0.8 0.3 1"/>
          <animate attributeName="opacity" from="0" to="0.92" dur="0.3s" begin="${(i * 0.15).toFixed(2)}s" fill="freeze"/>
        </rect>
      </g>`;
    })
    .join('')}
  <line x1="${labelW + today * colW}" y1="26" x2="${labelW + today * colW}" y2="${height - 26}" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 4" opacity="0">
    <animate attributeName="opacity" from="0" to="0.8" dur="0.4s" begin="1.2s" fill="freeze"/>
  </line>
  <text x="${labelW + today * colW}" y="18" fill="#ef4444" font-size="10.5" text-anchor="middle" font-family="system-ui" opacity="0">
    today<animate attributeName="opacity" from="0" to="0.9" dur="0.4s" begin="1.2s" fill="freeze"/>
  </text>
</svg>`;
}
