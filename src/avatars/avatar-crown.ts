export interface AvatarCrownOptions {
  gold?: string;
  jewel?: string;
  size?: number;
}

export function createAvatarCrown(options: AvatarCrownOptions = {}): string {
  const { gold = '#fbbf24', jewel = '#f43f5e', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crown avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3.2s" repeatCount="indefinite" />
    <path d="M22 88 L16 40 L40 60 L64 24 L88 60 L112 40 L106 88 Z" fill="${gold}" stroke="#b45309" stroke-width="3" stroke-linejoin="round" />
    <rect x="20" y="86" width="88" height="14" rx="6" fill="#f59e0b" stroke="#b45309" stroke-width="3" />
    <circle cx="30" cy="38" r="4" fill="${gold}" /><circle cx="98" cy="38" r="4" fill="${gold}" /><circle cx="64" cy="21" r="4" fill="${gold}" />
    <circle cx="64" cy="52" r="7" fill="${jewel}">
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <path d="M61 49 l6 6 m0 -6 l-6 6" stroke="#fff1f2" stroke-width="1.8" />
    <circle cx="42" cy="62" r="4.5" fill="#22d3ee" /><circle cx="86" cy="62" r="4.5" fill="#4ade80" />
    <g fill="#7c2d12">
      <ellipse cx="50" cy="70" rx="4.5" ry="5"><animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="78" cy="70" rx="4.5" ry="5"><animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" /></ellipse>
    </g>
    <path d="M56 74 Q64 80 72 74" stroke="#7c2d12" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M14 112 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5 Z" fill="${jewel}" transform="scale(0.75) translate(5 36)" />
  </g>
</svg>`;
}
