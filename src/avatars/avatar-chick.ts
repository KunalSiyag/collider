export interface AvatarChickOptions {
  body?: string;
  beak?: string;
  size?: number;
}

export function createAvatarChick(options: AvatarChickOptions = {}): string {
  const { body = '#fde047', beak = '#f97316', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chick avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="1.4s" repeatCount="indefinite" />
    <path d="M64 34 q-10 -16 -24 -12 q8 2 10 10 Z" fill="#facc15">
      <animate attributeName="d" values="M64 34 q-10 -16 -24 -12 q8 2 10 10 Z;M64 34 q-14 -14 -26 -6 q9 0 12 8 Z;M64 34 q-10 -16 -24 -12 q8 2 10 10 Z" dur="1.4s" repeatCount="indefinite" />
    </path>
    <ellipse cx="64" cy="78" rx="36" ry="32" fill="${body}" />
    <path d="M100 84 q12 4 8 14 q-6 -2 -10 2 q-4 -8 2 -16 Z" fill="${body}" />
    <circle cx="52" cy="70" r="5.5" fill="#1c1917">
      <animate attributeName="ry" values="5.5;5.5;0.6;5.5;5.5" dur="3.7s" repeatCount="indefinite" />
    </circle>
    <circle cx="76" cy="70" r="5.5" fill="#1c1917">
      <animate attributeName="ry" values="5.5;5.5;0.6;5.5;5.5" dur="3.7s" repeatCount="indefinite" />
    </circle>
    <path d="M56 80 L64 86 L72 80 L64 84 Z" fill="${beak}" />
    <path d="M64 86 v4 M60 92 h8" stroke="${beak}" stroke-width="2.5" stroke-linecap="round" opacity="0" />
    <ellipse cx="40" cy="80" rx="6" ry="4" fill="#fda4af" opacity="0.55" />
    <ellipse cx="88" cy="80" rx="6" ry="4" fill="#fda4af" opacity="0.55" />
    <path d="M30 96 q10 8 20 2 M78 98 q10 6 18 -2" stroke="#eab308" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7" />
    <path d="M104 44 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#fca5a5" opacity="0.8" />
  </g>
</svg>`;
}
