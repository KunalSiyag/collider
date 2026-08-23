export interface SquidoOptions {
  size?: number;
}

export function createSquido(options: SquidoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#164e63" opacity=".6"/>
  <g stroke="#818cf8" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M36 62 Q30 74 22 78"><animate attributeName="d" values="M36 62 Q30 74 22 78;M36 62 Q26 72 18 74;M36 62 Q30 74 22 78" dur="1.8s" repeatCount="indefinite"/></path>
    <path d="M44 66 Q42 78 36 84"><animate attributeName="d" values="M44 66 Q42 78 36 84;M44 66 Q38 78 30 82;M44 66 Q42 78 36 84" dur="2s" repeatCount="indefinite"/></path>
    <path d="M52 66 Q54 78 60 84"><animate attributeName="d" values="M52 66 Q54 78 60 84;M52 66 Q58 78 66 82;M52 66 Q54 78 60 84" dur="2.2s" repeatCount="indefinite"/></path>
    <path d="M60 62 Q66 74 74 78"><animate attributeName="d" values="M60 62 Q66 74 74 78;M60 62 Q72 72 80 74;M60 62 Q66 74 74 78" dur="1.9s" repeatCount="indefinite"/></path>
  </g>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2s" repeatCount="indefinite"/>
    <path d="M48 18 C64 18 70 34 68 48 Q64 62 48 64 Q32 62 28 48 C26 34 32 18 48 18 Z" fill="#6366f1"/>
    <path d="M36 24 Q30 34 32 46" stroke="#a5b4fc" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M48 14 L42 6 L48 10 L54 6 Z" fill="#818cf8"/>
    <circle cx="41" cy="40" r="5.4" fill="#fff"/>
    <circle cx="55" cy="40" r="5.4" fill="#fff"/>
    <circle cx="42" cy="41" r="2.7" fill="#1e1b4b"/>
    <circle cx="56" cy="41" r="2.7" fill="#1e1b4b"/>
    <circle cx="43" cy="38.5" r="1" fill="#fff"/>
    <circle cx="57" cy="38.5" r="1" fill="#fff"/>
    <path d="M44 52 Q48 55 52 52" stroke="#312e81" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="48" rx="2.8" ry="1.8" fill="#c7d2fe" opacity=".9"/>
    <ellipse cx="62" cy="48" rx="2.8" ry="1.8" fill="#c7d2fe" opacity=".9"/>
  </g>
</svg>`;
}
