export interface GingeroOptions {
  size?: number;
}

export function createGingero(options: GingeroOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g transform-origin="48px 88px">
    <animateTransform attributeName="transform" type="scale" values="1 1;.95 1.05;1 1" dur="1.8s" repeatCount="indefinite"/>
    <circle cx="48" cy="36" r="14" fill="#b45309"/>
    <rect x="38" y="46" width="20" height="26" rx="7" fill="#b45309"/>
    <path d="M38 52 L26 44 M58 52 L70 44" stroke="#b45309" stroke-width="7" stroke-linecap="round"/>
    <path d="M42 70 L36 84 M54 70 L60 84" stroke="#b45309" stroke-width="7" stroke-linecap="round"/>
    <circle cx="43" cy="34" r="3.2" fill="#fff"/>
    <circle cx="53" cy="34" r="3.2" fill="#fff"/>
    <circle cx="44" cy="35" r="1.6" fill="#3b1d0a"/>
    <circle cx="54" cy="35" r="1.6" fill="#3b1d0a"/>
    <path d="M44 42 Q48 45 52 42" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M42 50 q3 3 6 0 q3 3 6 0" stroke="#f472b6" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="48" cy="58" r="2.4" fill="#22c55e"/>
    <circle cx="48" cy="66" r="2.4" fill="#fbbf24"/>
    <circle cx="27" cy="30" r="2" fill="#ef4444"/><circle cx="69" cy="30" r="2" fill="#22c55e"/>
    <ellipse cx="41" cy="39" rx="2.4" ry="1.5" fill="#f97316" opacity=".6"/>
    <ellipse cx="55" cy="39" rx="2.4" ry="1.5" fill="#f97316" opacity=".6"/>
  </g>
</svg>`;
}
