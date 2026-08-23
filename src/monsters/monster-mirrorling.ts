export interface MirrorlingOptions {
  size?: number;
}

export function createMirrorling(options: MirrorlingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3.4s" repeatCount="indefinite"/>
    <circle cx="48" cy="50" r="28" fill="#f472b6"/>
    <circle cx="48" cy="50" r="28" fill="none" stroke="#db2777" stroke-width="2"/>
    <circle cx="70" cy="28" r="4" fill="#f9a8d4"/>
    <circle cx="48" cy="50" r="21" fill="#bae6fd" opacity=".55"/>
    <path d="M32 40 L44 32 L38 46 Z" fill="#fff" opacity=".7"/>
    <circle cx="42" cy="49" r="4.4" fill="#fff"/>
    <circle cx="55" cy="49" r="4.4" fill="#fff"/>
    <circle cx="43" cy="50" r="2.2" fill="#0e7490"/>
    <circle cx="56" cy="50" r="2.2" fill="#0e7490"/>
    <circle cx="42" cy="47" r="1" fill="#fff"/>
    <circle cx="55" cy="47" r="1" fill="#fff"/>
    <ellipse cx="48" cy="58" rx="3" ry="3.6" fill="#0e7490"/>
    <ellipse cx="34" cy="55" rx="2.8" ry="1.8" fill="#fb7185" opacity=".7"/>
    <ellipse cx="62" cy="55" rx="2.8" ry="1.8" fill="#fb7185" opacity=".7"/>
  </g>
  <path d="M18 24 q4 -6 8 0 q-4 -2 -8 0" fill="#f9a8d4" opacity=".8"><animate attributeName="opacity" values=".8;.3;.8" dur="2.2s" repeatCount="indefinite"/></path>
</svg>`;
}
