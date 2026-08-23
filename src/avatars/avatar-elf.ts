export interface AvatarElfOptions {
  tunic?: string;
  hat?: string;
  size?: number;
}

export function createAvatarElf(options: AvatarElfOptions = {}): string {
  const { tunic = '#16a34a', hat = '#15803d', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Elf avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.6s" repeatCount="indefinite" />
    <path d="M30 60 Q26 44 40 46 L46 58 Z M98 60 Q102 44 88 46 L82 58 Z" fill="#fcd9b8" />
    <ellipse cx="64" cy="72" rx="28" ry="25" fill="#fcd9b8" />
    <path d="M38 56 Q38 36 64 36 Q90 36 90 56 Q64 48 38 56 Z" fill="#b45309" />
    <path d="M42 44 Q50 12 78 18 Q96 22 92 34 Q80 24 66 32 Q52 38 48 50 Z" fill="${hat}" />
    <circle cx="93" cy="35" r="5" fill="#fde047">
      <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite" />
    </circle>
    <ellipse cx="51" cy="70" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="4.2s" repeatCount="indefinite" />
    </ellipse>
    <ellipse cx="77" cy="70" rx="4" ry="4.5" fill="#1c1917">
      <animate attributeName="ry" values="4.5;4.5;0.5;4.5;4.5" dur="4.2s" repeatCount="indefinite" />
    </ellipse>
    <path d="M57 83 Q64 89 71 83" stroke="#1c1917" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M40 100 h48 l-6 14 H46 Z" fill="${tunic}" />
    <path d="M64 100 v14" stroke="#fde047" stroke-width="3" />
    <circle cx="64" cy="107" r="3" fill="#fbbf24" />
    <g stroke="#a7f3d0" stroke-width="2.5" stroke-linecap="round"><path d="M20 108 q5 -6 10 0" /></g>
  </g>
</svg>`;
}
