export interface RubbertoOptions {
  size?: number;
}

export function createRubberto(options: RubbertoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#0e7490" opacity=".4"/>
  <path d="M14 86 Q24 90 34 86 Q44 82 54 86 Q64 90 74 86 L84 86" stroke="#22d3ee" stroke-width="2.5" fill="none" opacity=".7">
    <animate attributeName="d" values="M14 86 Q24 90 34 86 Q44 82 54 86 Q64 90 74 86 L84 86;M14 86 Q24 82 34 86 Q44 90 54 86 Q64 82 74 86 L84 86;M14 86 Q24 90 34 86 Q44 82 54 86 Q64 90 74 86 L84 86" dur="2.2s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 84;2 48 84;-2 48 84" dur="2.6s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="70" rx="20" ry="14" fill="#fde047"/>
    <circle cx="38" cy="50" r="13" fill="#fef08a"/>
    <path d="M26 48 L12 50 Q14 56 26 54 Z" fill="#fb923c"/>
    <circle cx="34" cy="47" r="3" fill="#fff"/>
    <circle cx="34" cy="47" r="1.5" fill="#1c1917"/>
    <path d="M40 34 Q44 26 50 30" stroke="#eab308" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M42 74 L38 82 M54 74 L58 82" stroke="#facc15" stroke-width="4" stroke-linecap="round"/>
    <path d="M36 82 h6 M56 82 h6" stroke="#fb923c" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="44" cy="66" rx="3" ry="2" fill="#fbbf24" opacity=".8"/>
    <path d="M56 64 q4 2 3 6" stroke="#eab308" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
