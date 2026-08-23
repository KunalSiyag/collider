export interface BubblegumoOptions {
  size?: number;
}

export function createBubblegumo(options: BubblegumoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="22" ry="3.5" fill="#000" opacity=".25"/>
  <circle cx="70" cy="46" r="12" fill="#fbcfe8" opacity=".9">
    <animate attributeName="r" values="2;13;13;2" keyTimes="0;.5;.85;1" dur="3.2s" repeatCount="indefinite"/>
  </circle>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="2.1s" repeatCount="indefinite"/>
    <path d="M30 46 Q30 34 40 32 L40 60 Q30 58 30 46 Z" fill="#ec4899"/>
    <circle cx="46" cy="48" r="18" fill="#ec4899"/>
    <ellipse cx="40" cy="40" rx="6" ry="4" fill="#f9a8d4" transform="rotate(-30 40 40)"/>
    <circle cx="41" cy="48" r="4.5" fill="#fff"/>
    <circle cx="53" cy="48" r="4.5" fill="#fff"/>
    <circle cx="42" cy="49" r="2.2" fill="#500724"/>
    <circle cx="54" cy="49" r="2.2" fill="#500724"/>
    <path d="M43 57 Q48 60 53 57" stroke="#831843" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="54" rx="3" ry="2" fill="#f472b6" opacity=".7"/>
    <path d="M36 66 L40 72 L44 66 L48 72 L52 66 L56 72 L58 66" stroke="#be185d" stroke-width="2" fill="none" stroke-linecap="round" opacity=".6"/>
    <ellipse cx="40" cy="82" rx="6" ry="3" fill="#db2777"/>
    <ellipse cx="56" cy="82" rx="6" ry="3" fill="#db2777"/>
  </g>
</svg>`;
}
