export interface AvatarCampfireOptions {
  flame?: string;
  log?: string;
  size?: number;
}

export function createAvatarCampfire(options: AvatarCampfireOptions = {}): string {
  const { flame = '#fb923c', log = '#78350f', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Campfire avatar">
  <rect width="128" height="128" rx="36" fill="#f97316" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="2.4s" repeatCount="indefinite" />
    <path d="M64 8 Q78 26 70 38 Q66 30 58 34 Q52 22 64 8 Z" fill="#fde047" opacity="0.85">
      <animate attributeName="opacity" values="0.85;0.5;0.85" dur="1.6s" repeatCount="indefinite" />
    </path>
    <path d="M50 44 Q40 62 52 76 Q60 84 76 80 Q92 74 86 56 Q82 46 72 42 Q76 54 68 58 Q62 48 50 44 Z" fill="${flame}">
      <animate attributeName="d" values="M50 44 Q40 62 52 76 Q60 84 76 80 Q92 74 86 56 Q82 46 72 42 Q76 54 68 58 Q62 48 50 44 Z;M50 44 Q42 64 54 78 Q62 84 76 80 Q90 72 86 56 Q80 44 72 42 Q78 56 66 58 Q60 46 50 44 Z;M50 44 Q40 62 52 76 Q60 84 76 80 Q92 74 86 56 Q82 46 72 42 Q76 54 68 58 Q62 48 50 44 Z" dur="2s" repeatCount="indefinite" />
    </path>
    <circle cx="57" cy="62" r="5" fill="#7c2d12">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.9s" repeatCount="indefinite" />
    </circle>
    <circle cx="57" cy="63" r="5" fill="#7c2d12" />
    <circle cx="75" cy="62" r="5" fill="#7c2d12">
      <animate attributeName="ry" values="1;1;0;1;1" dur="3.9s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="63" r="5" fill="#7c2d12" />
    <path d="M59 73 Q66 78 73 73" stroke="#7c2d12" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <line x1="18" y1="104" x2="110" y2="94" stroke="${log}" stroke-width="10" stroke-linecap="round" />
    <line x1="20" y1="92" x2="106" y2="108" stroke="#92400e" stroke-width="10" stroke-linecap="round" />
    <circle cx="24" cy="93" r="4" fill="#a16207" /><circle cx="105" cy="107" r="4" fill="#a16207" />
    <g fill="#cbd5e1"><circle cx="14" cy="30" r="2"><animate attributeName="cy" values="30;22;30" dur="3s" repeatCount="indefinite" /></circle></g>
  </g>
</svg>`;
}
