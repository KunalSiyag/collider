export interface MuffinoOptions {
  size?: number;
}

export function createMuffino(options: MuffinoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <path d="M40 12 Q44 18 40 24 M48 10 Q52 16 48 22 M56 12 Q60 18 56 24" stroke="#cbd5e1" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7">
    <animate attributeName="opacity" values=".7;.2;.7" dur="2s" repeatCount="indefinite"/>
  </path>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M28 52 Q26 30 48 30 Q70 30 68 52 Q58 58 48 58 Q38 58 28 52 Z" fill="#b45309"/>
    <circle cx="38" cy="42" r="3.4" fill="#312e81"/>
    <circle cx="56" cy="38" r="3" fill="#312e81"/>
    <circle cx="60" cy="46" r="2.4" fill="#312e81"/>
    <path d="M26 56 L32 84 L64 84 L70 56 Q48 64 26 56 Z" fill="#d97706"/>
    <path d="M38 58 L40 82 M48 60 L48 84 M58 58 L56 82" stroke="#b45309" stroke-width="2" opacity=".7"/>
    <circle cx="42" cy="46" r="3.8" fill="#fff"/>
    <circle cx="54" cy="46" r="3.8" fill="#fff"/>
    <circle cx="43" cy="47" r="1.9" fill="#451a03"/>
    <circle cx="55" cy="47" r="1.9" fill="#451a03"/>
    <path d="M45 53 Q48 56 51 53" stroke="#7c2d12" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="50" rx="2.4" ry="1.5" fill="#fb923c" opacity=".6"/>
    <ellipse cx="61" cy="50" rx="2.4" ry="1.5" fill="#fb923c" opacity=".6"/>
  </g>
</svg>`;
}
