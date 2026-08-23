export interface AvatarZombieOptions {
  skin?: string;
  size?: number;
}

export function createAvatarZombie(options: AvatarZombieOptions = {}): string {
  const { skin = '#86efac', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zombie avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 100;2 64 100;-2 64 100" dur="3s" repeatCount="indefinite" />
    <ellipse cx="64" cy="78" rx="34" ry="31" fill="${skin}" />
    <path d="M30 62 Q30 42 52 40 L46 58 Z M98 62 Q98 42 76 40 L82 58 Z" fill="#365314" />
    <circle cx="50" cy="72" r="6" fill="#f8fafc" />
    <circle cx="78" cy="74" r="5" fill="#f8fafc" />
    <circle cx="51" cy="73" r="2.5" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="79" cy="75" r="2.2" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.4s" begin="-1s" repeatCount="indefinite" />
    </circle>
    <path d="M48 92 Q56 88 60 94 Q68 86 76 92 Q84 88 80 96 L52 98 Z" fill="#14532d" />
    <path d="M54 92 v4 m6 -4 v4 m6 -4 v4" stroke="${skin}" stroke-width="2" stroke-linecap="round" />
    <path d="M44 80 l-10 -4 M84 84 l10 -4" stroke="#4d7c0f" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
    <path d="M38 96 h12 M36 102 h10" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
    <path d="M90 60 l8 -6" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
  </g>
</svg>`;
}
