export interface HedgoOptions {
  size?: number;
}

export function createHedgo(options: HedgoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.7s" repeatCount="indefinite"/>
    <path d="M22 62 L14 54 L24 52 L18 42 L30 44 L28 34 L38 40" fill="#92400e"/>
    <path d="M74 62 L82 54 L72 52 L78 42 L66 44 L68 34 L58 40" fill="#92400e"/>
    <path d="M24 64 Q20 44 34 34 Q48 26 62 34 Q76 44 72 64 Q60 74 48 74 Q36 74 24 64 Z" fill="#a16207"/>
    <g stroke="#78350f" stroke-width="2" stroke-linecap="round">
      <line x1="34" y1="38" x2="30" y2="30"/><line x1="48" y1="32" x2="48" y2="24"/><line x1="62" y1="38" x2="66" y2="30"/>
      <line x1="28" y1="50" x2="19" y2="47"/><line x1="68" y1="50" x2="77" y2="47"/>
    </g>
    <ellipse cx="48" cy="62" rx="17" ry="12" fill="#fcd34d"/>
    <circle cx="41" cy="56" r="3.6" fill="#fff"/>
    <circle cx="55" cy="56" r="3.6" fill="#fff"/>
    <circle cx="42" cy="57" r="1.8" fill="#451a03"/>
    <circle cx="56" cy="57" r="1.8" fill="#451a03"/>
    <ellipse cx="48" cy="63" rx="3" ry="2.2" fill="#1c1917"/>
    <path d="M48 65 Q46 68 43 67 M48 65 Q50 68 53 67" stroke="#451a03" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="63" r="2.4" fill="#fb923c" opacity=".6"/>
    <circle cx="62" cy="63" r="2.4" fill="#fb923c" opacity=".6"/>
  </g>
</svg>`;
}
