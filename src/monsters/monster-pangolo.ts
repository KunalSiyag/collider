export interface PangoloOptions {
  size?: number;
}

export function createPangolo(options: PangoloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -1.5;0 0" dur="3s" repeatCount="indefinite"/>
    <circle cx="48" cy="56" r="26" fill="#a16207"/>
    <g fill="#78350f">
      <path d="M48 32 L58 44 L38 44 Z"/><path d="M30 42 L40 52 L24 54 Z"/><path d="M66 42 L72 54 L56 52 Z"/>
      <path d="M28 62 L40 66 L30 76 Z"/><path d="M68 62 L66 76 L56 66 Z"/><path d="M44 70 L52 70 L48 82 Z"/>
    </g>
    <path d="M36 50 Q48 46 60 50" stroke="#d97706" stroke-width="2" fill="none"/>
    <circle cx="41" cy="58" r="4" fill="#fff"/>
    <circle cx="55" cy="58" r="4" fill="#fff"/>
    <circle cx="42" cy="59" r="2" fill="#451a03"/>
    <circle cx="56" cy="59" r="2" fill="#451a03"/>
    <ellipse cx="48" cy="64" rx="3.4" ry="4" fill="#fbbf24"/>
    <circle cx="48" cy="65" r="1.4" fill="#451a03"/>
    <path d="M43 70 Q48 73 53 70" stroke="#451a03" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="66" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
    <ellipse cx="62" cy="66" rx="2.6" ry="1.7" fill="#fb923c" opacity=".6"/>
  </g>
</svg>`;
}
