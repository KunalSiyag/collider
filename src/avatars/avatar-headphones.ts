export interface AvatarHeadphonesOptions {
  band?: string;
  cup?: string;
  size?: number;
}

export function createAvatarHeadphones(options: AvatarHeadphonesOptions = {}): string {
  const { band = '#0ea5e9', cup = '#f472b6', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Headphones avatar">
  <rect width="128" height="128" rx="36" fill="#22d3ee" opacity="0.1" />
  <g>
    <animateTransform attributeName="transform" type="rotate" values="-2 64 90;2 64 90;-2 64 90" dur="2.6s" repeatCount="indefinite" />
    <path d="M26 74 V60 Q26 24 64 24 Q102 24 102 60 V74" stroke="${band}" stroke-width="9" fill="none" stroke-linecap="round" />
    <rect x="16" y="66" width="20" height="34" rx="10" fill="${cup}" />
    <rect x="92" y="66" width="20" height="34" rx="10" fill="${cup}" />
    <rect x="21" y="73" width="10" height="20" rx="5" fill="#9d174d" opacity="0.4" />
    <rect x="97" y="73" width="10" height="20" rx="5" fill="#9d174d" opacity="0.4" />
    <circle cx="52" cy="76" r="5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" />
    </circle>
    <circle cx="52" cy="77" r="5" fill="#1c1917" />
    <circle cx="76" cy="76" r="5" fill="#1c1917">
      <animate attributeName="ry" values="1;1;0;1;1" dur="4s" begin="-0.4s" repeatCount="indefinite" />
    </circle>
    <circle cx="76" cy="77" r="5" fill="#1c1917" />
    <path d="M56 88 Q58 94 64 94 Q70 94 72 88" stroke="#1c1917" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M62 82 h4 l-2 4 Z" fill="#fb7185" />
    <g stroke="#38bdf8" stroke-width="3" fill="none" stroke-linecap="round">
      <path d="M112 40 a12 12 0 0 1 0 14"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite" /></path>
      <path d="M118 36 a18 18 0 0 1 0 22"><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" begin="-0.8s" repeatCount="indefinite" /></path>
      <path d="M16 40 a12 12 0 0 0 0 14"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" begin="-0.4s" repeatCount="indefinite" /></path>
      <path d="M10 36 a18 18 0 0 0 0 22"><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" begin="-1.2s" repeatCount="indefinite" /></path>
    </g>
  </g>
</svg>`;
}
