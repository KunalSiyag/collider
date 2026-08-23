export interface AvatarGraduateOptions {
  gown?: string;
  tassel?: string;
  size?: number;
}

export function createAvatarGraduate(options: AvatarGraduateOptions = {}): string {
  const { gown = '#1e1b4b', tassel = '#fbbf24', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graduate avatar">
  <rect width="128" height="128" rx="36" fill="#8b5cf6" opacity="0.12" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3s" repeatCount="indefinite" />
    <ellipse cx="64" cy="86" rx="27" ry="23" fill="#fcd9b8" />
    <path d="M18 66 L64 48 L110 66 L64 84 Z" fill="${gown}" />
    <rect x="56" y="70" width="16" height="10" fill="${gown}" />
    <path d="M64 78 v14 M64 92 q10 -2 10 8 h-20 q0 -10 10 -8" stroke="${tassel}" stroke-width="3" fill="none" stroke-linecap="round" />
    <circle cx="64" cy="98" r="4" fill="${tassel}" />
    <path d="M102 68 v22" stroke="${tassel}" stroke-width="3" stroke-linecap="round" />
    <circle cx="102" cy="94" r="4" fill="${tassel}" />
    <circle cx="53" cy="90" r="4" fill="#18181b" />
    <circle cx="75" cy="90" r="4" fill="#18181b" />
    <path d="M56 99 Q64 105 72 99" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M20 112 l8 -8 m0 8 l-8 -8 M100 114 l8 -8 m0 8 l-8 -8" stroke="#4ade80" stroke-width="3" stroke-linecap="round">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
    </path>
  </g>
</svg>`;
}
