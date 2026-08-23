export interface CoglingOptions {
  size?: number;
}

export function createCogling(options: CoglingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.8s" repeatCount="indefinite"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" values="0 48 52;360 48 52" dur="12s" repeatCount="indefinite"/>
      <circle cx="48" cy="52" r="26" fill="#d97706"/>
      <g fill="#b45309">
        <rect x="45" y="20" width="6" height="8" rx="1.5"/><rect x="45" y="76" width="6" height="8" rx="1.5"/>
        <rect x="13" y="49" width="8" height="6" rx="1.5"/><rect x="75" y="49" width="8" height="6" rx="1.5"/>
        <rect x="23" y="27" width="6" height="8" rx="1.5" transform="rotate(-45 26 31)"/>
        <rect x="67" y="27" width="6" height="8" rx="1.5" transform="rotate(45 70 31)"/>
        <rect x="23" y="69" width="6" height="8" rx="1.5" transform="rotate(45 26 73)"/>
        <rect x="67" y="69" width="6" height="8" rx="1.5" transform="rotate(-45 70 73)"/>
      </g>
      <circle cx="48" cy="52" r="18" fill="#fbbf24"/>
    </g>
    <circle cx="48" cy="52" r="10" fill="#78350f"/>
    <circle cx="48" cy="52" r="7" fill="#fef3c7"/>
    <circle cx="45.5" cy="51" r="1.8" fill="#1c1917"/>
    <circle cx="50.5" cy="51" r="1.8" fill="#1c1917"/>
    <path d="M45 56 Q48 58.5 51 56" stroke="#1c1917" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <line x1="48" y1="52" x2="48" y2="46.5" stroke="#dc2626" stroke-width="1.6" stroke-linecap="round">
      <animateTransform attributeName="transform" type="rotate" values="0 48 52;360 48 52" dur="3s" repeatCount="indefinite"/>
    </line>
    <ellipse cx="38" cy="84" rx="6" ry="3" fill="#92400e"/>
    <ellipse cx="58" cy="84" rx="6" ry="3" fill="#92400e"/>
  </g>
</svg>`;
}
