export interface AvatarCrystalOptions {
  gem?: string;
  shine?: string;
  size?: number;
}

export function createAvatarCrystal(options: AvatarCrystalOptions = {}): string {
  const { gem = '#8b5cf6', shine = '#ddd6fe', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crystal avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.4s" repeatCount="indefinite" />
    <path d="M40 34 L52 20 H76 L88 34 L92 66 L64 112 L36 66 Z" fill="${gem}" />
    <path d="M52 20 L58 66 L36 66 Z M76 20 L70 66 L92 66 Z" fill="#7c3aed" opacity="0.65" />
    <path d="M40 34 L64 44 L88 34 L84 60 L64 72 L44 60 Z" fill="${shine}" opacity="0.35" />
    <path d="M52 20 L64 44 L76 20" stroke="${shine}" stroke-width="3" fill="none" stroke-linejoin="round" opacity="0.8" />
    <ellipse cx="54" cy="82" rx="5" ry="5.5" fill="#1e1b4b">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="54" cy="83" rx="5" ry="5.5" fill="#1e1b4b" />
    <ellipse cx="74" cy="82" rx="5" ry="5.5" fill="#1e1b4b">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="74" cy="83" rx="5" ry="5.5" fill="#1e1b4b" />
    <path d="M57 93 Q64 98 71 93" stroke="#1e1b4b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M30 24 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="${shine}">
      <animateTransform attributeName="transform" type="rotate" values="0 32 31;360 32 31" dur="10s" repeatCount="indefinite" />
    </path>
    <path d="M100 96 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z" fill="${shine}" opacity="0.85">
      <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2.4s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
