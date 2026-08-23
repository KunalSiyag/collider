export interface AvatarRockstarOptions {
  hair?: string;
  glasses?: string;
  size?: number;
}

export function createAvatarRockstar(options: AvatarRockstarOptions = {}): string {
  const { hair = '#a21caf', glasses = '#0f172a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rockstar avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="0.9s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="28" ry="25" fill="#fcd9b8" />
    <path d="M40 62 Q40 44 64 44 Q88 44 88 62 L88 70 Q64 62 40 70 Z" fill="${hair}" />
    <path d="M62 20 L70 34 L54 34 Z" fill="${hair}" />
    <path d="M62 20 L70 34 L54 34 Z" fill="${hair}" transform="rotate(180 62 27)" opacity="0" />
    <rect x="40" y="76" width="19" height="15" rx="6" fill="${glasses}" />
    <rect x="69" y="76" width="19" height="15" rx="6" fill="${glasses}" />
    <path d="M59 81 h10" stroke="${glasses}" stroke-width="4" />
    <path d="M40 80 l-8 3 M88 80 l8 3" stroke="${glasses}" stroke-width="3.5" stroke-linecap="round" />
    <path d="M54 99 Q64 107 74 99" stroke="#18181b" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M14 44 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4 Z" fill="#fbbf24">
      <animate attributeName="opacity" values="1;0.3;1" dur="1.8s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
