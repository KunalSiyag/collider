export interface AvatarRaccoonOptions {
  fur?: string;
  mask?: string;
  size?: number;
}

export function createAvatarRaccoon(options: AvatarRaccoonOptions = {}): string {
  const { fur = '#a1a1aa', mask = '#27272a', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Raccoon avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.11" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="2.8s" repeatCount="indefinite" />
    <path d="M32 44 L26 20 L48 32 Z" fill="${fur}" />
    <path d="M96 44 L102 20 L80 32 Z" fill="${fur}" />
    <ellipse cx="64" cy="76" rx="37" ry="32" fill="${fur}" />
    <path d="M28 66 Q46 58 60 70 Q56 84 42 84 Q30 82 28 66 Z" fill="${mask}" />
    <path d="M100 66 Q82 58 68 70 Q72 84 86 84 Q98 82 100 66 Z" fill="${mask}" />
    <circle cx="45" cy="71" r="4.5" fill="#fde047">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.8s" repeatCount="indefinite" />
    </circle>
    <circle cx="83" cy="71" r="4.5" fill="#fde047">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="3.8s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="64" cy="88" rx="8" ry="6" fill="#18181b" />
    <path d="M64 93 Q59 99 54 96 M64 93 Q69 99 74 96" stroke="#18181b" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <g stroke="#71717a" stroke-width="2.5" stroke-linecap="round" opacity="0.8">
      <line x1="18" y1="76" x2="34" y2="79" /><line x1="18" y1="88" x2="34" y2="86" />
      <line x1="110" y1="76" x2="94" y2="79" /><line x1="110" y1="88" x2="94" y2="86" />
    </g>
    <path d="M50 104 h28" stroke="#e4e4e7" stroke-width="4" stroke-linecap="round" opacity="0.7" />
  </g>
</svg>`;
}
