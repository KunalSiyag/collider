export interface BerrylingOptions {
  size?: number;
}

export function createBerryling(options: BerrylingOptions = {}): string {
  const { size = 240 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <ellipse cx="48" cy="89" rx="20" ry="3.5" fill="#000" opacity=".25"/>
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 48 88;2 48 88;-2 48 88" dur="3s" repeatCount="indefinite"/>
    <path d="M48 22 Q46 12 38 10 Q46 8 50 16 Q54 6 62 8 Q54 14 52 22 Z" fill="#4ade80"/>
    <circle cx="36" cy="56" r="17" fill="#7c3aed"/>
    <circle cx="60" cy="56" r="17" fill="#8b5cf6"/>
    <circle cx="48" cy="44" r="19" fill="#a78bfa"/>
    <circle cx="42" cy="38" r="1.6" fill="#ddd6fe"/>
    <circle cx="55" cy="34" r="1.6" fill="#ddd6fe"/>
    <circle cx="41" cy="45" r="4.5" fill="#fff"/>
    <circle cx="55" cy="45" r="4.5" fill="#fff"/>
    <circle cx="42" cy="46" r="2.2" fill="#1e1b4b"/>
    <circle cx="56" cy="46" r="2.2" fill="#1e1b4b"/>
    <circle cx="43" cy="43.5" r=".9" fill="#fff"/>
    <circle cx="57" cy="43.5" r=".9" fill="#fff"/>
    <path d="M44 54 Q48 58 52 54" stroke="#312e81" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="34" cy="52" rx="3" ry="2" fill="#f472b6" opacity=".6"/>
    <ellipse cx="62" cy="52" rx="3" ry="2" fill="#f472b6" opacity=".6"/>
    <ellipse cx="34" cy="80" rx="6" ry="3" fill="#7c3aed"/>
    <ellipse cx="62" cy="80" rx="6" ry="3" fill="#7c3aed"/>
  </g>
</svg>`;
}
