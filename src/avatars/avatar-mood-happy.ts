export interface AvatarMoodHappyOptions {
  body?: string;
  size?: number;
}

export function createAvatarMoodHappy(options: AvatarMoodHappyOptions = {}): string {
  const { body = '#4ade80', size = 128 } = options;

  return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Happy mood avatar">
  <rect width="128" height="128" rx="36" fill="#4ade80" opacity="0.13" />
  <g>
    <animateTransform attributeName="transform" type="translate" values="0 -3; 0 3; 0 -3" dur="1.8s" repeatCount="indefinite" />
    <circle cx="64" cy="70" r="38" fill="${body}" />
    <path d="M40 62 Q47 54 54 62 M74 62 Q81 54 88 62" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round" />
    <path d="M44 80 Q64 98 84 80 Q76 92 64 92 Q52 92 44 80 Z" fill="#14532d" />
    <path d="M50 82 v6 m8 -5 v7 m8 -7 v5 m8 -3 v-2" stroke="${body}" stroke-width="2.5" stroke-linecap="round" />
    <ellipse cx="36" cy="76" rx="6" ry="4" fill="#bbf7d0" opacity="0.9" />
    <ellipse cx="92" cy="76" rx="6" ry="4" fill="#bbf7d0" opacity="0.9" />
    <g stroke="#facc15" stroke-width="4" stroke-linecap="round">
      <line x1="18" y1="30" x2="26" y2="38"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite" /></line>
      <line x1="110" y1="30" x2="102" y2="38"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.4s" begin="-0.7s" repeatCount="indefinite" /></line>
      <line x1="22" y1="52" x2="32" y2="52"><animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="-0.35s" repeatCount="indefinite" /></line>
      <line x1="106" y1="52" x2="96" y2="52"><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" begin="-1s" repeatCount="indefinite" /></line>
    </g>
  </g>
</svg>`;
}
