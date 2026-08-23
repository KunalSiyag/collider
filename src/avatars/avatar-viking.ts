export interface AvatarVikingOptions {
  helmet?: string;
  beard?: string;
  size?: number;
}

export function createAvatarViking(options: AvatarVikingOptions = {}): string {
  const { helmet = '#9ca3af', beard = '#b45309', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Viking avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.3s" repeatCount="indefinite" />
    <path d="M36 46 q-12 -18 2 -26 q4 12 12 16 Z" fill="#fde68a" />
    <path d="M92 46 q12 -18 -2 -26 q-4 12 -12 16 Z" fill="#fde68a" />
    <ellipse cx="64" cy="78" rx="30" ry="28" fill="#fcd9b8" />
    <path d="M36 56 Q36 36 64 36 Q92 36 92 56 Z" fill="${helmet}" />
    <rect x="33" y="53" width="62" height="9" rx="4.5" fill="#6b7280" />
    <path d="M50 74 a4 4 0 0 1 8 0 v10 a4 4 0 0 1 -8 0 Z M70 74 a4 4 0 0 1 8 0 v10 a4 4 0 0 1 -8 0 Z" fill="${beard}" />
    <path d="M40 82 Q40 106 64 106 Q88 106 88 82 Q76 96 64 96 Q52 96 40 82 Z" fill="${beard}" />
    <path d="M56 92 Q64 97 72 92" stroke="#7c2d12" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <circle cx="47" cy="72" r="4" fill="#18181b" />
    <circle cx="81" cy="72" r="4" fill="#18181b" />
    <path d="M64 41 v-9 M58 36 h12" stroke="#dc2626" stroke-width="3" stroke-linecap="round" />
  </g>
</svg>`;
}
