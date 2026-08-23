export interface AvatarAlienOptions {
  size?: number;
}

export function createAvatarAlien(options: AvatarAlienOptions = {}): string {
  const { size = 128 } = options;
  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alien avatar">
  <rect width="128" height="128" rx="36" fill="#22c55e" opacity="0.12"/>
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2;0 -6;0 -2" dur="3s" repeatCount="indefinite"/>
    <path d="M64 18 C90 18 104 40 100 64 C97 84 82 98 64 98 C46 98 31 84 28 64 C24 40 38 18 64 18 Z" fill="#4ade80"/>
    <path d="M44 30 C36 20 26 16 18 18 C22 28 32 34 42 36 Z" fill="#16a34a"/>
    <path d="M84 30 C92 20 102 16 110 18 C106 28 96 34 86 36 Z" fill="#16a34a"/>
    <ellipse cx="50" cy="60" rx="11" ry="15" fill="#052e16" transform="rotate(-14 50 60)"/>
    <ellipse cx="78" cy="60" rx="11" ry="15" fill="#052e16" transform="rotate(14 78 60)"/>
    <ellipse cx="52" cy="56" rx="3.5" ry="6" fill="#bbf7d0" transform="rotate(-14 52 56)"/>
    <ellipse cx="80" cy="56" rx="3.5" ry="6" fill="#bbf7d0" transform="rotate(14 80 56)"/>
    <path d="M58 82 Q64 87 70 82" stroke="#14532d" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="100" cy="100" r="9" fill="#4ade80" opacity=".55"><animate attributeName="r" values="8;11;8" dur="2.2s" repeatCount="indefinite"/></circle>
    <circle cx="26" cy="94" r="6" fill="#86efac" opacity=".5"><animate attributeName="r" values="6;8;6" dur="1.8s" begin=".4s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;
}
