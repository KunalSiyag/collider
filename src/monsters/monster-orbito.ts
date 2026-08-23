export interface OrbitoOptions {
  size?: number;
}

export function createOrbito(options: OrbitoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="18" ry="3" fill="#1e1b4b" opacity=".7"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.7s" repeatCount="indefinite"/>
    <ellipse cx="48" cy="52" rx="38" ry="12" fill="none" stroke="#fbbf24" stroke-width="3" transform="rotate(-16 48 52)" opacity=".85"/>
    <circle cx="48" cy="50" r="20" fill="#f59e0b"/>
    <path d="M32 40 Q42 32 54 36 Q48 44 38 44 Z" fill="#fcd34d" opacity=".7"/>
    <circle cx="56" cy="62" r="4" fill="#d97706" opacity=".8"/>
    <circle cx="40" cy="64" r="2.6" fill="#d97706" opacity=".6"/>
    <circle cx="42" cy="47" r="4" fill="#fff"/>
    <circle cx="55" cy="47" r="4" fill="#fff"/>
    <circle cx="43" cy="48" r="2" fill="#451a03"/>
    <circle cx="56" cy="48" r="2" fill="#451a03"/>
    <path d="M45 56 Q48 59 51 56" stroke="#78350f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="34" cy="54" rx="2.4" ry="1.6" fill="#fdba74" opacity=".8"/>
    <circle cx="62" cy="54" rx="2.4" ry="1.6" fill="#fdba74" opacity=".8"/>
  </g>
  <circle cx="14" cy="34" r="3" fill="#e2e8f0">
    <animate attributeName="cx" values="10;20;10" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="34;26;34" dur="5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="84" cy="70" r="2" fill="#e2e8f0">
    <animate attributeName="cx" values="88;78;88" dur="6s" repeatCount="indefinite"/>
  </circle>
</svg>`;
}
