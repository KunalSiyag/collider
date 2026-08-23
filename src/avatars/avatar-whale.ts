export interface AvatarWhaleOptions {
  body?: string;
  belly?: string;
  size?: number;
}

export function createAvatarWhale(options: AvatarWhaleOptions = {}): string {
  const { body = '#2563eb', belly = '#bfdbfe', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Whale avatar">
  <rect width="128" height="128" rx="36" fill="#2563eb" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="3.4s" repeatCount="indefinite" />
    <path d="M70 22 q-2 -10 6 -12 q-1 6 4 7 q6 -6 12 -2 q-8 4 -6 10 Z" fill="#7dd3fc" opacity="0.9" />
    <path d="M78 24 q0 -8 4 -10" stroke="#bae6fd" stroke-width="3" fill="none" stroke-linecap="round">
      <animate attributeName="opacity" values="1;0.3;1" dur="2.6s" repeatCount="indefinite" />
    </path>
    <path d="M18 78 Q18 46 62 46 Q106 46 108 76 Q108 100 84 104 L88 116 L72 105 Q46 110 30 98 Q18 90 18 78 Z" fill="${body}" />
    <path d="M30 98 Q52 108 84 102 L80 112 L64 106 Q44 108 30 98 Z" fill="${belly}" opacity="0.85" />
    <circle cx="44" cy="72" r="5" fill="#0b1a3a">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="44" cy="72" r="5" fill="#0b1a3a" />
    <path d="M30 86 Q38 94 50 90" stroke="#0b1a3a" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="34" cy="80" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
    <path d="M96 60 q8 6 6 16" stroke="#1d4ed8" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7" />
    <circle cx="112" cy="34" r="2.5" fill="#bfdbfe" />
    <circle cx="118" cy="52" r="2" fill="#bfdbfe" opacity="0.7" />
  </g>
</svg>`;
}
