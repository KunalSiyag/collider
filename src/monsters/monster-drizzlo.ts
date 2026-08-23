export interface DrizzloOptions {
  size?: number;
}

export function createDrizzlo(options: DrizzloOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.6s" repeatCount="indefinite"/>
    <path d="M26 52 Q16 52 16 42 Q16 33 26 33 Q28 22 40 22 Q50 14 60 22 Q72 24 72 36 Q80 38 79 46 Q78 53 68 53 Z" fill="#93c5fd"/>
    <path d="M40 22 Q50 14 60 22 Q66 23 69 28 Q58 24 48 28 Q42 24 40 22 Z" fill="#bfdbfe"/>
    <circle cx="38" cy="40" r="4" fill="#fff"/>
    <circle cx="54" cy="40" r="4" fill="#fff"/>
    <circle cx="39" cy="41" r="2" fill="#1e3a8a"/>
    <circle cx="55" cy="41" r="2" fill="#1e3a8a"/>
    <path d="M42 47 Q48 44 54 47" stroke="#1e40af" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="31" cy="46" rx="2.6" ry="1.8" fill="#60a5fa" opacity=".8"/>
    <ellipse cx="62" cy="46" rx="2.6" ry="1.8" fill="#60a5fa" opacity=".8"/>
  </g>
  <g fill="#38bdf8" stroke-linecap="round">
    <line x1="34" y1="60" x2="32" y2="66"><animate attributeName="opacity" values="0;.9;0" dur="1.2s" repeatCount="indefinite"/></line>
    <line x1="48" y1="62" x2="46" y2="68"><animate attributeName="opacity" values="0;.9;0" dur="1.2s" begin=".4s" repeatCount="indefinite"/></line>
    <line x1="62" y1="60" x2="60" y2="66"><animate attributeName="opacity" values="0;.9;0" dur="1.2s" begin=".8s" repeatCount="indefinite"/></line>
  </g>
</svg>`;
}
