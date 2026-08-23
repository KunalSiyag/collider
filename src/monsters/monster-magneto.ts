export interface MagnetoOptions {
  size?: number;
}

export function createMagneto(options: MagnetoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 48 88;4 48 88;-4 48 88" dur="3s" repeatCount="indefinite"/>
    <path d="M28 40 L28 62 A20 20 0 0 0 68 62 L68 40 L54 40 L54 62 A6 6 0 0 1 42 62 L42 40 Z" fill="#ef4444"/>
    <rect x="26" y="30" width="18" height="12" rx="2" fill="#f87171"/>
    <rect x="52" y="30" width="18" height="12" rx="2" fill="#93c5fd"/>
    <rect x="26" y="38" width="18" height="4" fill="#bdc3c7"/>
    <rect x="52" y="38" width="18" height="4" fill="#bdc3c7"/>
    <circle cx="35" cy="52" r="3.6" fill="#fff"/>
    <circle cx="61" cy="52" r="3.6" fill="#fff"/>
    <circle cx="36" cy="53" r="1.8" fill="#450a0a"/>
    <circle cx="62" cy="53" r="1.8" fill="#172554"/>
    <path d="M44 62 Q48 65 52 62" stroke="#7f1d1d" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="30" cy="58" rx="2.4" ry="1.6" fill="#fca5a5" opacity=".8"/>
    <ellipse cx="66" cy="58" rx="2.4" ry="1.6" fill="#bfdbfe" opacity=".8"/>
  </g>
  <circle cx="76" cy="26" r="2" fill="#fde047"><animate attributeName="cx" values="80;68" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="2.4s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="30" r="1.5" fill="#fde047"><animate attributeName="cx" values="16;28" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.8;0" dur="2.8s" repeatCount="indefinite"/></circle>
</svg>`;
}
