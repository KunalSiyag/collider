export interface AvatarBeeOptions {
  body?: string;
  stripe?: string;
  size?: number;
}

export function createAvatarBee(options: AvatarBeeOptions = {}): string {
  const { body = '#fbbf24', stripe = '#1c1917', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bee avatar">
  <rect width="128" height="128" rx="36" fill="#fbbf24" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -2; 0 3; 0 -2" dur="1.6s" repeatCount="indefinite" />
    <ellipse cx="38" cy="34" rx="16" ry="9" fill="#bae6fd" opacity="0.85" transform="rotate(-28 38 34)">
      <animateTransform attributeName="transform" type="rotate" values="-40 38 34;-16 38 34;-40 38 34" dur="0.35s" repeatCount="indefinite" additive="sum" />
    </ellipse>
    <ellipse cx="90" cy="34" rx="16" ry="9" fill="#bae6fd" opacity="0.85" transform="rotate(28 90 34)">
      <animateTransform attributeName="transform" type="rotate" values="40 90 34;16 90 34;40 90 34" dur="0.35s" repeatCount="indefinite" additive="sum" />
    </ellipse>
    <path d="M52 22 L46 8 M76 22 L82 8" stroke="#1c1917" stroke-width="4" stroke-linecap="round" />
    <circle cx="46" cy="7" r="4" fill="${stripe}" /><circle cx="82" cy="7" r="4" fill="${stripe}" />
    <ellipse cx="64" cy="72" rx="36" ry="32" fill="${body}" />
    <path d="M46 44 Q42 66 48 100 M64 41 Q62 68 64 104 M82 44 Q86 66 80 100" stroke="${stripe}" stroke-width="10" fill="none" stroke-linecap="round" clip-path="url(#beeClip)" />
    <clipPath id="beeClip"><ellipse cx="64" cy="72" rx="35" ry="31" /></clipPath>
    <circle cx="51" cy="64" r="5.5" fill="#1c1917">
      <animate attributeName="ry" values="5.5;5.5;0.6;5.5;5.5" dur="3.9s" repeatCount="indefinite" />
    </circle>
    <circle cx="77" cy="64" r="5.5" fill="#1c1917">
      <animate attributeName="ry" values="5.5;5.5;0.6;5.5;5.5" dur="3.9s" repeatCount="indefinite" />
    </circle>
    <path d="M56 80 Q64 87 72 80" stroke="#1c1917" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <ellipse cx="38" cy="78" rx="6" ry="4" fill="#fda4af" opacity="0.55" />
    <ellipse cx="90" cy="78" rx="6" ry="4" fill="#fda4af" opacity="0.55" />
    <path d="M112 96 q-6 -2 -4 6 q-8 -2 -6 6" stroke="#4ade80" stroke-width="3" fill="none" stroke-linecap="round" />
  </g>
</svg>`;
}
