export interface GalaxoOptions {
  size?: number;
}

export function createGalaxo(options: GalaxoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="88" rx="20" ry="3" fill="#312e81" opacity=".6"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="0 48 48;360 48 48" dur="20s" repeatCount="indefinite"/>
    <path d="M48 20 Q76 26 74 50 Q72 72 50 74 Q30 76 26 56 Q22 36 42 30 Q58 26 60 42 Q62 56 50 58 Q42 59 42 50 Q42 44 48 44 Z" fill="none" stroke="#8b5cf6" stroke-width="5" stroke-linecap="round" opacity=".8"/>
    <circle cx="76" cy="40" r="2.4" fill="#e9d5ff"/>
    <circle cx="30" cy="62" r="1.8" fill="#fbcfe8"/>
    <circle cx="62" cy="76" r="1.5" fill="#c4b5fd"/>
    <circle cx="22" cy="38" r="1.5" fill="#ddd6fe"/>
  </g>
  <circle cx="48" cy="48" r="15" fill="#4c1d95"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.7s" repeatCount="indefinite"/>
    <circle cx="43" cy="46" r="3.6" fill="#fff"/>
    <circle cx="54" cy="46" r="3.6" fill="#fff"/>
    <circle cx="43.8" cy="47" r="1.8" fill="#312e81"/>
    <circle cx="54.8" cy="47" r="1.8" fill="#312e81"/>
    <path d="M45 54 Q48.5 56.5 52 54" stroke="#c4b5fd" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="37" cy="51" r="1.8" fill="#f472b6" opacity=".7"/>
    <circle cx="60" cy="51" r="1.8" fill="#f472b6" opacity=".7"/>
  </g>
  <path d="M18 20 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 Z" fill="#fde047">
    <animate attributeName="opacity" values="1;.2;1" dur="1.9s" repeatCount="indefinite"/>
  </path>
</svg>`;
}
