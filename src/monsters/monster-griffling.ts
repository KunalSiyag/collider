export interface GrifflingOptions {
  size?: number;
}

export function createGriffling(options: GrifflingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.8s" repeatCount="indefinite"/>
    <path d="M28 56 Q14 48 16 38 Q28 42 32 50 Z" fill="#f59e0b">
      <animateTransform attributeName="transform" type="rotate" values="0 30 52;-18 30 52;0 30 52" dur=".9s" repeatCount="indefinite"/>
    </path>
    <path d="M68 56 Q82 48 80 38 Q68 42 64 50 Z" fill="#f59e0b">
      <animateTransform attributeName="transform" type="rotate" values="0 66 52;18 66 52;0 66 52" dur=".9s" repeatCount="indefinite"/>
    </path>
    <ellipse cx="48" cy="66" rx="18" ry="16" fill="#fbbf24"/>
    <circle cx="48" cy="42" r="16" fill="#fcd34d"/>
    <path d="M48 46 L44 50 L48 54 L52 50 Z" fill="#f97316"/>
    <path d="M40 30 L36 20 L44 26 L48 18 L52 26 L60 20 L56 30 Z" fill="#d97706"/>
    <circle cx="42" cy="40" r="3.6" fill="#fff"/>
    <circle cx="54" cy="40" r="3.6" fill="#fff"/>
    <circle cx="43" cy="41" r="1.8" fill="#78350f"/>
    <circle cx="55" cy="41" r="1.8" fill="#78350f"/>
    <ellipse cx="38" cy="48" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
    <ellipse cx="58" cy="48" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
    <path d="M40 78 L36 84 M56 78 L60 84" stroke="#d97706" stroke-width="4" stroke-linecap="round"/>
    <path d="M62 70 Q74 72 76 64" stroke="#d97706" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;
}
