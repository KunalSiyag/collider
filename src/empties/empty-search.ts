/** Empty Search — a magnifier sweeping over dunes with "no results". */
export interface EmptySearchOptions {
  accent?: string;
  label?: string;
  query?: string;
}

export function createEmptySearch(options: EmptySearchOptions = {}): string {
  const { accent = '#22d3ee', label = 'No results for', query = '"zzzx"' } = options;
  return `<svg viewBox="0 0 260 200" width="260" height="200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="130" cy="168" rx="86" ry="10" fill="#18181b"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="-14 0;14 0;-14 0" dur="4.4s" repeatCount="indefinite"/>
    <circle cx="118" cy="86" r="34" fill="none" stroke="${accent}" stroke-width="5" opacity="0.9"/>
    <line x1="143" y1="111" x2="166" y2="134" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
    <text x="118" y="93" text-anchor="middle" fill="#3f3f46" font-size="17" font-weight="700" font-family="ui-monospace,monospace">?</text>
  </g>
  <text x="130" y="160" text-anchor="middle" fill="#71717a" font-size="12.5" font-family="system-ui">${label} <tspan fill="#a1a1aa" font-weight="700">${query}</tspan></text>
</svg>`;
}
