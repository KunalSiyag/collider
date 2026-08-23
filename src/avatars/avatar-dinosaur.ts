export interface AvatarDinosaurOptions {
  body?: string;
  spike?: string;
  size?: number;
}

export function createAvatarDinosaur(options: AvatarDinosaurOptions = {}): string {
  const { body = '#4ade80', spike = '#15803d', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dinosaur avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="2.9s" repeatCount="indefinite" />
    <g fill="${spike}">
      <path d="M46 30 L54 16 L62 30 Z" /><path d="M66 30 L74 16 L82 30 Z" />
      <path d="M56 30 L64 18 L72 30 Z" opacity="0.85" />
      <path d="M28 56 L16 48 L30 42 Z" /><path d="M26 76 L14 74 L26 66 Z" />
      <path d="M30 94 L18 98 L28 86 Z" />
    </g>
    <path d="M36 60 Q34 40 60 38 Q92 38 94 66 Q96 96 68 102 L74 114 H60 L58 102 Q38 100 36 84 Z" fill="${body}" />
    <ellipse cx="66" cy="90" rx="17" ry="12" fill="#ecfccb" />
    <circle cx="56" cy="62" r="5" fill="#14532d">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="56" cy="62" r="5" fill="#14532d" />
    <circle cx="57.5" cy="60.5" r="1.5" fill="#ffffff" />
    <path d="M50 76 Q58 83 70 80 Q78 78 80 70" stroke="#14532d" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M56 79 l-2 5 M66 81 l-1 5" stroke="#14532d" stroke-width="2.5" stroke-linecap="round" />
    <ellipse cx="42" cy="70" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
    <path d="M96 108 h16 M112 108 v-8" stroke="${spike}" stroke-width="4" stroke-linecap="round" opacity="0" />
  </g>
</svg>`;
}
