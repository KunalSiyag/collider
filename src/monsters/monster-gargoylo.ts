export interface GargoyloOptions {
  size?: number;
}

export function createGargoylo(options: GargoyloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="3.5" fill="#000" opacity=".3"/>
  <rect x="24" y="80" width="48" height="8" rx="2" fill="#57534e"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="3.2s" repeatCount="indefinite"/>
    <path d="M26 40 L18 24 L34 34 Z" fill="#6b7280"/>
    <path d="M70 40 L78 24 L62 34 Z" fill="#6b7280"/>
    <path d="M28 42 C28 28 68 28 68 42 L66 66 C66 76 58 80 48 80 C38 80 30 76 30 66 Z" fill="#78716c"/>
    <polygon points="36,52 46,48 48,58 38,62" fill="#57534e"/>
    <polygon points="58,64 66,60 68,68 60,72" fill="#44403c"/>
    <circle cx="41" cy="46" r="4.5" fill="#fbbf24"/>
    <circle cx="55" cy="46" r="4.5" fill="#fbbf24"/>
    <circle cx="41" cy="46" r="2" fill="#111827">
      <animate attributeName="r" values="2;2;.2;2;2" keyTimes="0;.42;.46;.5;1" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="55" cy="46" r="2" fill="#111827">
      <animate attributeName="r" values="2;2;.2;2;2" keyTimes="0;.42;.46;.5;1" dur="4s" repeatCount="indefinite"/>
    </circle>
    <path d="M40 40 h5 M51 40 h5" stroke="#292524" stroke-width="2" stroke-linecap="round"/>
    <path d="M43 58 L45 62 L47 58 L49 62 L51 58" stroke="#292524" stroke-width="1.6" fill="none"/>
    <path d="M30 62 Q22 66 24 74" stroke="#57534e" stroke-width="7" stroke-linecap="round"/>
    <path d="M66 62 Q74 66 72 74" stroke="#57534e" stroke-width="7" stroke-linecap="round"/>
  </g>
  <circle cx="80" cy="16" r="6" fill="#fef9c3" opacity=".9"/>
  <circle cx="77" cy="15" r="5" fill="#18181b"/>
</svg>`;
}
