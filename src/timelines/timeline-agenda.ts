/** Day Agenda — schedule rows sliding in with a now-line sweeping the day. */
export interface DayAgendaOptions {
  items?: Array<{ time: string; title: string; tone: string }>;
}

export function createDayAgenda(options: DayAgendaOptions = {}): string {
  const {
    items = [
      { time: '09:00', title: 'Standup', tone: '#8b5cf6' },
      { time: '10:00', title: 'Design review', tone: '#22d3ee' },
      { time: '13:30', title: 'Deep work', tone: '#4ade80' },
      { time: '16:00', title: 'Retro', tone: '#fbbf24' },
    ],
  } = options;

  const rowH = 58;
  const height = items.length * rowH + 16;

  return `<svg viewBox="0 0 440 ${height}" width="440" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  ${items
    .map((it, i) => {
      const y = 12 + i * rowH;
      return `<g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.45s" begin="${(i * 0.16).toFixed(2)}s" fill="freeze"/>
        <animateTransform attributeName="transform" type="translate" from="-24 0" to="0 0" dur="0.5s" begin="${(i * 0.16).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.25 0.9 0.3 1"/>
        <rect x="64" y="${y}" width="360" height="44" rx="11" fill="#18181b" stroke="#27272a"/>
        <rect x="64" y="${y}" width="5" height="44" rx="2.5" fill="${it.tone}"/>
        <text x="84" y="${y + 27}" fill="#fafafa" font-size="14" font-weight="600" font-family="system-ui">${it.title}</text>
        <text x="0" y="${y + 27}" fill="#71717a" font-size="12.5" font-family="ui-monospace,monospace">${it.time}</text>
      </g>`;
    })
    .join('')}
  <!-- now indicator sweeping down the day -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.85;1" dur="6s" begin="1s" repeatCount="indefinite"/>
    <line x1="64" y1="0" x2="424" y2="0" stroke="#ef4444" stroke-width="2">
      <animate attributeName="y1" values="16;${height - 8}" dur="6s" begin="1s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="16;${height - 8}" dur="6s" begin="1s" repeatCount="indefinite"/>
    </line>
    <circle cx="64" r="4" fill="#ef4444">
      <animate attributeName="cy" values="16;${height - 8}" dur="6s" begin="1s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>`;
}
