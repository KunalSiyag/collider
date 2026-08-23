export interface IcelingOptions {
  size?: number;
}

export function createIceling(options: IcelingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#bae6fd" opacity=".7"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="-2 0;2 0;-2 0" dur="2.2s" repeatCount="indefinite"/>
    <rect x="24" y="28" width="48" height="48" rx="10" fill="#7dd3fc"/>
    <rect x="24" y="28" width="48" height="48" rx="10" fill="url(#iceg)" opacity=".5"/>
    <defs>
      <linearGradient id="iceg" x1="24" y1="28" x2="72" y2="76" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#e0f2fe"/><stop offset="100%" stop-color="#0ea5e9"/>
      </linearGradient>
    </defs>
    <path d="M32 36 L44 32 L38 44 Z" fill="#fff" opacity=".55"/>
    <circle cx="40" cy="50" r="4.4" fill="#fff"/>
    <circle cx="56" cy="50" r="4.4" fill="#fff"/>
    <circle cx="41" cy="51" r="2.2" fill="#0c4a6e"/>
    <circle cx="57" cy="51" r="2.2" fill="#0c4a6e"/>
    <circle cx="42" cy="48.6" r=".9" fill="#fff"/>
    <circle cx="58" cy="48.6" r=".9" fill="#fff"/>
    <path d="M44 60 Q48 63.5 52 60" stroke="#075985" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="32" cy="57" rx="3" ry="2" fill="#a5f3fc"/>
    <ellipse cx="64" cy="57" rx="3" ry="2" fill="#a5f3fc"/>
    <rect x="34" y="76" width="10" height="5" rx="2" fill="#0ea5e9"/>
    <rect x="52" y="76" width="10" height="5" rx="2" fill="#0ea5e9"/>
  </g>
  <circle cx="18" cy="34" r="1.4" fill="#e0f2fe"><animate attributeName="opacity" values=".9;.2;.9" dur="2s" repeatCount="indefinite"/></circle>
</svg>`;
}
