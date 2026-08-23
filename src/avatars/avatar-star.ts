export interface AvatarStarOptions {
  body?: string;
  glow?: string;
  size?: number;
}

export function createAvatarStar(options: AvatarStarOptions = {}): string {
  const { body = '#fbbf24', glow = '#fde68a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Star avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.14" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-4 64 66;4 64 66;-4 64 66" dur="3.6s" repeatCount="indefinite" />
    <path d="M64 12 L78 48 L118 50 L86 74 L98 112 L64 88 L30 112 L42 74 L10 50 L50 48 Z" fill="${body}" stroke="${glow}" stroke-width="3" stroke-linejoin="round" />
    <circle cx="53" cy="62" r="5.5" fill="#7c2d12">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="53" cy="63" r="5.5" fill="#7c2d12" />
    <circle cx="75" cy="62" r="5.5" fill="#7c2d12">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="63" r="5.5" fill="#7c2d12" />
    <path d="M55 75 Q64 82 73 75" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
    <ellipse cx="44" cy="72" rx="4.5" ry="3" fill="#fb7185" opacity="0.45" />
    <ellipse cx="84" cy="72" rx="4.5" ry="3" fill="#fb7185" opacity="0.45" />
    <g fill="${glow}">
      <path d="M14 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z"><animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" /></path>
      <path d="M112 96 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite" /></path>
    </g>
  </g>
</svg>`;
}
