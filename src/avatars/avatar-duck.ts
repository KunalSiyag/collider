export interface AvatarDuckOptions {
  head?: string;
  bill?: string;
  size?: number;
}

export function createAvatarDuck(options: AvatarDuckOptions = {}): string {
  const { head = '#fefce8', bill = '#fb923c', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Duck avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.6s" repeatCount="indefinite" />
    <path d="M28 74 Q28 108 64 108 Q100 108 100 76 Q100 62 88 58 L40 58 Q28 62 28 74 Z" fill="${head}" />
    <path d="M88 66 Q106 68 102 82 Q94 92 82 86 Z" fill="${head}" />
    <circle cx="64" cy="48" r="26" fill="${head}" />
    <path d="M42 42 Q38 54 46 62 L58 58 Q50 50 42 42 Z" fill="#a16207" opacity="0.25" />
    <path d="M84 46 q16 -2 22 6 q-8 8 -24 4 Z" fill="${bill}">
      <animate attributeName="d" values="M84 46 q16 -2 22 6 q-8 8 -24 4 Z;M84 44 q16 -2 22 6 q-8 8 -24 4 Z;M84 46 q16 -2 22 6 q-8 8 -24 4 Z" dur="2.6s" repeatCount="indefinite" />
    </path>
    <path d="M86 50 l16 2" stroke="#c2410c" stroke-width="2" stroke-linecap="round" />
    <circle cx="58" cy="44" r="4.5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="58" cy="44" r="4.5" fill="#1c1917" />
    <circle cx="59.5" cy="42.5" r="1.5" fill="#ffffff" />
    <path d="M44 84 q10 -6 18 2 M66 90 q10 -6 18 2" stroke="#d4a017" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6" />
    <path d="M18 112 h92" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" opacity="0.5">
      <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
