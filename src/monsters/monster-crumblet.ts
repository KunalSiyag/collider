export interface CrumbletOptions {
  size?: number;
}

export function createCrumblet(options: CrumbletOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="2.7s" repeatCount="indefinite"/>
    <polygon points="26,50 36,32 56,28 72,42 70,64 54,76 34,72" fill="#b45309"/>
    <polygon points="36,32 56,28 60,44 42,48" fill="#d97706"/>
    <circle cx="42" cy="40" r="3" fill="#451a03"/>
    <circle cx="60" cy="50" r="2.5" fill="#451a03"/>
    <circle cx="36" cy="62" r="3" fill="#451a03"/>
    <circle cx="42" cy="56" r="4" fill="#fff"/>
    <circle cx="56" cy="58" r="4" fill="#fff"/>
    <circle cx="43" cy="57" r="2" fill="#3b1d0a"/>
    <circle cx="57" cy="59" r="2" fill="#3b1d0a"/>
    <path d="M45 66 Q48.5 69 52 66" stroke="#451a03" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="60" rx="2.5" ry="1.6" fill="#fb923c" opacity=".6"/>
    <ellipse cx="63" cy="63" rx="2.5" ry="1.6" fill="#fb923c" opacity=".6"/>
  </g>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 48 52;360 48 52" dur="7s" repeatCount="indefinite"/>
    <circle cx="48" cy="18" r="2.5" fill="#451a03"/>
    <circle cx="82" cy="52" r="2" fill="#451a03"/>
    <circle cx="48" cy="86" r="2" fill="#451a03" opacity="0"/>
  </g>
</svg>`;
}
