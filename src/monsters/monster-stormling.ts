export interface StormlingOptions {
  size?: number;
}

export function createStormling(options: StormlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#000" opacity=".25"/>
  <path d="M52 60 L42 74 L49 74 L42 88 L60 70 L52 70 L58 60 Z" fill="#fde047">
    <animate attributeName="opacity" values="0;1;1;.2;0" keyTimes="0;.15;.35;.5;1" dur="2.4s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;-2 1;2 -1;0 0" dur="1.6s" repeatCount="indefinite"/>
    <path d="M24 52 Q12 52 12 41 Q12 31 24 31 Q27 20 40 21 Q50 12 61 21 Q73 22 73 35 Q83 37 81 46 Q79 53 69 53 Z" fill="#64748b"/>
    <path d="M40 21 Q50 12 61 21 Q66 22 69 27 Q58 23 48 28 Q43 23 40 21 Z" fill="#94a3b8"/>
    <circle cx="38" cy="39" r="4" fill="#fff"/>
    <circle cx="55" cy="39" r="4" fill="#fff"/>
    <circle cx="39" cy="40" r="2" fill="#0f172a"/>
    <circle cx="56" cy="40" r="2" fill="#0f172a"/>
    <path d="M41 47 Q44 44.5 47 47 Q50 49.5 53 47" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="30" cy="45" rx="2.6" ry="1.7" fill="#475569" opacity=".9"/>
    <ellipse cx="63" cy="45" rx="2.6" ry="1.7" fill="#475569" opacity=".9"/>
  </g>
  <line x1="18" y1="18" x2="24" y2="24" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity=".6">
    <animate attributeName="opacity" values="0;.9;0" keyTimes="0;.1;.3" dur="2.4s" repeatCount="indefinite"/>
  </line>
  <line x1="76" y1="16" x2="70" y2="22" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity=".6">
    <animate attributeName="opacity" values="0;.9;0" keyTimes=".3;.4;.6" dur="2.4s" repeatCount="indefinite"/>
  </line>
</svg>`;
}
