export interface AvatarLadybugOptions {
  wing?: string;
  size?: number;
}

export function createAvatarLadybug(options: AvatarLadybugOptions = {}): string {
  const { wing = '#dc2626', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ladybug avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 2; 0 -2" dur="3s" repeatCount="indefinite" />
    <ellipse cx="64" cy="76" rx="37" ry="33" fill="${wing}" />
    <path d="M64 44 V109" stroke="#1c1917" stroke-width="4" />
    <g fill="#1c1917">
      <circle cx="46" cy="62" r="6" /><circle cx="82" cy="62" r="6" />
      <circle cx="40" cy="88" r="5" /><circle cx="88" cy="88" r="5" />
      <circle cx="52" cy="102" r="4" /><circle cx="76" cy="102" r="4" />
    </g>
    <path d="M64 44 Q60 26 44 26 M64 44 Q68 26 84 26" stroke="#1c1917" stroke-width="4" fill="none" stroke-linecap="round" />
    <circle cx="43" cy="25" r="4" fill="#1c1917" /><circle cx="85" cy="25" r="4" fill="#1c1917" />
    <circle cx="51" cy="58" r="9" fill="#fafafa" /><circle cx="77" cy="58" r="9" fill="#fafafa" />
    <circle cx="52" cy="59" r="4" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="76" cy="59" r="4" fill="#111827">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4.2s" repeatCount="indefinite" />
    </circle>
    <path d="M57 72 Q64 78 71 72" stroke="#1c1917" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M27 70 a37 33 0 0 1 12 -20" stroke="#fca5a5" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.7" />
  </g>
</svg>`;
}
