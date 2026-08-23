export interface ChomploOptions {
  size?: number;
}

export function createChomplo(options: ChomploOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="24" ry="4" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="1.7s" repeatCount="indefinite"/>
    <path d="M22 40 L12 28 L26 32 Z" fill="#7c3aed"/>
    <path d="M74 40 L84 28 L70 32 Z" fill="#7c3aed"/>
    <circle cx="48" cy="52" r="28" fill="#8b5cf6"/>
    <path d="M28 58 Q48 78 68 58 Q66 74 48 76 Q30 74 28 58 Z" fill="#4c1d95"/>
    <path d="M32 60 h32 l-3 8 h-26 Z" fill="#fff"/>
    <path d="M42 60 l4 8 l4 -8 Z" fill="#fff"/>
    <circle cx="38" cy="44" r="6" fill="#fff"/>
    <circle cx="58" cy="44" r="6" fill="#fff"/>
    <circle cx="39.5" cy="46" r="3" fill="#1e1b4b"/>
    <circle cx="59.5" cy="46" r="3" fill="#1e1b4b"/>
    <circle cx="40.5" cy="43" r="1.2" fill="#fff"/>
    <circle cx="60.5" cy="43" r="1.2" fill="#fff"/>
    <ellipse cx="30" cy="54" rx="3.5" ry="2.2" fill="#c4b5fd" opacity=".8"/>
    <ellipse cx="66" cy="54" rx="3.5" ry="2.2" fill="#c4b5fd" opacity=".8"/>
    <ellipse cx="24" cy="66" rx="6" ry="4" fill="#7c3aed" transform="rotate(30 24 66)"/>
    <ellipse cx="72" cy="66" rx="6" ry="4" fill="#7c3aed" transform="rotate(-30 72 66)"/>
  </g>
</svg>`;
}
