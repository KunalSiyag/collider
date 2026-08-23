export interface OnigoOptions {
  size?: number;
}

export function createOnigo(options: OnigoOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3s" repeatCount="indefinite"/>
    <path d="M48 26 Q66 26 72 44 Q78 62 66 72 Q56 78 48 78 Q40 78 30 72 Q18 62 24 44 Q30 26 48 26 Z" fill="#f8fafc"/>
    <path d="M48 26 Q66 26 72 44 L48 40 Z" fill="#e2e8f0"/>
    <path d="M40 30 L56 30 L58 62 L38 62 Z" fill="#166534" opacity=".9"/>
    <path d="M40 30 L56 30 L56.5 38 L39.5 38 Z" fill="#14532d"/>
    <circle cx="43" cy="48" r="3.6" fill="#fff"/>
    <circle cx="53" cy="48" r="3.6" fill="#fff"/>
    <circle cx="44" cy="49" r="1.8" fill="#0f172a"/>
    <circle cx="54" cy="49" r="1.8" fill="#0f172a"/>
    <path d="M45 56 Q48 59 51 56" stroke="#334155" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <ellipse cx="35" cy="54" rx="2.4" ry="1.6" fill="#fda4af" opacity=".7"/>
    <ellipse cx="61" cy="54" rx="2.4" ry="1.6" fill="#fda4af" opacity=".7"/>
    <path d="M64 66 l3 3 M64 69 l3 -3" stroke="#f43f5e" stroke-width="1.6" stroke-linecap="round"/>
  </g>
</svg>`;
}
